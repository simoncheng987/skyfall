import React from 'react';
import styles from './Button.module.css';

// Primary (defaut) color is brown.
// Secondary color is pink.
type ButtonStyles = 'primary' | 'secondary';

interface ButtonProps {
  text: string;
  buttonStyle?: ButtonStyles;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  ariaLabel?: string;
}

export default function Button({ text, buttonStyle, onClick, className, ariaLabel }: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      className={`${className} ${styles.button} ${styles.text} ${styles[buttonStyle as string]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  buttonStyle: 'primary',
  onClick: () => {},
  className: '',
  ariaLabel: '',
};
