import { Word } from '../types';

const wordsIdByRoom = {};

export const getWordForRoom = (roomId: string, words: Array<string>): Word => {
  // if word was never emitted, initialise id to 0
  if (!wordsIdByRoom[roomId]) {
    wordsIdByRoom[roomId] = 0;
  }

  // get random word, create Word object
  const randomWord: Word = {
    word: words[Math.floor(Math.random() * words.length)],
    id: String(wordsIdByRoom[roomId]),
  };
  // increment counter
  wordsIdByRoom[roomId] += 1;

  // return Word
  return randomWord;
};
