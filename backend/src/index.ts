import { Server } from 'socket.io';
import { ExpressServer } from './server';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from './types';
import { ConnectHandler } from './handlers';
import { port } from './utils/constants';

export class SkyfallServer {
  #io: Server<ClientToServerEvents, ServerToClientEvents, SocketData>;

  #expressServer: ExpressServer;

  constructor() {
    if (!this.#io) {
      this.#expressServer = new ExpressServer(port);
      this.#io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(this.#expressServer.getHttpServer(), {});
      this.#io.on('connection', (socket) => ConnectHandler(this.#io, socket));
    }
  }

  stop() {
    if (this.#expressServer) {
      this.#expressServer.close();
    }
  }

  reset() {
    if (this.#io) {
      this.#io.disconnectSockets();
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  const skyfallServer = new SkyfallServer();
}
