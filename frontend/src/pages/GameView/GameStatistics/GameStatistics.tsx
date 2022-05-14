import React, { useEffect, useState } from 'react';
import { PuzzleIcon } from '@heroicons/react/outline';
import styles from './GameStatistics.module.css';
import GameStatisticsType from '../../../types/GameStatistics';
import WordCanvasHeader from '../WordCanvasHeader';

interface GameStatisticsProps {
  /**
   * Data to be shown in this component, this object is type of GameStatistics
   */
  data: GameStatisticsType;
  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * Component that shows statistics of the two players playing in the game.
 */
export default function GameStatistics({ data, className }: GameStatisticsProps) {
  // Get the time of the component spawn, because it is used to show the 'Time Elapsed'.
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the display of time every 1 seconds
    const timeElasped = setInterval(() => {
      const currentTime = new Date();
      setTime(new Date(currentTime.getTime() - data.gameStartTime.getTime()));
    }, 1000);

    return () => {
      clearTimeout(timeElasped);
    };
  }, []);

  return (
    <div className={styles.rootContainer}>
      <div className={styles.headerContainer}>
        <WordCanvasHeader
          className={styles.header}
          title="Game Statistics"
          color="brown"
          shadowColor="brown"
        >
          <PuzzleIcon className={styles.puzzle} />
        </WordCanvasHeader>
      </div>
      <div className={`${className} ${styles.board}`}>
        <div className={styles.row}>
          <h1 className={`${styles.title} ${styles.firstRowTitle}`}>TIME ELAPSED</h1>
          <h1 className={styles.value}>
            {time.getMinutes()} minutes, {time.getSeconds()} seconds
          </h1>
        </div>
        <div className={styles.row}>
          <h1 className={styles.title}>YOUR SCORE</h1>
          <h1 className={styles.value}>{data.yourScore}</h1>
        </div>
        <div className={styles.row}>
          <h1 className={styles.title}>OPPONENT’S SCORE</h1>
          <h1 className={styles.value}>{data.opponentScore}</h1>
        </div>
      </div>
    </div>
  );
}

GameStatistics.defaultProps = {
  className: '',
};
