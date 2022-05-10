import React, { useState } from 'react';
import styles from './WordInput.module.css';

interface WordInputProps {
  placeholder?: string;
  className?: string;

  // eslint-disable-next-line no-unused-vars
  onSubmit: (word: string) => void;
}

export default function WordInput({ placeholder, className, onSubmit }: WordInputProps) {
  const [word, setWord] = useState('');

  const internalOnChange: React.FormEventHandler<HTMLInputElement> = (event) => {
    setWord(event.currentTarget.value);
  };

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
