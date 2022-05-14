import React, { useContext, useMemo, useState } from 'react';
import { Socket } from 'socket.io-client';

export interface ClientProviderProps {
  /**
   * The client's socket.
   */
  client: Socket | undefined;

  /**
   * Setting the client's socket.
   */
  setClient: React.Dispatch<React.SetStateAction<Socket | undefined>>;

  /**
   * Name of the client.
   */
  name: string;

  /**
   * Setting the name of client.
   */
  setName: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Opponent's name.
   */
  opponent: string | undefined;

  /**
   * Setting the name of opponent.
   */
  setOpponent: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Reset the current context.
   */
  clearContext: () => void;

  /**
   * Current player is the host of the game created.
   */
  isHost: boolean;

  /**
   * Setting the current player as the host.
   */
  setHost: () => void;
}

export const ClientContext = React.createContext<ClientProviderProps | null>(null);

/**
 * Hook for accessing the context.
 */
export const useClient = () => useContext(ClientContext) as ClientProviderProps;

interface ClientContextProviderProps {
  /**
   * The components that will access this context.
   */
  children: React.ReactNode;
}

/**
 * A context to provide information of current player (client).
 */
export default function ClientContextProvider({ children }: ClientContextProviderProps) {
  const [client, setClient] = useState<Socket | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [opponent, setOpponent] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);

  const setHost = () => {
    setIsHost(true);
  };

  const clearContext = () => {
    setName('');
    setOpponent('');
    setIsHost(false);
    setClient(undefined);
  };

  const value: ClientProviderProps = useMemo(
    () => ({
      client,
      setClient,
      name,
      setName,
      opponent,
      setOpponent,
      clearContext,
      isHost,
      setHost,
    }),
    [client, name, opponent, isHost],
  );

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}
