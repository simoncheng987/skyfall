/**
 * Emitting message from server to clients
 * io.on("connection", (socket)=>{
 *  socket.emit("noArg")
 *  socket.emit("basicEmit", 1, "2")
 * })
 */
interface ServerToClientEvents {
  youjoined: (a: string) => void;
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
  join: (roomNumber: string) => void;
}

/**
 * io.on("connection", (socket)=>{
 *  socket.data.name = "john";
 *  socket.data.age = 42;
 * })
 */
interface SocketData {
  name: string;
  age: number;
}

export {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
};
