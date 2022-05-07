import { NextFunction, Request, Response } from 'express';
import { CONFLICT, NO_CONTENT, OK } from 'http-status';
import { checkWordListExists, getAllWordLists, getWordList } from '../services/word-list.service';
import WordList from '../models/word-list.model';

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

export const getWordLists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wordLists = await getAllWordLists();
    res.status(OK).json(wordLists).end();
  } catch (error) {
    next(error);
  }
};

export const getWordListByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wordList = await getWordList(req.params.listName);
    res.status(OK).json(wordList).end();
  } catch (error) {
    next(error);
  }
};
