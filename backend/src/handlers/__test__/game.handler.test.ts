import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients } from './util';

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
  });

  afterAll(() => server.stop());

  it('2 clients join a room, then 2 clients say game:start', (done) => {
    const successMock = jest.fn();
    const failMock = jest.fn();

    clients = createClients(2);
    clients.forEach((client) => {
      client.on('game:start-success', () => successMock());
      client.on('game:start-fail', () => failMock());
      client.emit('room:join', roomCode);
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
      client.emit('room:join', roomCode);
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
      client.emit('room:join', roomCode);
      client.emit('game:start');
    });

    setTimeout(() => {
      expect(successMock).toHaveBeenCalledTimes(2);
      expect(failMock).toHaveBeenCalledTimes(1);
      done();
    }, 2000);
  });
});
