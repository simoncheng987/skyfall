import { PlayerI } from '../models/player.model';
import { editPlayer, getPlayerAndCreateIfNotPresent } from '../services/player.service';
import { GlobalGameState } from '../state';
import { getWordList } from '../services/word-list.service';
import { MAX_PLAYERS } from '../utils/constants';
import { SocketType, ServerType } from '../types';
import { sendWord } from './word.handler';

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
    gameState.wordList = wordList;

    gameState.startingLives = startingLives;
    socketsInRoom.forEach((s) => {
      s.data.lives = gameState.startingLives;
    });

    gameState.inProgress = true;

    io.to(roomCode).emit('game:start-success', startingLives, listName);
    setTimeout(() => {
      sendWord(io, roomCode, 15000);
    }, 1000);
  });
};

const gameHandleIndividualResult = (io: ServerType, socket: SocketType) => {
  socket.on('game:my-result', async (name: string, win: boolean, score: number) => {
    const player: PlayerI = await getPlayerAndCreateIfNotPresent(name);
    const newPlayerData = {
      name,
      score: Math.max(player.score, score),
      win: win ? player.win + 1 : player.win,
      lose: !win ? player.lose - 1 : player.lose,
    };
    await editPlayer(name, newPlayerData.score, newPlayerData.win, newPlayerData.lose);
  });
};

export const registerGameHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  gameStart(io, socket);
  gameHandleIndividualResult(io, socket);
};
