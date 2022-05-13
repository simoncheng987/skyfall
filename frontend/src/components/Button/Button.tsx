import React from 'react';
import styles from './Button.module.css';

/*
  Primary (default) color is brown.
  Secondary color is pink.
  Last is a muted button with grey color.
 */
type ButtonStyles = 'primary' | 'secondary' | 'grey';

interface ButtonProps {
  /**
   * Text that is displayed on the button.
   */
  text: string;

  /**
   * Primary (brown), secondary (pink), or grey
   */
  buttonStyle?: ButtonStyles;

  /**
   * The event that is triggered when button is pressed.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;

  /**
   * aria-label of the component.
   */
  ariaLabel?: string;
}

/**
 * A styled button component.
 */
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
