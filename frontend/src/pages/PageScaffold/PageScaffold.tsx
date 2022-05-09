import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import styles from './PageScaffold.module.css';
import useWindowSize from '../../utils/useWindowSize';

interface PageScaffoldProps {
  children: React.ReactNode;
  grassEnabled?: boolean;
}

export default function PageScaffold({ children, grassEnabled }: PageScaffoldProps) {
  const { width, height } = useWindowSize();

  /*
  The ratio has been kept to 16/10, rather than 16/9, because when the browser is running
  fullscreen on MacBooks, the ratio is smaller than 16/9.
   */
  const isValidState = width > 1280 && height > 720 && width / height >= 16 / 10;
  const errorMessage =
    'Oh no! Ensure that your monitor size is at least 1280 x 720, and display ratio is greater than 16:10';

  return (
    <div className={styles.container}>
      <div className={styles.children}>
        {isValidState ? (
          children
        ) : (
          <div className={styles.error}>
            <ExclamationCircleIcon width={35} />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
      {grassEnabled && (
        <img className={styles.grassImage} src="/assets/grass.png" alt="grass background" />
      )}
    </div>
  );
}

PageScaffold.defaultProps = {
  grassEnabled: true,
};
