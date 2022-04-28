import React from 'react';
import WordCanvasHeader from '../WordCanvasHeader';
import Hearts from '../Hearts';
import WordCanvas from '../WordCanvas';
import WordViewState from '../../../types/WordViewState';
import styles from './CurrentPlayerView.module.css';
import WordInput from '../WordInput';

interface CurrentPlayerViewProps {
  playerName: string;
  remainingLives: number;
  totalLives: number;
  words: WordViewState[];
  className?: string;

  // eslint-disable-next-line no-unused-vars
  onWordSubmit: (word: string) => void;
}

export default function CurrentPlayerView({
  playerName,
  remainingLives,
  totalLives,
  className,
  words,
  onWordSubmit,
}: CurrentPlayerViewProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <WordCanvasHeader title={playerName} color="green">
        <Hearts totalHearts={totalLives} remainingHearts={remainingLives} />
      </WordCanvasHeader>
      <WordCanvas words={words} wordSize="LARGE" className={styles.canvas} />
      <img src="assets/grass.png" alt="grass" className={styles.grass} />
      <WordInput onSubmit={onWordSubmit} />
    </div>
  );
}

CurrentPlayerView.defaultProps = {
  className: '',
};
