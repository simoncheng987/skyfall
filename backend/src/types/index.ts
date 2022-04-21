import { Server, Socket } from 'socket.io';
/**
 * Emitting message from server to clients
 * io.on("connection", (socket)=>{
 *  socket.emit("noArg")
 *  socket.emit("basicEmit", 1, "2")
 * })
 */
interface ServerToClientEvents {
  'room:join-success': () => void;
  'room:join-fail': () => void;
  'broadcast:list-participant': (participantNames: Array<String>) => void;
  'game:start-success': () => void;
  'game:start-fail': (reason: String) => void;
  'word': (wordId: string, word: string, timeLimit: number, horizontalOffsetPercentage: number) => void;
  'broadcast:word-typed': (wordId: string, success: boolean, socketId: string) => void;
}

/**
 * Used when receiving events from client, eg
 * io.on("connection", (socket)=>{
 *  socket.on("hello", ()=>{
 *    //...
 *  })
 * })
 */
interface ClientToServerEvents {
  'room:join': (roomNumber: string) => void;
  'game:start': () => void;
  'word:typed': (wordId: string, success: boolean) => void;
}

/**
 * io.on("connection", (socket)=>{
 *  socket.data.name = "john";
 *  socket.data.age = 42;
 * })
 */
interface SocketData {
  ready: boolean;
  roomCode: string;
}

type SocketType = Socket<ClientToServerEvents, ServerToClientEvents, SocketData, any>
type ServerType = Server<ClientToServerEvents, ServerToClientEvents, SocketData>

export {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
  SocketType,
  ServerType,
};
