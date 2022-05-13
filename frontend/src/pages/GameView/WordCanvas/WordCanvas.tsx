import React from 'react';
import WordCloud from '../WordCloud';
import styles from './WordCanvas.module.css';
import WordState from '../../../types/WordState';
import generateWordPositionCSSProperties from './generateWordPositionCSSProperties';

interface WordCanvasProps {
  /**
   * The words to be rendered onto the canvas.
   */
  words: WordState[];
  /**
   * Size of the word clouds that are rendered. For example, the CurrentPlayerView uses 'LARGE'
   * and OpponentPlayerView uses 'SMALL'.
   */
  wordSize: 'SMALL' | 'LARGE';
  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * This canvas component has a blue background that is used to render Skyfall game words onto the
 * screen. It uses the WordCloud component to render the words, and words are rendered based on the
 * properties of WordState interface that identifies each word.
 */
export default function WordCanvas({ words, className, wordSize }: WordCanvasProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      {/* Render all words passed as the props to this component. */}
      {words.map((wordState) => {
        // Calculate where exactly the word should be rendered onto the canvas.
        const position = generateWordPositionCSSProperties(wordState);
        return (
          <WordCloud
            key={wordState.wordId}
            style={position}
            size={wordSize}
            word={wordState.word}
          />
        );
      })}
    </div>
  );
}

WordCanvas.defaultProps = {
  className: '',
};
