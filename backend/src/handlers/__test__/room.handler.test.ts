import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients, TIMEOUT } from './util';

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
    clients?.forEach((client) => {
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
      configureTestSocketHandlers(clientSocket, joinSuccessMock, joinFailMock);
      clientSocket.emit('room:join', 1234, `player called ${Math.random() * 10}`);
    });
    setTimeout(() => {
      expect(joinFailMock).not.toHaveBeenCalled();
      expect(joinSuccessMock).toHaveBeenCalledTimes(2);
      done();
    }, TIMEOUT);
  });

  /**
     * When 3 sockets join the same room, one of them should receive join-fail message
     */
  it('3 sockets joining same room', (done) => {
    gameCodes.push(1234);
    clients = createClients(3);
    clients.forEach((clientSocket) => {
      clientSocket.on('room:join-fail', () => done());
      clientSocket.emit('room:join', 1234, `player called ${Math.random() * 10}`);
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
    clients.forEach((socket) => configureTestSocketHandlers(socket, joinSuccessMock, joinFailMock));

    clients[0].emit('room:join', 1234, 'player name 1');
    clients[1].emit('room:join', 1234, 'player name 2');
    clients[2].emit('room:join', 4321, 'player name 3');
    clients[3].emit('room:join', 4321, 'player name 4');

    setTimeout(() => {
      expect(joinFailMock).not.toHaveBeenCalled();
      expect(joinSuccessMock).toHaveBeenCalledTimes(4);
      done();
    }, TIMEOUT);
  });
  /**
   * Client should not be able to join a room that does not exist
  */
  it('Client joins nonexistent room', (done) => {
    const joinSuccessMock = jest.fn();
    const joinFailMock = jest.fn();

    clients = createClients(1);
    clients.forEach((socket) => configureTestSocketHandlers(socket, joinSuccessMock, joinFailMock));
    clients[0].emit('room:join', 1237, 'player name 1');

    testSingleJoinFailure(done, joinSuccessMock, joinFailMock);
  });

  /**
   * Client fails to join if it doesn't supply player name
   */
  it('Client joins without player name', (done) => {
    const joinSuccessMock = jest.fn();
    const joinFailMock = jest.fn();
    gameCodes.push(1234);
    clients = createClients(1);
    clients.forEach((socket) => configureTestSocketHandlers(socket, joinSuccessMock, joinFailMock));
    clients[0].emit('room:join', 1234);
    testSingleJoinFailure(done, joinSuccessMock, joinFailMock);
  });

  /**
   * Client cannot rejoin a room that it's in
   */
  it('Client will fail to rejoin a room it is already in', (done) => {
    const joinSuccessMock = jest.fn();
    const joinFailMock = jest.fn();
    gameCodes.push(1234);
    clients = createClients(1);
    clients.forEach((socket) => configureTestSocketHandlers(socket, joinSuccessMock, joinFailMock));
    clients[0].emit('room:join', 1234, 'room');
    clients[0].emit('room:join', 1234, 'asdf');

    setTimeout(() => {
      expect(joinFailMock).toHaveBeenCalledTimes(1);
      expect(joinSuccessMock).toHaveBeenCalledTimes(1);
      done();
    }, TIMEOUT);
  });

  /**
   * When a client joins, it should be notified of names of participants as broadcast
   */
  it('Room is notified of new players', (done) => {
    const calledWithMock = jest.fn();
    gameCodes.push(1234);

    // Given two clients
    clients = createClients(2);
    const c1 = clients[0];
    const c2 = clients[1];
    const c1Name = 'Player1';
    const c2Name = 'Player2';
    c2.on('broadcast:player-joined', (map) => calledWithMock(map));

    // When it joins a room
    c1.emit('room:join', 1234, c1Name);
    c2.emit('room:join', 1234, c2Name);

    // Then it receives a broadcast of the names
    setTimeout(() => {
      calledWithMock.mock.calls.forEach((e) => {
        const players = e[0];
        let gotPlayer1 = false;
        let gotPlayer2 = false;

        Object.entries(players).forEach(([, value]) => {
          if (value === c1Name) gotPlayer1 = true;
          if (value === c2Name) gotPlayer2 = true;
        });

        if (gotPlayer2 && gotPlayer1) {
          done();
        }
      });
      done();
    }, TIMEOUT);
  });
});

const configureTestSocketHandlers = (clientSocket, success, fail) => {
  clientSocket.on('room:join-success', () => {
    success();
  });
  clientSocket.on('room:join-fail', () => {
    fail();
  });
};

const testSingleJoinFailure = (done, success, fail) => {
  setTimeout(() => {
    expect(fail).toHaveBeenCalledTimes(1);
    expect(success).not.toHaveBeenCalled();
    done();
  }, TIMEOUT);
};
