import { MAX_PLAYERS } from '../utils/constants';
import { SocketType, ServerType } from '../types/types';

/**
 * Handle when client requests to start the game
 *
 * Emit game:start-success if game can be started
 * Emit game:start-failed if game cannot start due to: not being in a room, not enough players, not all players are ready.
 *
 */
const gameStart = (io: ServerType, socket: SocketType) => {
  socket.on('game:start', async () => {
    const { roomCode } = socket.data;
    if (!roomCode) {
      socket.emit('game:start-fail', 'Not currently in a room');
      return;
    }

    socket.data.ready = true;

    const socketsInRoom = await io.in(roomCode).fetchSockets();
    if (socketsInRoom.length < MAX_PLAYERS) {
      socket.emit('game:start-fail', 'Waiting for other players to join');
      return;
    }

    let gameShouldStart = true;

    socketsInRoom?.forEach((s) => {
      if (!s.data.ready) {
        gameShouldStart = false;
      }
    });

    if (gameShouldStart) {
      io.to(roomCode).emit('game:start-success');
    } else {
      socket.emit('game:start-fail', 'Not all players are ready');
    }
  });
};

export const registerGameHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  gameStart(io, socket);
};
