import React from 'react';
import WordCanvasHeader from '../WordCanvasHeader';
import Hearts from '../Hearts';
import WordCanvas from '../WordCanvas';
import WordState from '../../../types/WordState';
import styles from './OpponentPlayerView.module.css';

interface OpponentPlayerViewProps {
  /**
   * Name of the opponent player.
   */
  playerName: string;
  /**
   * Number of remaining lives of the opponent player.
   */
  remainingLives: number;
  /**
   * Number of total lives of the opponent player.
   */
  totalLives: number;
  /**
   * The words to be rendered onto the screen.
   */
  words: WordState[];
  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * This component is used on the GameView page component, that displays words of the opponent
 * player as they are falling, header containing their name and lives. Thus, it uses the
 * WordCanvasHeader and WordCanvas components to do this.
 */
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
