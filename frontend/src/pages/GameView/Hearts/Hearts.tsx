import React from 'react';
import { HeartIcon } from '@heroicons/react/solid';
import styles from './Hearts.module.css';

interface HeartsProps {
  /**
   * Total number of hearts to be displayed.
   */
  totalHearts: number;

  /**
   * The remaining hearts to display.
   */
  remainingHearts: number;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * Display a list of hearts. Only the remaining hearts will be colored.
 */
export default function Hearts({ totalHearts, remainingHearts, className }: HeartsProps) {
  return (
    <div className={`${styles.heartContainer} ${className}`}>
      {Array.from({ length: totalHearts - remainingHearts }, (_, index) => (
        <HeartIcon key={index} className={`${styles.heart} ${styles.inactive}`} />
      ))}
      {Array.from({ length: remainingHearts }, (_, index) => (
        <HeartIcon
          key={index + totalHearts - remainingHearts}
          className={`${styles.heart} ${styles.active}`}
        />
      ))}
    </div>
  );
}

Hearts.defaultProps = {
  className: '',
};
