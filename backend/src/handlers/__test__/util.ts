import { io } from 'socket.io-client';
import { port } from '../../utils/constants';
/**
 * Utility functions
 */
export const createClients = (number: Number) => {
  const clients: Array<any> = [];
  for (let i = 0; i < number; i++) {
    clients.push(io(`ws://localhost:${port}`));
  }
  return clients;
};
export const TIMEOUT = 1000;

export const defaultWordList = ['termite', 'blizzardy', 'sagacities', 'recapped', 'purloiner', 'gratifiers', 'nonelectrolyte', 'uncrystallized'];
