import React, { useContext, useMemo, useState } from 'react';
import { Socket } from 'socket.io-client';

export interface ClientProviderProps {
  client: Socket | undefined;
  setClient: React.Dispatch<React.SetStateAction<Socket | undefined>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  opponent: string | undefined;
  setOpponent: React.Dispatch<React.SetStateAction<string>>;
  clearContext: () => void;
  isHost: boolean;
  setHost: () => void;
}

export const ClientContext = React.createContext<ClientProviderProps | null>(null);

export const useClient = () => useContext(ClientContext) as ClientProviderProps;

interface ClientContextProviderProps {
  children: React.ReactNode;
}

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
