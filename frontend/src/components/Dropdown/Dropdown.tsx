import React from 'react';
import styles from './Dropdown.module.css';

interface DropdownProps {
  options: string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

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
