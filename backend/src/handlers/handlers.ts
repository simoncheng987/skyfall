import { SocketType, ServerType } from '../types/types';
import { gameCodes } from '../controllers/game.controller';

const MAX_PLAYERS = 2;

/**
 * Handle when client requests to join room
 *
 * Emit room:join-success if the room is not full and the player can join
 * Emit room:join-failed if the room is full and the player cannot join
 *
 * TODO: broadcast names to everyone in the room
 */
const joinRoom = (
  io: ServerType,
  socket: SocketType,
) => {
  socket.on('room:join', (roomCode) => {
    if (!gameCodes.includes(parseInt(roomCode, 10))) {
      socket.emit('room:join-fail');
      return;
    }

    const socketsInRoom = io.of('/').adapter.rooms.get(roomCode);
    const numOfSockets = !socketsInRoom ? 0 : socketsInRoom.size;

    if (numOfSockets < MAX_PLAYERS) {
      socket.join(roomCode);
      socket.data.roomCode = roomCode;
      socket.emit('room:join-success');
      io.to(roomCode).emit('broadcast:list-participant', ['Player A', 'Player B', 'Player C']);
    } else {
      socket.emit('room:join-fail');
    }
  });
};

/**
 * Handle when client requests to start the game
 *
 * Emit game:start-success if game can be started
 * Emit game:start-failed if game cannot start due to: not being in a room, not enough players, not all players are ready.
 *
 */
const gameStart = (io:ServerType, socket: SocketType) => {
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
  joinRoom(io, socket);
  gameStart(io, socket);
};
