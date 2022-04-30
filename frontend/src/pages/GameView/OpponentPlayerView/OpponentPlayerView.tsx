import React from 'react';
import WordCanvasHeader from '../WordCanvasHeader';
import Hearts from '../Hearts';
import WordCanvas from '../WordCanvas';
import WordViewState from '../../../types/WordViewState';
import styles from './OpponentPlayerView.module.css';

interface OpponentPlayerViewProps {
  playerName: string;
  remainingLives: number;
  totalLives: number;
  words: WordViewState[];
  className?: string;
}

export default function OpponentPlayerView({
  playerName,
  remainingLives,
  totalLives,
  className,
  words,
}: OpponentPlayerViewProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <WordCanvasHeader title={playerName} color="green">
        <Hearts totalHearts={totalLives} remainingHearts={remainingLives} />
      </WordCanvasHeader>
      <WordCanvas words={words} wordSize="SMALL" className={styles.canvas} />
      <img src="assets/grass.png" alt="grass" className={styles.grass} />
    </div>
  );
}

OpponentPlayerView.defaultProps = {
  className: '',
};
