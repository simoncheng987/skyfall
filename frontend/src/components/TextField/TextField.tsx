import React, { useState } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  /**
   * Placeholder for the text field component.
   */
  placeholder: string;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;

  /**
   * Action to be performed when value has been changed.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;

  /**
   * aria-label of the component.
   */
  ariaLabel?: string;
}

/**
 * This is a styled text field component.
 */
export default function TextField({ placeholder, className, onChange, ariaLabel }: TextFieldProps) {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        value={name}
        aria-label={ariaLabel}
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
  ariaLabel: '',
};
