import { MAX_PLAYERS } from '../utils/constants';
import { SocketType, ServerType } from '../types';
import { gameCodes } from '../controllers/game.controller';

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

export const registerRoomHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  joinRoom(io, socket);
};
