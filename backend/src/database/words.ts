import { Word } from '../types';

const WINDOW_SIZE = 10;
const roomInfo = {};

export const getWordForRoom = (roomId: string, words: Array<string>): Word => {
  // if word was never emitted, initialise id to 0
  if (!roomInfo[roomId]) {
    roomInfo[roomId] = {
      wordId: 0,
      startIdx: 0,
      endIdx: Math.min(WINDOW_SIZE, words.length),
    };
  }

  // get random word, create Word object
  const randomWord: Word = {
    word: words[roomInfo[roomId].startIdx + Math.floor(Math.random() * (roomInfo[roomId].endIdx - roomInfo[roomId].startIdx))],
    id: String(roomInfo[roomId].wordId),
  };

  roomInfo[roomId].wordId++;
  if (roomInfo[roomId].endIdx < words.length) {
    roomInfo[roomId].startIdx++;
    roomInfo[roomId].endIdx++;
  }

  return randomWord;
};
