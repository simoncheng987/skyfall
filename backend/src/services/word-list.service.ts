import WordList, { WordListI } from '../models/word-list.model';

export const checkWordListExists = async (listName: string): Promise<boolean> => {
  const fetchedWordList = await WordList.findOne({ listName });
  return !!fetchedWordList;
};

export const getAllWordLists = async () => WordList.find();

export const getWordList = async (listName: string): Promise<string[]> => {
  if (!await checkWordListExists(listName)) {
    listName = 'default';
  }
  const wordListDocument = await WordList.findOne({ listName });
  return (wordListDocument as WordListI).wordList || ['list not available'];
};
