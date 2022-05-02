import { SkyfallServer } from '../../index';
import { gameCodes } from '../../controllers/game.controller';
import { createClients } from './util';
import { STARTING_LIVES } from '../../utils/constants';
import { gamesInProgress } from '../game.handler';

describe('Client word:typed', () => {
  let server: SkyfallServer;
  let clients: any[];

  beforeAll(() => {
    server = new SkyfallServer();
  });

  beforeEach(() => {
    gameCodes.push(1234);
    clients = createClients(2);
  });

  afterEach(() => {
    clients.forEach((client) => {
      client.close();
    });
    gameCodes.length = 0;
    gamesInProgress.clear();
  });

  afterAll(() => {
    server.stop();
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
    }, 2000);
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
    }, 2000);
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
    }, 2000);
  });
});
