import { MAX_PLAYERS } from '../utils/constants';
import { SocketType, ServerType, Word } from '../types';
import { getWordForRoom } from '../database/words';

const gamesInProgess = new Set<string>();

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

    if (gamesInProgess.has(roomCode)) {
      socket.emit('game:start-fail', 'Game already in progress');
      return;
    }

    gamesInProgess.add(roomCode);

    io.to(roomCode).emit('game:start-success');
    setTimeout(() => {
      sendWord(io, roomCode);
    }, 1000);
  });
};

const sendWord = async (io: ServerType, roomCode: string) => {
  setTimeout(() => {
    const socketsInRoom = io.of('/').adapter.rooms.get(roomCode);
    const numOfSockets = !socketsInRoom ? 0 : socketsInRoom.size;

    const randomWord: Word = getWordForRoom(roomCode);

    if (numOfSockets === MAX_PLAYERS) {
      io.to(roomCode).emit(
        'word',
        randomWord.id,
        randomWord.word,
        5000,
        Math.floor(Math.random() * 100),
      );
      sendWord(io, roomCode);
    } else {
      gamesInProgess.delete(roomCode);
    }
  }, 1000);
};

export const registerGameHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  gameStart(io, socket);
};
