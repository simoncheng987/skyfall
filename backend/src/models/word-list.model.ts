import { model, Schema } from 'mongoose';

export interface WordListI {
  listName: string;
  wordList: Array<string>;
}

const WordList = model<WordListI>('WordList', new Schema<WordListI>({
  listName: { type: String, required: true },
  wordList: [{ type: String }],
}));

export default WordList;
