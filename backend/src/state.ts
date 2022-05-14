/**
 * Represents state of the game, and is used by various handlers and endpoints
 * to indicate the state of each games in progress.
 */
interface GameState {
    roomCreator: string | undefined;
    wordList: Array<string> | undefined;
    startingLives: number | undefined;
    inProgress: boolean;
}

export const GlobalGameState = new Map<string, GameState>();
