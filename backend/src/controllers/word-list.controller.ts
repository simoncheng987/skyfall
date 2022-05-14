import { NextFunction, Request, Response } from 'express';
import { CONFLICT, NO_CONTENT, OK } from 'http-status';
import { checkWordListExists, getAllWordLists, getWordList } from '../services/word-list.service';
import WordList from '../models/word-list.model';

/**
 * Creates a wordlist in the database
 * @param req Request needs listName and wordList in the body
 * @param res Either NO_CONTENT or CONFLICT
 * @param next
 * @returns
 */
export const createWordList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // this implicitly validates req body
    const wordList = new WordList({ ...req.body });

    // check if word list with the same name exists
    if (await checkWordListExists(req.body.listName)) {
      res.status(CONFLICT).json({ error: 'List with the same name already exists' }).end();
      return;
    }

    await wordList.save();
    res.status(NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all the word lists from the database
 */
export const getWordLists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wordLists = await getAllWordLists();
    res.status(OK).json(wordLists).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a word list of a name supplied by the user
 * @param req Request containing the list name
 * @param res
 * @param next
 */
export const getWordListByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wordList = await getWordList(req.params.listName);
    res.status(OK).json(wordList).end();
  } catch (error) {
    next(error);
  }
};
