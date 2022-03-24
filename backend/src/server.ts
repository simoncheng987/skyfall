import express from 'express';
import cors from 'cors';
import { createServer, Server } from 'http';

export class ExpressServer {
  #server: Server;

  constructor(port) {
    const app = express();
    this.#server = createServer(app);
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use('/', (req, res) => {
      res.send('hello!').end();
    });
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
