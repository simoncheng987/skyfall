import Player, { PlayerI } from '../models/player.model';

/**
 * This file contains service methods that interact with the database models.
 */

/**
 * Service method that retrieves n players sorted by score
 * @param n # of players that need to be retrieved
 * @returns retrieved list of players
 */
export const getTopNPlayersByScore = async (n: number) => {
  const players = await Player.find().sort({ score: 'desc' }).limit(10);
  return players;
};

/**
 * Returns a Player document from the database with the queried name
 * If a Player doesn't exist with that name, then create one then return it
 * @param name name of the player
 * @returns retrieved player
 */
export const getPlayerAndCreateIfNotPresent = async (name: string) => {
  let player = await Player.findOne({ name });
  if (!player) {
    player = await new Player({
      name, score: 0, win: 0, lose: 0,
    }).save();
  }

  return player;
};

/**
 * Finds a player document of the given name, and edits its details
 *
 * @param name Name of the player
 * @param score New score of the player
 * @param win New number of wins of the player
 * @param lose New number of losses of the player
 * @returns true if successfully editted, false otherwise
 */
export const editPlayer = async (name: string, score: number, win: number, lose: number) => {
  const player = await Player.findOneAndUpdate({ name }, { score, win, lose });
  return !!player;
};
