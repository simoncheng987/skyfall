import React from 'react';
import styles from './Title.module.css';

interface TitleProps {
  text: string;
  colorScheme: 'pink' | 'yellow' | 'brown';
  fontSize: string;
  className?: string;
}

export default function Title({ text, colorScheme, fontSize, className }: TitleProps) {
  const fontStyle = { fontSize };
  return (
    <div className={`${className} ${styles.fontStyle}  ${styles[colorScheme]}`} style={fontStyle}>
      {text}
    </div>
  );
}

Title.defaultProps = {
  className: '',
};
