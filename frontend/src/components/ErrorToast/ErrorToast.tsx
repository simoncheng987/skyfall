import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import styles from './ErrorToast.module.css';

interface ErrorToastProps {
  text: string;
  className?: string;
}

export default function ErrorToast({ text, className }: ErrorToastProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles.flexbox}>
        <ExclamationCircleIcon className={styles.icon} width={30} color="white" />
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}

ErrorToast.defaultProps = {
  className: '',
};
