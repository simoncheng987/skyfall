import React from 'react';
import styles from './WordCanvasHeader.module.css';

interface WordCanvasHeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  color?: 'green' | 'brown';
  shadowColor?: 'blue' | 'brown';
}

export default function WordCanvasHeader({
  title,
  children,
  className,
  color,
  shadowColor,
}: WordCanvasHeaderProps) {
  return (
    <div
      className={`${className} ${styles[color as string]} ${
        styles[`${shadowColor as string}Shadow`]
      } ${styles.header}`}
    >
      <span className={styles.title}>{title}</span>
      {children}
    </div>
  );
}

WordCanvasHeader.defaultProps = {
  children: null,
  className: '',
  color: 'green',
  shadowColor: 'blue',
};
