import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import styles from './ErrorToast.module.css';

interface ErrorToastProps {
  /**
   * The error message to be displayed on the error toast.
   */
  text: string;
  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * This toast component can be used to show display errors. The toast is configured to have a red
 * background, an exclamation mark icon to the left, and error message to the right that can be
 * passed as prop to this component.
 */
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
