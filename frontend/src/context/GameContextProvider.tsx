import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Socket } from 'socket.io-client';
import TimedWordState from '../types/TimedWordState';
import WordState from '../types/WordState';

interface GameContextProps {
  /**
   * The score of current player.
   */
  playerScore: number;

  /**
   * The lives of current player.
   */
  playerLives: number;

  /**
   * Score of player's opponent.
   */
  opponentScore: number;

  /**
   * Lives of player's opponent.
   */
  opponentLives: number;

  /**
   * Starting time of the game.
   */
  startTime: Date;

  /**
   * Initializing the starting time of the game.
   */
  initializeStartTime: () => void;

  /**
   * Active word list for current player.
   */
  playerWordList: WordState[];

  /**
   * Active word list for player's opponent.
   */
  opponentWordList: WordState[];

  /**
   * Handler for when a word is submitted by the player.
   */
  // eslint-disable-next-line no-unused-vars
  onWordSubmitHandler: (arg0: string, client: Socket) => void;

  /**
   * Declaration of game starting.
   */
  // eslint-disable-next-line no-unused-vars
  gameStart: (socket: Socket) => void;

  /**
   * Resetting the context.
   */
  resetGame: () => void;

  /**
   * Initial lives of both player and opponent.
   */
  initialLives: number;

  /**
   * Configuring the initial lives.
   */
  // eslint-disable-next-line no-unused-vars
  configureInitialLives: (lives: number) => void;
}

const GameContext = React.createContext<GameContextProps | null>(null);

/**
 * Hook for accessing the context.
 */
export const useGameContext = () => useContext(GameContext) as GameContextProps;

interface GameContextProviderProps {
  /**
   * The components that will access this context.
   */
  children: React.ReactNode;
}

/**
 * A context to provide information of current playing game.
 */
export default function GameContextProvider({ children }: GameContextProviderProps) {
  // Default lives and score.
  const PLAYER_LIVES = 3;
  const INITIAL_SCORE = 0;

  const [initialLives, setInitialLives] = useState<number>(PLAYER_LIVES);

  const [playerLives, setPlayerLives] = useState<number>(PLAYER_LIVES);

  const [opponentLives, setOpponentLives] = useState<number>(PLAYER_LIVES);

  const [playerScore, setPlayerScore] = useState<number>(INITIAL_SCORE);

  const [opponentScore, setOpponentScore] = useState<number>(INITIAL_SCORE);

  const [startTime, setStartTime] = useState<Date>(new Date());

  const [playerWordList, setPlayerList] = useState<TimedWordState[]>([]);

  const [opponentWordList, setOpponentList] = useState<WordState[]>([]);

  const initializeStartTime = () => {
    setStartTime(new Date());
  };

  useEffect(() => {
    // Update the yPercentage every 17ms
    const wordUpdateInterval = setInterval(() => {
      setPlayerList((oldList) =>
        oldList.map((state) => ({
          ...state,
          yPercentage: state.yPercentage + (100 * 17) / state.time,
        })),
      );
      setOpponentList((oldList) =>
        oldList.map((state) => ({
          ...state,
          yPercentage: state.yPercentage + (100 * 17) / state.time,
        })),
      );
    }, 17);

    return () => {
      clearInterval(wordUpdateInterval);
    };
  }, []);

  const onWordSubmitHandler = (typedWord: string, client: Socket) => {
    const state = playerWordList.find((wordState) => wordState.word === typedWord);
    if (state) {
      clearTimeout(state.timeout);
      setPlayerList((old) => [...old.filter((value) => value.wordId !== state.wordId)]);
      client.emit('word:typed', state.wordId, true);
    }
  };

  const gameStart = (client: Socket) => {
    // Event for when word is received from the backend
    client.on('word', (id: string, newWord: string, wordTime: number, wordLocation: number) => {
      setPlayerList((oldList) => [
        ...oldList,
        {
          word: newWord,
          wordId: id,
          xPercentage: wordLocation,
          yPercentage: 0,
          time: wordTime,
          timeout: setTimeout(() => {
            client.emit('word:typed', id, false);
          }, wordTime as number),
        },
      ]);

      setOpponentList((oldList) => [
        ...oldList,
        {
          word: newWord,
          wordId: id,
          xPercentage: wordLocation,
          yPercentage: 0,
          time: wordTime,
        },
      ]);
    });

    // A helper to get the correct setter for score and lives
    const getStatsSetters = (
      id: string,
    ): {
      setScore: React.Dispatch<React.SetStateAction<number>>;
      setLives: React.Dispatch<React.SetStateAction<number>>;
    } => {
      if (id === client.id) {
        return { setLives: setPlayerLives, setScore: setPlayerScore };
      }
      return { setLives: setOpponentLives, setScore: setOpponentScore };
    };

    // Event for when handling broadcast of when a word is typed by player or opponent
    client.on(
      'broadcast:word-typed',
      (wordId: string, success: boolean, socketId: string, lives: number) => {
        if (socketId === client.id) {
          setPlayerList((oldList) => [...oldList.filter((value) => value.wordId !== wordId)]);
        } else {
          setOpponentList((oldList) => [...oldList.filter((value) => value.wordId !== wordId)]);
        }

        const { setScore, setLives } = getStatsSetters(socketId);
        setLives(lives);
        if (success) {
          setScore((old) => old + 100);
        }
      },
    );

    // Event for when a game is finished
    client.once('game:finished', () => {
      client.off('word');
      client.off('broadcast:word-typed');
      setPlayerList([]);
      setOpponentList([]);
    });
  };

  const resetGame = () => {
    setPlayerLives(PLAYER_LIVES);
    setOpponentLives(PLAYER_LIVES);
    setPlayerScore(INITIAL_SCORE);
    setOpponentScore(INITIAL_SCORE);
  };

  const configureInitialLives = (lives: number) => {
    setInitialLives(lives);
    setPlayerLives(lives);
    setOpponentLives(lives);
  };

  const value: GameContextProps = useMemo(
    () => ({
      playerScore,
      playerLives,
      opponentScore,
      opponentLives,
      initialLives,
      startTime,
      playerWordList,
      opponentWordList,
      initializeStartTime,
      onWordSubmitHandler,
      gameStart,
      resetGame,
      configureInitialLives,
    }),
    [
      playerScore,
      playerLives,
      opponentScore,
      opponentLives,
      initialLives,
      startTime,
      playerWordList,
      opponentWordList,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
