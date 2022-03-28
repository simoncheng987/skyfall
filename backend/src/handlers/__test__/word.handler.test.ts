import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients } from './util';

describe('Client word:typed', () => {
  let server: SkyfallServer;
  let clients: any[];

  beforeAll(() => {
    server = new SkyfallServer();
  });

  beforeEach(() => {
    gameCodes.push(1234);
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

  it('2 Clients in one room, one client sends word:typed', (done) => {
    const mockBroadcast = jest.fn();
    clients = createClients(2);
    clients.forEach((client) => {
      client.on('broadcast:word-typed', (wordId, success, socketId) => {
        expect(socketId).toBe(clients[0].id);
        expect(wordId).toBe('1');
        expect(success).toBe(true);
        mockBroadcast();
      });
      client.emit('room:join', 1234);
    });

    clients[0].emit('word:typed', '1', true);

    setTimeout(() => {
      expect(mockBroadcast).toHaveBeenCalledTimes(2);
      done();
    }, 2000);
  });

  it('Client that is not in a room sends word:typed', (done) => {
    const mockBroadcastCalled = jest.fn();
    clients = createClients(1);
    clients.forEach((client) => {
      client.on('broadcast:word-typed', (wordId, success, socketId) => {
        mockBroadcastCalled();
      });
    });

    clients[0].emit('word:typed', '1', true);

    setTimeout(() => {
      expect(mockBroadcastCalled).toHaveBeenCalledTimes(0);
      done();
    }, 2000);
  });
});
