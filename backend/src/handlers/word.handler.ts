import { SocketType, ServerType } from '../types';

const wordTyped = (
  io: ServerType,
  socket: SocketType,
) => {
  socket.on('word:typed', (wordId, success) => {
    io.to(socket.data.roomCode).emit('broadcast:word-typed', wordId, success, socket.id);
  });
};

export const registerWordHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  wordTyped(io, socket);
};
