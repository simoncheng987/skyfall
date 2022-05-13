import React from 'react';
import styles from './SpinBox.module.css';

interface SpinBoxProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
  defaultValue?: number;
  className?: string;
}

export default function SpinBox({ onChange, min, max, defaultValue, className }: SpinBoxProps) {
  return (
    <input
      type="number"
      min={min}
      max={max}
      defaultValue={defaultValue}
      onKeyDown={(e) => e.preventDefault()}
      className={`${styles.spinbox} ${className}`}
      onChange={onChange}
    />
  );
}

SpinBox.defaultProps = {
  onChange: () => {},
  min: Math.min,
  max: Math.max,
  defaultValue: 0,
  className: '',
};
