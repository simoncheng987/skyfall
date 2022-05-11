import { GlobalGameState } from '../state';
import { getWordList } from '../services/word-list.service';
import { MAX_PLAYERS } from '../utils/constants';
import { SocketType, ServerType, Word } from '../types';
import { getWordForRoom } from '../database/words';

/**
 * Handle when client requests to start the game
 *
 * Emit game:start-success if game can be started
 * Emit game:start-failed if game cannot start due to: not being in a room, not enough players, not all players are ready.
 *
 */
const gameStart = (io: ServerType, socket: SocketType) => {
  socket.on('game:start', async (startingLives, listName) => {
    const { roomCode } = socket.data;
    if (!roomCode) {
      socket.emit('game:start-fail', 'Not currently in a room');
      return;
    }

    const gameState = GlobalGameState.get(roomCode);
    if (!gameState) {
      socket.emit('game:start-fail', 'Room code no longer valid');
      return;
    }

    if (gameState.roomCreator !== socket.id) {
      socket.emit('game:start-fail', 'Only the room creator can start the game');
      return;
    }

    const socketsInRoom = await io.in(roomCode).fetchSockets();
    if (socketsInRoom.length < MAX_PLAYERS) {
      socket.emit('game:start-fail', 'Waiting for other players to join');
      return;
    }

    if (gameState.inProgress) {
      socket.emit('game:start-fail', 'Game already in progress');
      return;
    }

    const wordList = await getWordList(listName);
    wordList.sort((a, b) => a.length - b.length);
    gameState.wordList = wordList;

    gameState.startingLives = startingLives;
    socketsInRoom.forEach((s) => {
      s.data.lives = gameState.startingLives;
    });

    gameState.inProgress = true;

    io.to(roomCode).emit('game:start-success', startingLives, listName);
    setTimeout(() => {
      sendWord(io, roomCode, 5000);
    }, 1000);
  });
};

const sendWord = async (io: ServerType, roomCode: string, timeToAnswer: number) => {
  setTimeout(async () => {
    const socketsInRoom = await io.in(roomCode).fetchSockets();
    const numOfSockets = socketsInRoom.length;
    const gameState = GlobalGameState.get(roomCode);

    if (gameState && numOfSockets === MAX_PLAYERS) {
      const randomWord: Word = getWordForRoom(roomCode, gameState.wordList || []);
      io.to(roomCode).emit(
        'word',
        randomWord.id,
        randomWord.word,
        timeToAnswer,
        Math.floor(Math.random() * 100),
      );
      sendWord(io, roomCode, Math.round(timeToAnswer * 0.99));
    } else if (GlobalGameState.delete(roomCode)) {
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
