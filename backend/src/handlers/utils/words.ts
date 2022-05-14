import { Word } from '../../types';

const roomInfo = {};

export const getWordForRoom = (roomId: string, words: Array<string>): Word => {
  // if word was never emitted, initialise id to 0
  if (!roomInfo[roomId]) {
    roomInfo[roomId] = {
      wordId: 0,
    };
  }

  // get random word, create Word object
  const randomWord: Word = {
    word: words[Math.floor(Math.random() * words.length)],
    id: String(roomInfo[roomId].wordId),
  };

  roomInfo[roomId].wordId++;

  return randomWord;
};
