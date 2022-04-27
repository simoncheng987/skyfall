import React from 'react';
import styles from './WordInput.module.css';

interface WordInputProps {
  placeholder?: string;
  className?: string;
  onSubmit?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function WordInput({ placeholder, className, onSubmit, onChange }: WordInputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className={`${className} ${styles.textField}`}
        onSubmit={onSubmit}
        onChange={onChange}
      />
    </div>
  );
}

WordInput.defaultProps = {
  className: '',
  onSubmit: () => {},
  onChange: () => {},
  placeholder: '',
};
