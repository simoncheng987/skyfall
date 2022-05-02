import { SocketType, ServerType } from '../types';
import { gamesInProgress } from './game.handler';

const wordTyped = (
  io: ServerType,
  socket: SocketType,
) => {
  socket.on('word:typed', async (wordId, success) => {
    if (!socket.data.lives || !socket.data.roomCode) {
      return;
    }
    if (!success) {
      socket.data.lives--;
    }
    io.to(socket.data.roomCode).emit('broadcast:word-typed', wordId, success, socket.id, socket.data.lives);

    if (socket.data.lives === 0) {
      const socketsInRoom = await io.in(socket.data.roomCode).fetchSockets();
      const numPlayersAlive = socketsInRoom.filter((sock) => sock.data.lives > 0).length;
      if (numPlayersAlive <= 1) {
        gamesInProgress.delete(socket.data.roomCode);
        io.to(socket.data.roomCode).emit('game:finished');
      }
    }
  });
};

export const registerWordHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  wordTyped(io, socket);
};
