import React from 'react';
import { HeartIcon } from '@heroicons/react/solid';
import styles from './Hearts.module.css';

interface HeartsProps {
  totalHearts: number;
  remainingHearts: number;
  className?: string;
}

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
