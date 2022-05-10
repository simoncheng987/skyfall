import mongoose from 'mongoose';
import databaseOperations from '../../utils/memory-database';
import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients, defaultWordList, TIMEOUT } from './util';
import { STARTING_LIVES } from '../../utils/constants';
import { gamesInProgress } from '../game.handler';

describe('Client game:start', () => {
  const successMock = jest.fn();
  const failMock = jest.fn();
  const finishedMock = jest.fn();

  let server: SkyfallServer;
  let clients: any[];
  const roomCode = 1234;

  beforeAll(async () => {
    await databaseOperations.connectDatabase();
    server = new SkyfallServer();
    const coll = mongoose.connection.db.collection('wordlists');
    await coll.insertOne({ listName: 'default', wordList: defaultWordList });
    gameCodes.set(roomCode, '');
  });

  beforeEach(async () => {
    server.reset();
  });

  afterEach(() => {
    jest.clearAllMocks();
    clients?.forEach((client) => client.close());
    gamesInProgress.clear();
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
        client.on('game:start-success', () => successMock());
        client.on('game:start-fail', () => failMock());
      });
    });

    it('2 clients join a room, then first client says game:start', (done) => {
      clients[0].on('room:join-success', () => {
        clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
      });

      clients[1].on('room:join-success', () => {
        clients[0].emit('game:start');
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
        clients[1].emit('game:start');
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
        clients[0].emit('game:start');
      });

      clients[0].on('game:start-fail', () => {
        clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
      });

      clients[1].on('room:join-success', () => {
        clients[0].emit('game:start');
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

    clients[0].emit('game:start');

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
      clients[0].emit('game:start');
    });

    clients[0].on('game:start-success', () => {
      for (let i = 0; i < STARTING_LIVES; i++) {
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
