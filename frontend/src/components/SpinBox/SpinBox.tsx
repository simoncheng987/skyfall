import React from 'react';
import styles from './SpinBox.module.css';

interface SpinBoxProps {
  /**
   * Action to be performed when value has been changed.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Minimum value of the spinbox.
   */
  min?: number;

  /**
   * Maximum value of the spinbox.
   */
  max?: number;

  /**
   * Default value of the spinbox.
   */
  defaultValue?: number;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * A styled spinbox component.
 */
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
