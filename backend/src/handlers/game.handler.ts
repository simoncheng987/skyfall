import { MAX_PLAYERS, STARTING_LIVES } from '../utils/constants';
import { SocketType, ServerType, Word } from '../types';
import { getWordForRoom } from '../database/words';

export const gamesInProgress = new Set<string>();

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

    const socketsInRoom = await io.in(roomCode).fetchSockets();
    if (socketsInRoom.length < MAX_PLAYERS) {
      socket.emit('game:start-fail', 'Waiting for other players to join');
      return;
    }

    if (gamesInProgress.has(roomCode)) {
      socket.emit('game:start-fail', 'Game already in progress');
      return;
    }

    gamesInProgress.add(roomCode);

    socketsInRoom.forEach((s) => {
      s.data.lives = STARTING_LIVES;
    });

    io.to(roomCode).emit('game:start-success');
    setTimeout(() => {
      sendWord(io, roomCode);
    }, 1000);
  });
};

const sendWord = async (io: ServerType, roomCode: string) => {
  setTimeout(async () => {
    const socketsInRoom = await io.in(roomCode).fetchSockets();
    const numOfSockets = socketsInRoom.length;

    if (gamesInProgress.has(roomCode) && numOfSockets === MAX_PLAYERS) {
      const randomWord: Word = getWordForRoom(roomCode);
      io.to(roomCode).emit(
        'word',
        randomWord.id,
        randomWord.word,
        5000,
        Math.floor(Math.random() * 100),
      );
      sendWord(io, roomCode);
    } else if (gamesInProgress.delete(roomCode)) {
      io.to(roomCode).emit('game:finished');
    }
  }, 1000);
};

export const registerGameHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  gameStart(io, socket);
};
