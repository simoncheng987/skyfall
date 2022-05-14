import React, { useState } from 'react';
import styles from './WordInput.module.css';

interface WordInputProps {
  /**
   * Placeholder for the text field component.
   */
  placeholder?: string;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;

  /**
   * Handler that is invoked when the word is internally submitted.
   */
  // eslint-disable-next-line no-unused-vars
  onSubmit: (word: string) => void;
}

/**
 * This component is used in the CurrentPlayerView, where the current player has to type in words
 * that are falling from the sky to get rid of them.
 */
export default function WordInput({ placeholder, className, onSubmit }: WordInputProps) {
  // The input used inside this component is a controlled component, hence we are storing state.
  const [word, setWord] = useState('');

  // This function updates the React state when the input text changes.
  const internalOnChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    setWord(event.currentTarget.value);
  };

  // This function invokes the 'onSubmit' handler passed through props, when the word is submitted.
  const internalOnSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(word);
    setWord('');
  };

  return (
    <form aria-label="word-form" onSubmit={internalOnSubmit}>
      <input
        value={word}
        type="text"
        placeholder={placeholder}
        className={`${className} ${styles.textField}`}
        onChange={internalOnChange}
        aria-label="word-input"
      />
    </form>
  );
}

WordInput.defaultProps = {
  className: '',
  placeholder: 'Type Here',
};
