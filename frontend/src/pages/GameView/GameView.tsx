import React from 'react';
import CurrentPlayerView from './CurrentPlayerView';
import OpponentPlayerView from './OpponentPlayerView';
import GameStatistics from './GameStatistics';
import { useGameContext } from '../../context/GameContextProvider';
import styles from './GameView.module.css';
import PageScaffold from '../PageScaffold';

interface GameViewProps {
  className?: string;
}

export default function GameView({ className }: GameViewProps) {
  const { playerScore, opponentScore, startTime, playerWordList, opponentWordList } =
    useGameContext();
  // eslint-disable-next-line no-unused-vars
  const submitWord = (word: string) => {};
  const gameStat = { yourScore: playerScore, opponentScore, gameStartTime: startTime };

  return (
    <PageScaffold grassEnabled={false}>
      {/* <div className={styles.rootContainer}> */}
      <div className={styles.container}>
        <CurrentPlayerView
          playerName="Josh"
          onWordSubmit={submitWord}
          remainingLives={3}
          words={playerWordList}
          totalLives={2}
          className={`${className} ${styles.currentPlayerView}`}
        />
        <OpponentPlayerView
          words={opponentWordList}
          remainingLives={1}
          totalLives={3}
          playerName="Simon"
          className={`${className} ${styles.opponentView}`}
        />
        <GameStatistics data={gameStat} className={styles.gameStatistics} />
        {/* </div> */}
      </div>
    </PageScaffold>
  );
}

GameView.defaultProps = {
  className: '',
};
