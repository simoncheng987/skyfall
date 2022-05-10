interface GameState {
    roomCreator: string | undefined;
    wordList: Array<string> | undefined;
    startingLives: number | undefined;
    inProgress: boolean;
}

export const GlobalGameState = new Map<string, GameState>();
