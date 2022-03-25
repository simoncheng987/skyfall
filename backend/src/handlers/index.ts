import { ServerType, SocketType } from 'src/types/types';
import { registerGameHandler } from './game.handler';
import { registerRoomHandler } from './room.handler';

export const ConnectHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  registerGameHandler(io, socket);
  registerRoomHandler(io, socket);
};
