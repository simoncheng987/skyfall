import mongoose from 'mongoose';
import databaseOperations from '../../utils/memory-database';
import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients, defaultWordList, TIMEOUT } from './util';
import { STARTING_LIVES } from '../../utils/constants';
import { gamesInProgress } from '../game.handler';

describe('Client game:start', () => {
  let server: SkyfallServer;
  let clients: any[];
  const roomCode = 1234;
  beforeAll(async () => {
    await databaseOperations.connectDatabase();
    server = new SkyfallServer();
    const coll = mongoose.connection.db.collection('wordlists');
    await coll.insertOne({ listName: 'default', wordList: defaultWordList });
    gameCodes.push(roomCode);
  });

  beforeEach(async () => {
    server.reset();
  });

  afterEach(() => {
    clients?.forEach((client) => client.close());
    gamesInProgress.clear();
  });

  afterAll(async () => {
    await databaseOperations.closeDatabase();
    if (server) {
      await server.stop();
    }
  });

  it('2 clients join a room, then 2 clients say game:start', (done) => {
    const successMock = jest.fn();
    const failMock = jest.fn();

    clients = createClients(2);
    clients.forEach((client) => {
      client.on('game:start-success', () => successMock());
      client.on('game:start-fail', () => failMock());
      client.emit('room:join', roomCode, `player called ${Math.random() * 10}`);
    });

    clients[0].emit('game:start');

    setTimeout(() => {
      expect(successMock).toHaveBeenCalledTimes(2);
      expect(failMock).not.toHaveBeenCalled();
      done();
    }, TIMEOUT);
  });

  it('1 client join, start', (done) => {
    const successMock = jest.fn();
    const failMock = jest.fn();

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

  it('1 client join, start, 1 client join, start', (done) => {
    const successMock = jest.fn();
    const failMock = jest.fn();

    clients = createClients(2);

    clients[0].on('game:start-success', () => successMock());
    clients[1].on('game:start-success', () => successMock());
    // 3. c1 fails. now wait for c2 to join
    clients[0].on('game:start-fail', () => {
      failMock();
      // 4. c2 joins
      clients[1].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
      // 5. c2 tries to start, and will successfully start
      clients[1].emit('game:start');
    });
    clients[1].on('game:start-fail', () => {
      failMock();
    });

    // 1. c1 joins
    clients[0].emit('room:join', roomCode, `player called ${Math.random() * 10}`);
    // 2. c1 tries to start, gets failure.
    clients[0].emit('game:start');

    setTimeout(() => {
      expect(successMock).toHaveBeenCalledTimes(2);
      expect(failMock).toHaveBeenCalledTimes(1);
      done();
    }, TIMEOUT);
  });

  it('game ends once 1 player dies', (done) => {
    const finishedMock = jest.fn();

    clients = createClients(2);
    clients.forEach((client) => {
      client.on('game:finished', () => finishedMock());
      client.emit('room:join', roomCode, `player called ${Math.random() * 10}`);
    });

    clients[0].on('game:start-success', () => {
      for (let i = 0; i < STARTING_LIVES; i++) {
        clients[0].emit('word:typed', '1', false);
      }
    });

    clients[0].emit('game:start');

    setTimeout(() => {
      expect(finishedMock).toHaveBeenCalledTimes(2);
      done();
    }, TIMEOUT);
  });
});
