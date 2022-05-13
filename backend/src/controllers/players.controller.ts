import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status';
import { getTopNPlayersByScore } from '../services/player.service';

export const getTopPlayers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(OK).json(await getTopNPlayersByScore(10));
  } catch (error) {
    next(error);
  }
};
