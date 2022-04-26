import React, { useEffect, useState } from 'react';
import styles from './GameStatistics.module.css';

interface GameStatisticsProps {
  startTime: Date;
  yourScore: number;
  opponentScore: number;
  className?: string;
}

export default function GameStatistics({
  startTime,
  yourScore,
  opponentScore,
  className,
}: GameStatisticsProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeElasped = setInterval(() => {
      const currentTime = new Date();
      setTime(new Date(currentTime.getTime() - startTime.getTime()));
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
        <h1 className={styles.value}>{yourScore} words</h1>
      </div>
      <div className={styles.row}>
        <h1 className={styles.title}>OPPONENT’S SCORE</h1>
        <h1 className={styles.value}>{opponentScore} words</h1>
      </div>
    </div>
  );
}

GameStatistics.defaultProps = {
  className: '',
};
