import React from 'react';
import WordCanvasHeader from '../WordCanvasHeader';
import Hearts from '../Hearts';
import WordCanvas from '../WordCanvas';
import WordState from '../../../types/WordState';
import styles from './CurrentPlayerView.module.css';
import WordInput from '../WordInput';

interface CurrentPlayerViewProps {
  /**
   * Name of the current player.
   */
  playerName: string;
  /**
   * Number of remaining lives of the current player.
   */
  remainingLives: number;
  /**
   * Number of total lives of the current player.
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
  /**
   * A callback which will be invoked once the word has been typed.
   */
  // eslint-disable-next-line no-unused-vars
  onWordSubmit: (word: string) => void;
}

/**
 * This component is used on the GameView page component, that displays words of the current player,
 * header containing their name and lives, and a text field for the user to enter words as they fall.
 * Thus, it uses the WordCanvasHeader, WordCanvas, and WordInput components to do this.
 */
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
