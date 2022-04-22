import React, { CSSProperties } from 'react';
import styles from './WordCloud.module.css';

interface WordCloudProps {
  word: string;
  size: 'SMALL' | 'LARGE';
  className?: string;
  style?: CSSProperties;
}

export default function WordCloud({ word, size, className, style }: WordCloudProps) {
  const SMALL_FONT_SIZE = 11;
  const LARGE_FONT_SIZE = 15;
  const fontSize = size === 'SMALL' ? SMALL_FONT_SIZE : LARGE_FONT_SIZE;

  const SMALL_X_PADDING_FACTOR = 2;
  const LARGE_X_PADDING_FACTOR = 3;
  const xPadding =
    (size === 'SMALL' ? SMALL_X_PADDING_FACTOR : LARGE_X_PADDING_FACTOR) * word.length;

  const SMALL_Y_PADDING = word.length < 8 ? 20 : 25;
  const LARGE_Y_PADDING = word.length < 8 ? 25 : 35;
  const yPadding = size === 'SMALL' ? SMALL_Y_PADDING : LARGE_Y_PADDING;

  const dynamicStyle: CSSProperties = {
    fontSize: `${fontSize}px`,
    padding: `${yPadding}px ${xPadding}px`,
    ...style,
  };

  return (
    <div className={`${styles.cloud} ${className}`} style={dynamicStyle}>
      {word}
    </div>
  );
}

WordCloud.defaultProps = {
  className: '',
  style: {},
};
