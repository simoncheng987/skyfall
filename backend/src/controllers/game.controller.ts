import { NextFunction, Request, Response } from 'express'

const gameCodes: Array<Number> = []

/**
 * Creates a unique game code
 * This controller should be synchronous to prevent race conditions on gameCodes array
 */
export const createGameCode = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.json(generateNewGameCode())
}

/**
 * Returns random 6 digit to be used as game code.
 * The game code should not be a code you have generated before. 
 * 
 * @returns Unique 6 digit game code
 */
const generateNewGameCode = () => {
    const randomGameCode = (): Number => Math.floor(100000 + Math.random() * 900000);

    let curr = randomGameCode();
    while (gameCodes.indexOf(curr) != -1)
        curr = randomGameCode();

    gameCodes.push(curr);
    return curr;
}


