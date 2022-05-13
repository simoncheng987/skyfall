import React from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  /**
   * The list of options to be displayed.
   */
  options: string[];

  /**
   * Action to be performed when value has been changed.
   */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * A dropdown component that displays all the options provided.
 */
export default function Dropdown({ onChange, options, className }: DropdownProps) {
  return (
    <select onChange={onChange} className={`${styles.dropdownList} ${className}`}>
      {options.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}

Dropdown.defaultProps = {
  onChange: () => {},
  className: '',
};
