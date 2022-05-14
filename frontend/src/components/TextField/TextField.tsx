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
   * An aria label for this component.
   */
  ariaLabel?: string;
}

/**
 * Reusable input component used across the application wherever the end-users provide their input
 * by typing something.
 */
export default function TextField({ placeholder, className, onChange, ariaLabel }: TextFieldProps) {
  /*
  The internal input component is a controlled component, meaning that everytime it changes, the
  value inside the input will be reflected by this state. Similarly, if the internal state is
  changed manually using the setName function, the new state will be reflected within the input.
   */
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
