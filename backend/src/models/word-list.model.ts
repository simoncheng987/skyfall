import { model, Schema } from 'mongoose';

/**
 * A model that represents word list from which the word is sent during the gameplay
 */
export interface WordListI {
  listName: string;
  wordList: Array<string>;
}

const WordList = model<WordListI>('WordList', new Schema<WordListI>({
  listName: { type: String, required: true },
  wordList: [{ type: String }],
}));

export default WordList;
