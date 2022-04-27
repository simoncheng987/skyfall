/**
 * Used to track the game statistics information of player's scoring and time
 * elapsed in the GameStatistics component.
 */
export default interface GameStatistics {
  yourScore: number;
  opponentScore: number;

  // The game starting time in a unix epoch format
  gameStartTime: Date;
}
