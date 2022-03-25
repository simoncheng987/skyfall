import express from 'express';
import cors from 'cors';
import { createServer, Server } from 'http';
import routes from './routes';

export class ExpressServer {
  #server: Server;

  constructor(port) {
    const app = express();
    this.#server = createServer(app);
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use('/', routes);
    this.#server.listen(port);
  }

  getHttpServer(): Server {
    return this.#server;
  }

  close() {
    if (this.#server) {
      this.#server.close();
    }
  }
}
