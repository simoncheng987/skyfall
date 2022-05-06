import React from 'react';
import WordCloud from '../WordCloud';
import styles from './WordCanvas.module.css';
import WordState from '../../../types/WordState';
import generateWordPositionCSSProperties from './generateWordPositionCSSProperties';

interface WordCanvasProps {
  words: WordState[];
  wordSize: 'SMALL' | 'LARGE';
  className?: string;
}

export default function WordCanvas({ words, className, wordSize }: WordCanvasProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      {words.map((wordState) => {
        const position = generateWordPositionCSSProperties(wordState);
        return (
          <WordCloud key={wordState.word} style={position} size={wordSize} word={wordState.word} />
        );
      })}
    </div>
  );
}

WordCanvas.defaultProps = {
  className: '',
};
