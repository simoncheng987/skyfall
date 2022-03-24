import { SocketType, ServerType } from 'src/types/types';

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
    const socketsInRoom = io.of('/').adapter.rooms.get(roomCode);
    const numOfSockets = !socketsInRoom ? 0 : socketsInRoom.size;

    if (numOfSockets < MAX_PLAYERS) {
      socket.join(roomCode);
      socket.emit('room:join-success');
      io.to(roomCode).emit('broadcast:list-participant', ['Player A', 'Player B', 'Player C']);
    } else {
      socket.emit('room:join-fail');
    }
  });
};

export const registerGameHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  joinRoom(io, socket);
};
