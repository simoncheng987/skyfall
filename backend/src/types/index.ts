import { Server, Socket } from 'socket.io';

/**
 * Emitting message from server to clients
 */
interface ServerToClientEvents {
  'room:join-success': () => void;
  'room:join-fail': (reason: string) => void;
  // Map<string,string> doesn't play well with socket.io. playerNamesMap is a stringified JSON map. Need to parse string from client.
  'broadcast:player-joined': (playerNamesMap: string) => void;
  'game:start-success': (startingLives: number, listName: string) => void;
  'game:start-fail': (reason: String) => void;
  'game:finished': () => void;
  'word': (wordId: string, word: string, timeLimit: number, horizontalOffsetPercentage: number) => void;
  'broadcast:word-typed': (wordId: string, success: boolean, socketId: string, livesRemaining: number) => void;
}

/**
 * Message from client to the server
 */
interface ClientToServerEvents {
  'game:my-result': (name: string, win: boolean, score: number) => void;
  'room:join': (roomNumber: string, playerName: string) => void;
  'game:start': (startingLives: number, listName: string) => void;
  'word:typed': (wordId: string, success: boolean) => void;
}

/**
 * Data of the socket
 */
interface SocketData {
  ready: boolean;
  roomCode: string;
  name: string;
  lives: number;
}

interface Word {
  word: string;
  id: string;
}

type SocketType = Socket<ClientToServerEvents, ServerToClientEvents, any, SocketData>
type ServerType = Server<ClientToServerEvents, ServerToClientEvents, any, SocketData>

export {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
  SocketType,
  ServerType,
  Word,
};
