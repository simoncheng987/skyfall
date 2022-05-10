import { GlobalGameState } from '../state';
import { MAX_PLAYERS } from '../utils/constants';
import { SocketType, ServerType } from '../types';

/**
 * Handle when client requests to join room
 *
 * Emit room:join-success if the room is not full and the player can join
 * Emit room:join-failed if the room is full and the player cannot join
 *
 */
const joinRoom = (
  io: ServerType,
  socket: SocketType,
) => {
  socket.on('room:join', async (roomCode, playerName) => {
    const gameState = GlobalGameState.get(roomCode);
    if (!gameState) {
      socket.emit('room:join-fail', `Room ${roomCode} does not exist`);
      return;
    }

    if (!playerName) {
      socket.emit('room:join-fail', 'Player name should not be empty');
      return;
    }

    if (socket.rooms.has(roomCode)) {
      socket.emit('room:join-fail', 'The player already joined the room');
      return;
    }

    const socketsInRoom = io.of('/').adapter.rooms.get(roomCode);
    const numOfSockets = socketsInRoom ? socketsInRoom.size : 0;

    if (numOfSockets < MAX_PLAYERS) {
      // set first player to join as room creator
      if (numOfSockets === 0) {
        gameState.roomCreator = socket.id;
      }

      socket.join(roomCode);
      socket.data.roomCode = roomCode;
      socket.data.name = playerName;

      const playersMap = {};
      const socketInstancesOfRoom = await io.in(roomCode).fetchSockets();
      socketInstancesOfRoom.forEach((s) => {
        playersMap[s.id] = s.data.name;
      });

      socket.emit('room:join-success');
      io.to(roomCode).emit('broadcast:player-joined', JSON.stringify(playersMap));
    } else {
      socket.emit('room:join-fail', `Room ${roomCode} is full.`);
    }
  });
};

export const registerRoomHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  joinRoom(io, socket);
};
