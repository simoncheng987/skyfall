import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients } from './util';

describe('Client room:join', () => {
  let server: SkyfallServer;
  let clients: any[];

  beforeAll(() => {
    server = new SkyfallServer();
  });

  beforeEach(() => {
    gameCodes.push(1234);
    gameCodes.push(4321);
  });

  afterEach(() => {
    clients.forEach((client) => {
      client.close();
    });
    gameCodes.length = 0;
  });

  afterAll(() => {
    server.stop();
  });

  /**
     * When 2 sockets join the room, none of the sockets should receive room:join-fail
     * TODO: This test is time-dependent, so might be a good idea to change this later
     */
  it('2 sockets joining same room', (done) => {
    const joinSuccessMock = jest.fn();
    const joinFailMock = jest.fn();
    gameCodes.push(1234);

    clients = createClients(2);
    clients.forEach((clientSocket) => {
      clientSocket.on('room:join-success', () => {
        joinSuccessMock();
      });
      clientSocket.on('room:join-fail', () => {
        joinFailMock();
      });
      clientSocket.emit('room:join', 1234);
    });
    setTimeout(() => {
      expect(joinFailMock).not.toHaveBeenCalled();
      expect(joinSuccessMock).toHaveBeenCalledTimes(2);
      done();
    }, 2000);
  });

  /**
     * When 3 sockets join the same room, one of them should receive join-fail message
     */
  it('3 sockets joining same room', (done) => {
    gameCodes.push(1234);
    clients = createClients(3);
    clients.forEach((clientSocket) => {
      clientSocket.on('room:join-fail', () => done());
      clientSocket.emit('room:join', 1234);
    });
  });

  /**
     * 2 clients join one room, 2 other clients join another room
     */
  it('2 clients room 1234, 2 clients room 4321', (done) => {
    const joinSuccessMock = jest.fn();
    const joinFailMock = jest.fn();
    gameCodes.push(1234);
    gameCodes.push(4321);

    clients = createClients(4);
    clients.forEach((clientSocket) => {
      clientSocket.on('room:join-success', () => {
        joinSuccessMock();
      });
      clientSocket.on('room:join-fail', () => {
        joinFailMock();
      });
    });

    clients[0].emit('room:join', 1234);
    clients[1].emit('room:join', 1234);
    clients[2].emit('room:join', 4321);
    clients[3].emit('room:join', 4321);

    setTimeout(() => {
      expect(joinFailMock).not.toHaveBeenCalled();
      expect(joinSuccessMock).toHaveBeenCalledTimes(4);
      done();
    }, 2000);
  });
});
