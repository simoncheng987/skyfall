import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { ExpressServer } from './server';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from './types';
import { ConnectHandler } from './handlers';
import { mongodbUri, port } from './utils/constants';
import logger from './utils/logger';

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

  getHttpServer(): HTTPServer {
    return this.#expressServer.getHttpServer();
  }

  async stop() {
    if (this.#expressServer) {
      await this.#expressServer.close();
    }
  }

  reset() {
    if (this.#io) {
      this.#io.disconnectSockets();
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongodbUri)
    .then(() => new SkyfallServer())
    .catch((err) => logger.error(err));
}
