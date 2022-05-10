import mongoose from 'mongoose';
import { SkyfallServer } from '../../index';
import { createClients, defaultWordList, TIMEOUT } from './util';
import { STARTING_LIVES } from '../../utils/constants';
import databaseOperations from '../../utils/memory-database';
import { GlobalGameState } from '../../state';

describe('Client word:typed', () => {
  let server: SkyfallServer;
  let clients: any[];
  const roomCode = '1234';

  beforeAll(async () => {
    await databaseOperations.connectDatabase();
    server = new SkyfallServer();
  });

  beforeEach(async () => {
    await databaseOperations.clearDatabase();
    const coll = mongoose.connection.db.collection('wordlists');
    await coll.insertOne({ listName: 'default', wordList: defaultWordList });
    GlobalGameState.set(roomCode, {
      roomCreator: undefined, wordList: undefined, startingLives: undefined, inProgress: false,
    });
    clients = createClients(2);
  });

  afterEach(() => {
    clients?.forEach((client) => client.close());
    GlobalGameState.clear();
  });

  afterAll(async () => {
    await databaseOperations.closeDatabase();
    if (server) {
      await server.stop();
    }
  });

  it('2 Clients in one room, one client sends word:typed success', (done) => {
    const mockBroadcast = jest.fn();

    clients.forEach((client) => {
      client.on('broadcast:word-typed', (wordId, success, socketId, livesRemaining) => {
        expect(wordId).toBe('1');
        expect(success).toBe(true);
        expect(socketId).toBe(clients[0].id);
        expect(livesRemaining).toBe(STARTING_LIVES);
        mockBroadcast();
      });
    });

    clients[0].on('room:join-success', () => {
      clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
    });

    clients[1].on('room:join-success', () => {
      clients[0].emit('game:start');
    });

    clients[0].on('game:start-success', () => {
      clients[0].emit('word:typed', '1', true);
    });

    clients[0].emit('room:join', roomCode, `player called ${Math.random() * 10}`);

    setTimeout(() => {
      expect(mockBroadcast).toHaveBeenCalledTimes(2);
      done();
    }, TIMEOUT);
  });

  it('2 Clients in one room, one client sends word:typed failure', (done) => {
    const mockBroadcast = jest.fn();

    clients.forEach((client) => {
      client.on('broadcast:word-typed', (wordId, success, socketId, livesRemaining) => {
        expect(wordId).toBe('1');
        expect(success).toBe(false);
        expect(socketId).toBe(clients[0].id);
        expect(livesRemaining).toBe(STARTING_LIVES - 1);
        mockBroadcast();
      });
    });

    clients[0].on('room:join-success', () => {
      clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
    });

    clients[1].on('room:join-success', () => {
      clients[0].emit('game:start');
    });

    clients[0].on('game:start-success', () => {
      clients[0].emit('word:typed', '1', false);
    });

    clients[0].emit('room:join', roomCode, `player called ${Math.random() * 10}`);

    setTimeout(() => {
      expect(mockBroadcast).toHaveBeenCalledTimes(2);
      done();
    }, TIMEOUT);
  });

  it('Client that is not in a room sends word:typed', (done) => {
    const mockBroadcastCalled = jest.fn();

    clients.forEach((client) => {
      client.on('broadcast:word-typed', (wordId, success, socketId, livesRemaining) => {
        mockBroadcastCalled();
      });
    });

    clients[0].emit('word:typed', '1', true);

    setTimeout(() => {
      expect(mockBroadcastCalled).toHaveBeenCalledTimes(0);
      done();
    }, TIMEOUT);
  });
});
