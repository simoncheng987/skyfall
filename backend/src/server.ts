import express from 'express';
import cors from 'cors';
import { createServer, Server } from 'http';
import routes from './routes';
import logger from './utils/logger';

export class ExpressServer {
  #server: Server;

  constructor(port) {
    const app = express();
    this.#server = createServer(app);
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.static('build'));
    app.use(express.json());
    app.use('/', routes);
    app.use((err, req, res, next) => {
      res.status(500);
      res.json(err);
    });

    this.#server.listen(port);
  }

  getHttpServer(): Server {
    return this.#server;
  }

  async close() {
    if (this.#server) {
      await this.#server.close();
    }
  }
}
