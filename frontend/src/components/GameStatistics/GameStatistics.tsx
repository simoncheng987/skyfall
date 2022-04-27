import React, { useEffect, useState } from 'react';
import styles from './GameStatistics.module.css';
import GameStatisticsType from '../../types/GameStatistics';

interface GameStatisticsProps {
  data: GameStatisticsType;
  className?: string;
}

export default function GameStatistics({ data, className }: GameStatisticsProps) {
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
    <div className={`${className} ${styles.board}`}>
      <div className={styles.row}>
        <h1 className={`${styles.title} ${styles.firstRowTitle}`}>TIME ELAPSED</h1>
        <h1 className={styles.value}>
          {time.getMinutes()} minutes, {time.getSeconds()} seconds
        </h1>
      </div>
      <div className={styles.row}>
        <h1 className={styles.title}>YOUR SCORE</h1>
        <h1 className={styles.value}>{data.yourScore} words</h1>
      </div>
      <div className={styles.row}>
        <h1 className={styles.title}>OPPONENT’S SCORE</h1>
        <h1 className={styles.value}>{data.opponentScore} words</h1>
      </div>
    </div>
  );
}

GameStatistics.defaultProps = {
  className: '',
};