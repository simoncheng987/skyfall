import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { ExpressServer } from './server';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from './types';
import { ConnectHandler } from './handlers';
import { mongodbUri, port } from './utils/constants';
import logger from './utils/logger';

/**
 * Class that wraps express server (class ExpressServer of `server.ts`) and socket io endpoints
 *
 * In constructor, the express server is started and socket event handlers are bound to the express server.
 * You can use methods like stop() and reset() to stop or end the server as a whole.
 *
 */
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

/**
 * Under test condition, SkyfallServer is instantiated within each test files.
 * Production database should not be run under test condition. (instead, use methods
 * provided in `utils/memory-database.ts`)
 */
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongodbUri)
    .then(() => new SkyfallServer())
    .catch((err) => logger.error(err));
}
