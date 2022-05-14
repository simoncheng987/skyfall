import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status';
import { getTopNPlayersByScore } from '../services/player.service';

/**
 * Gets top players (currently 10 people by score)
 * @param req Request body is null
 * @param res Will be used to send top 10 players (by score) to the client
 * @param next error handling middleware
 */
export const getTopPlayers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(OK).json(await getTopNPlayersByScore(10));
  } catch (error) {
    next(error);
  }
};
