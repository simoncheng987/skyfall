import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from './types/types'
import logger from './utils/logger';
import routes from './routes';

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(httpServer, {});

io.on('connection', (socket) => {
  console.log('someone connected!');

  socket.on("join", (roomNumber) => {
    logger.info("This client joined room ", roomNumber)
    socket.emit("youjoined", 'lmao')
  })

});

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(routes)

httpServer.listen(3000);
