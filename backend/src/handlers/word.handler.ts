import { getWordForRoom } from './utils/words';
import { MAX_PLAYERS } from '../utils/constants';
import { GlobalGameState } from '../state';
import { SocketType, ServerType, Word } from '../types';

/**
 * Handle when client writes a word (they send 'word:typed' to the server)
 *
 * broadcast:word-typed is sent to all the clients so that clients can update their state and screen at the same time
 * 'game:finished' is sent to the client when it is determined that a client has died.
 */
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
        GlobalGameState.delete(socket.data.roomCode);
        io.to(socket.data.roomCode).emit('game:finished');
      }
    }
  });
};

export const sendWord = async (io: ServerType, roomCode: string, timeToAnswer: number) => {
  setTimeout(async () => {
    const socketsInRoom = await io.in(roomCode).fetchSockets();
    const numOfSockets = socketsInRoom.length;
    const gameState = GlobalGameState.get(roomCode);

    if (gameState && numOfSockets === MAX_PLAYERS) {
      const randomWord: Word = getWordForRoom(roomCode, gameState.wordList || []);
      const newTimeToAnswer = Math.round(timeToAnswer * 0.99);
      io.to(roomCode).emit(
        'word',
        randomWord.id,
        randomWord.word,
        getRandomBetweenRange(Math.round(0.8 * newTimeToAnswer), Math.round(1.2 * newTimeToAnswer)),
        Math.floor(Math.random() * 100),
      );
      sendWord(io, roomCode, newTimeToAnswer);
    } else if (GlobalGameState.delete(roomCode)) {
      io.to(roomCode).emit('game:finished');
    }
  }, getRandomBetweenRange(2000, 4000));
};

function getRandomBetweenRange(min, max) {
  return Math.random() * (max - min) + min;
}

export const registerWordHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  wordTyped(io, socket);
};
