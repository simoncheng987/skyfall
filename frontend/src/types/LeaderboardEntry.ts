/**
 * Used to show the name, score, and stats (i.e wins and loses) of a player.
 */
export default interface LeaderboardEntry {
  /**
   * Name of player.
   */
  name: string;

  /**
   * Highest score of a player.
   */
  score: number;

  /**
   * Number of wins.
   */
  win: number;

  /**
   * Number of loses.
   */
  lose: number;
}
