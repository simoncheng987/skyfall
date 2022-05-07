import mongoose from 'mongoose';
import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients, defaultWordList, TIMEOUT } from './util';
import { STARTING_LIVES } from '../../utils/constants';
import { gamesInProgress } from '../game.handler';
import databaseOperations from '../../utils/memory-database';

describe('Client word:typed', () => {
  let server: SkyfallServer;
  let clients: any[];

  beforeAll(async () => {
    await databaseOperations.connectDatabase();
    server = new SkyfallServer();
  });

  beforeEach(async () => {
    await databaseOperations.clearDatabase();
    const coll = mongoose.connection.db.collection('wordlists');
    await coll.insertOne({ listName: 'default', wordList: defaultWordList });
    gameCodes.push(1234);
    clients = createClients(2);
  });

  afterEach(() => {
    clients?.forEach((client) => client.close());
    gameCodes.length = 0;
    gamesInProgress.clear();
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

      client.emit('room:join', 1234, `player called ${Math.random() * 10}`);
    });

    clients[0].on('game:start-success', () => {
      clients[0].emit('word:typed', '1', true);
    });

    clients[0].emit('game:start');

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

      client.emit('room:join', 1234, `player called ${Math.random() * 10}`);
    });

    clients[0].on('game:start-success', () => {
      clients[0].emit('word:typed', '1', false);
    });

    clients[0].emit('game:start');

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
