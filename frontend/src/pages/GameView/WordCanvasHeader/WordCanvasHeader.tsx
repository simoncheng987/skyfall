import React from 'react';
import styles from './WordCanvasHeader.module.css';

interface WordCanvasHeaderProps {
  /**
   * Title to be displayed on the left side of the header.
   */
  title: string;

  /**
   * Node to be displayed on the right side of the header.
   */
  children?: React.ReactNode;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;

  /**
   * Color of the header.
   */
  color?: 'green' | 'brown';

  /**
   * Shadow color of the header.
   */
  shadowColor?: 'blue' | 'brown';
}

/**
 * A header component to be displayed on the top of another component.
 */
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
