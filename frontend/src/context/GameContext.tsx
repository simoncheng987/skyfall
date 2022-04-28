import React, { useContext, useEffect, useMemo, useState } from 'react';
import WordViewState from '../types/WordViewState';

interface GameContextProps {
  playerScore: number;
  opponentScore: number;
  startTime: Date;
  playerWordList: WordViewState[];
  opponentWordList: WordViewState[];
  initializeStartTime: () => void;
  // eslint-disable-next-line no-unused-vars
  onWordSubmitHandler: (arg0: string) => void;
}

const GameContextProvider = React.createContext<GameContextProps | null>(null);

export const useGameContext = () => useContext(GameContextProvider) as GameContextProps;

export default function GameContext({ children }: any) {
  // This is just some words for testing the game context. This will be removed once connected to BE.
  const wordsForTest = [
    'lorem',
    'ipsum',
    'dolor',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'eiusmod',
    'tempor',
    'incididunt',
    'labore',
    'dolore',
    'magna',
    'aliqua',
    'minim',
    'veniam',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'aliquip',
    'commodo',
    'consequat',
    'irure',
    'reprehenderit',
    'voluptate',
    'velit',
    'cillum',
    'dolore',
    'fugiat',
    'nulla',
    'pariatur',
    'Excepteur',
    'occaecat',
    'cupidatat',
    'proident',
    'culpa',
    'officia',
    'deserunt',
    'mollit',
    'laborum',
  ];

  const [playerScore] = useState<number>(0);

  const [opponentScore] = useState<number>(0);

  const [startTime, setStartTime] = useState<Date>(new Date());

  const [playerWordList, setPlayerList] = useState<WordViewState[]>([]);

  const [opponentWordList, setOpponentList] = useState<WordViewState[]>([]);

  const initializeStartTime = () => {
    setStartTime(new Date());
  };

  // Random percentage generator. This will be removed if we want to get the percentage from the server.
  const getRandomPercentage = () => Math.floor(Math.random() * 100);

  // Random word generator. This is only for testing, so it will be removed.
  const getRandomWord = () => wordsForTest[Math.floor(Math.random() * wordsForTest.length)];

  useEffect(() => {
    // Generate a new word every second for player and opponent
    const wordGenerationInterval = setInterval(() => {
      setPlayerList((oldList) => [
        ...oldList,
        {
          word: getRandomWord(),
          xPercentage: getRandomPercentage(),
          yPercentage: getRandomPercentage(),
        },
      ]);

      setOpponentList((oldList) => [
        ...oldList,
        {
          word: getRandomWord(),
          xPercentage: getRandomPercentage(),
          yPercentage: getRandomPercentage(),
        },
      ]);
    }, 1000);

    // Update the yPercentage every 100ms
    const wordUpdateInterval = setInterval(() => {
      setPlayerList((oldList) =>
        oldList.map((state) => ({ ...state, yPercentage: state.yPercentage + 10 })),
      );

      setOpponentList((oldList) =>
        oldList.map((state) => ({ ...state, yPercentage: state.yPercentage + 10 })),
      );
    }, 100);

    return () => {
      clearInterval(wordGenerationInterval);
      clearInterval(wordUpdateInterval);
    };
  }, []);

  const onWordSubmitHandler = (typedWord: string) => {
    const index = playerWordList.findIndex((wordState) => wordState.word === typedWord);
    if (index > -1) {
      setPlayerList((old) => [...old.slice(0, index), ...old.slice(index + 1)]);
    }
  };

  const value: GameContextProps = useMemo(
    () => ({
      playerScore,
      opponentScore,
      startTime,
      playerWordList,
      opponentWordList,
      initializeStartTime,
      onWordSubmitHandler,
    }),
    [playerScore, opponentScore, startTime, playerWordList, opponentWordList],
  );

  return <GameContextProvider.Provider value={value}>{children}</GameContextProvider.Provider>;
}
