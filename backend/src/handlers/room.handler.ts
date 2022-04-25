import { MAX_PLAYERS } from '../utils/constants';
import { SocketType, ServerType } from '../types';
import { gameCodes } from '../controllers/game.controller';

const roomToPlayersMap = {};

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
  socket.on('room:join', async (roomCode, playerName) => {
    if (!gameCodes.includes(parseInt(roomCode, 10))) {
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
      socket.join(roomCode);
      socket.data.name = playerName;

      const socketInstancesOfRoom = await io.in(roomCode).fetchSockets();
      const playersMap = {};
      socketInstancesOfRoom.forEach((s) => {
        playersMap[s.id] = s.data.name;
      });

      socket.data.roomCode = roomCode;
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
