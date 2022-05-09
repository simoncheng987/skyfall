import { getWordList } from '../services/word-list.service';
import { MAX_PLAYERS, STARTING_LIVES } from '../utils/constants';
import { SocketType, ServerType, Word } from '../types';
import { getWordForRoom } from '../database/words';
import WordList from '../models/word-list.model';

// maps game to list of words
export const gamesInProgress = new Map<string, Array<string>>();

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

    // fetch default list for now, but can change this later
    const wordList = await getWordList('default');
    wordList.sort((a, b) => a.length - b.length);
    gamesInProgress.set(roomCode, wordList);

    socketsInRoom.forEach((s) => {
      s.data.lives = STARTING_LIVES;
    });

    io.to(roomCode).emit('game:start-success');
    setTimeout(() => {
      sendWord(io, roomCode, 5000);
    }, 1000);
  });
};

const sendWord = async (io: ServerType, roomCode: string, timeToAnswer: number) => {
  setTimeout(async () => {
    const socketsInRoom = await io.in(roomCode).fetchSockets();
    const numOfSockets = socketsInRoom.length;

    if (gamesInProgress.has(roomCode) && numOfSockets === MAX_PLAYERS) {
      const randomWord: Word = getWordForRoom(roomCode, gamesInProgress.get(roomCode) || []);
      io.to(roomCode).emit(
        'word',
        randomWord.id,
        randomWord.word,
        timeToAnswer,
        Math.floor(Math.random() * 100),
      );
      sendWord(io, roomCode, Math.round(timeToAnswer * 0.99));
    } else if (gamesInProgress.delete(roomCode)) {
      io.to(roomCode).emit('game:finished');
    }
  }, 2000);
};

export const registerGameHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  gameStart(io, socket);
};
