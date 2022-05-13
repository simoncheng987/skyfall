import mongoose from 'mongoose';
import { PlayerI } from '../../models/player.model';
import databaseOperations from '../../utils/memory-database';
import { SkyfallServer } from '../../index';
import { createClients, defaultWordList, TIMEOUT } from './util';
import { GlobalGameState } from '../../state';

describe('Client game:start', () => {
  const successMock = jest.fn();
  const failMock = jest.fn();
  const finishedMock = jest.fn();

  const startingLives = 3;
  const wordListName = 'default';
  const roomCode = '1234';

  let server: SkyfallServer;
  let clients: any[];

  beforeAll(async () => {
    await databaseOperations.connectDatabase();
    server = new SkyfallServer();
    const coll = mongoose.connection.db.collection('wordlists');
    await coll.insertOne({ listName: wordListName, wordList: defaultWordList });
  });

  beforeEach(async () => {
    GlobalGameState.set(roomCode, {
      roomCreator: undefined, wordList: undefined, startingLives: undefined, inProgress: false,
    });
    server.reset();
  });

  afterEach(() => {
    jest.clearAllMocks();
    clients?.forEach((client) => client.close());
    GlobalGameState.clear();
  });

  afterAll(async () => {
    await databaseOperations.closeDatabase();
    if (server) {
      await server.stop();
    }
  });

  describe('2 client game start tests', () => {
    beforeEach(() => {
      clients = createClients(2);
      clients.forEach((client) => {
        client.on('game:start-success', (lives, wordList) => {
          expect(lives).toBe(startingLives);
          expect(wordList).toBe(wordListName);
          successMock();
        });
        client.on('game:start-fail', () => failMock());
      });
    });

    it('2 clients join a room, then first client says game:start', (done) => {
      clients[0].on('room:join-success', () => {
        clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
      });

      clients[1].on('room:join-success', () => {
        clients[0].emit('game:start', startingLives, wordListName);
      });

      clients[0].emit('room:join', roomCode, `player called ${Math.random() * 10}`);

      setTimeout(() => {
        expect(successMock).toHaveBeenCalledTimes(2);
        expect(failMock).not.toHaveBeenCalled();
        done();
      }, TIMEOUT);
    });

    it('2 clients join a room, then second client says game:start', (done) => {
      clients[0].on('room:join-success', () => {
        clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
      });

      clients[1].on('room:join-success', () => {
        clients[1].emit('game:start', startingLives, wordListName);
      });

      clients[0].emit('room:join', roomCode, `player called ${Math.random() * 10}`);

      setTimeout(() => {
        expect(successMock).toHaveBeenCalledTimes(0);
        expect(failMock).toHaveBeenCalledTimes(1);
        done();
      }, TIMEOUT);
    });

    it('1 client join, start, 1 client join, first client starts', (done) => {
      clients[0].on('room:join-success', () => {
        clients[0].emit('game:start', startingLives, wordListName);
      });

      clients[0].on('game:start-fail', () => {
        clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
      });

      clients[1].on('room:join-success', () => {
        clients[0].emit('game:start', startingLives, wordListName);
      });

      clients[0].emit('room:join', roomCode, `player called ${Math.random() * 10}`);

      setTimeout(() => {
        expect(successMock).toHaveBeenCalledTimes(2);
        expect(failMock).toHaveBeenCalledTimes(1);
        done();
      }, TIMEOUT);
    });
  });

  it('1 client join, start', (done) => {
    clients = createClients(1);
    clients.forEach((client) => {
      client.on('game:start-success', () => successMock());
      client.on('game:start-fail', () => failMock());
      client.emit('room:join', roomCode, `player called ${Math.random() * 10}`);
    });

    clients[0].emit('game:start', startingLives, wordListName);

    setTimeout(() => {
      expect(successMock).not.toHaveBeenCalled();
      expect(failMock).toBeCalledTimes(1);
      done();
    }, TIMEOUT);
  });

  it('game ends once 1 player dies', (done) => {
    clients = createClients(2);
    clients.forEach((client) => {
      client.on('game:finished', () => finishedMock());
    });

    clients[0].on('room:join-success', () => {
      clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
    });

    clients[1].on('room:join-success', () => {
      clients[0].emit('game:start', startingLives, wordListName);
    });

    clients[0].on('game:start-success', () => {
      for (let i = 0; i < startingLives; i++) {
        clients[0].emit('word:typed', '1', false);
      }
    });

    clients[0].emit('room:join', roomCode, `player called ${Math.random() * 10}`);

    setTimeout(() => {
      expect(finishedMock).toHaveBeenCalledTimes(2);
      done();
    }, TIMEOUT);
  });
});

describe('Send game result', () => {
  let server: SkyfallServer;
  let clients: any[];

  const hajinPlayer: PlayerI[] = [{
    name: 'hajin', score: 10, win: 2, lose: 1,
  }];

  beforeAll(async () => {
    await databaseOperations.connectDatabase();
    server = new SkyfallServer();
    const coll = mongoose.connection.db.collection('players');
    await coll.insertMany(hajinPlayer);
  });

  beforeEach(async () => {
    server.reset();
  });

  afterEach(() => {
    clients?.forEach((client) => client.close());
  });

  afterAll(async () => {
    await databaseOperations.closeDatabase();
    if (server) {
      await server.stop();
    }
  });

  it('Server should automatically create a Player if player does not exist', (done) => {
    clients = createClients(1);

    clients[0].emit('game:my-result', 'jaemin', true, 1000);
    setTimeout(() => {
      const coll = mongoose.connection.db.collection('players');
      coll.findOne({ name: 'jaemin' })
        .then((doc) => {
          expect(doc?.name).toBe('jaemin');
          expect(doc?.score).toBe(1000);
          expect(doc?.win).toBe(1);
          expect(doc?.lose).toBe(0);
          done();
        });
    }, TIMEOUT);
  });

  it('Server should update a player with new result', (done) => {
    clients = createClients(1);

    const playerName = hajinPlayer[0].name;
    const newScore = hajinPlayer[0].score + 200;
    const newWin = hajinPlayer[0].win;
    const newLose = hajinPlayer[0].lose + 1;
    clients[0].emit('game:my-result', playerName, false, newScore);
    setTimeout(() => {
      const coll = mongoose.connection.db.collection('players');
      coll.findOne({ name: playerName })
        .then((doc) => {
          expect(doc?.name).toBe(playerName);
          expect(doc?.score).toBe(newScore);
          expect(doc?.win).toBe(newWin);
          done();
        });
    }, TIMEOUT);
  });
});
