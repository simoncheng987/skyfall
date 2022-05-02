import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients } from './util';
import { STARTING_LIVES } from '../../utils/constants';
import { gamesInProgress } from '../game.handler';

describe('Client game:start', () => {
  let server: SkyfallServer;
  let clients: any[];
  const roomCode = 1234;
  beforeAll(() => {
    server = new SkyfallServer();
    gameCodes.push(roomCode);
  });

  afterEach(() => {
    clients.forEach((client) => client.close());
    gamesInProgress.clear();
  });

  afterAll(() => server.stop());

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
    clients[1].emit('game:start');

    setTimeout(() => {
      expect(successMock).toHaveBeenCalledTimes(2);
      expect(failMock).toBeCalledTimes(1);
      done();
    }, 2000);
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
    }, 2000);
  });

  it('1 client join, start, 1 client join, start', (done) => {
    const successMock = jest.fn();
    const failMock = jest.fn();

    clients = createClients(2);
    clients.forEach((client) => {
      client.on('game:start-success', () => successMock());
      client.on('game:start-fail', () => failMock());
      client.emit('room:join', roomCode, `player called ${Math.random() * 10}`);
      client.emit('game:start');
    });

    setTimeout(() => {
      expect(successMock).toHaveBeenCalledTimes(2);
      expect(failMock).toHaveBeenCalledTimes(1);
      done();
    }, 2000);
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
    }, 2000);
  });
});
