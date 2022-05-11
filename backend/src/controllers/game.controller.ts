import { NextFunction, Request, Response } from 'express';
import { GlobalGameState } from '../state';

/**
 * Creates a unique game code
 * This controller should be synchronous to prevent race conditions on gameCodes array
 */
export const createGameCode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const code = generateNewGameCode();
  GlobalGameState.set(code, {
    roomCreator: undefined, wordList: undefined, startingLives: undefined, inProgress: false,
  });
  res.json(Number(code));
};

/**
 * Returns random 6 digit to be used as game code.
 * The game code should not be a code you have generated before.
 *
 * @returns Unique 6 digit game code
 */
const generateNewGameCode = () => {
  const randomGameCode = (): number => Math.floor(100000 + Math.random() * 900000);

  let curr = randomGameCode().toString(10);
  while (GlobalGameState.has(curr)) { curr = randomGameCode().toString(10); }

  return curr;
};
