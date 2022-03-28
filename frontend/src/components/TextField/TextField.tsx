import React, { useState } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  placeholder: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function TextField({ placeholder, className, onChange }: TextFieldProps) {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        value={name}
        aria-label="name-input"
        placeholder={placeholder}
        type="text"
        className={`${className} ${styles.textField}`}
        onChange={onChange}
        onInput={(e) => {
          const element = e.currentTarget as HTMLInputElement;
          const { value } = element;
          setName(value);
        }}
      />
    </div>
  );
}

TextField.defaultProps = {
  className: '',
  onChange: () => {},
};
