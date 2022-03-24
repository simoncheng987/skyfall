import { ServerType, SocketType } from 'src/types/types';
import { registerGameHandler } from './handlers';

export const ConnectHandler = (
  io: ServerType,
  socket: SocketType,
) => {
  registerGameHandler(io, socket);
};
