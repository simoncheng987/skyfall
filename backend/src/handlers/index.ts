import { ServerType, SocketType } from '../types';
import { registerGameHandler } from './game.handler';
import { registerRoomHandler } from './room.handler';
import { registerWordHandler } from './word.handler';

export const ConnectHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  registerGameHandler(io, socket);
  registerRoomHandler(io, socket);
  registerWordHandler(io, socket);
};
