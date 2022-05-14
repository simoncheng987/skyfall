import React from 'react';
import styles from './Title.module.css';

interface TitleProps {
  /**
   * Text string for the title.
   */
  text: string;
  /**
   * Theme of the title.
   */
  colorScheme: 'pink' | 'yellow' | 'brown';
  /**
   * Font size of the title in terms of pixels (px).
   */
  fontSize: string;
  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * Component used for titles in most pages of the application. It uses the 'Bangers' font which is
 * used for titles in the application. There are a couple of themes that can be used, such as pink,
 * yellow, and brown.
 */
export default function Title({ text, colorScheme, fontSize, className }: TitleProps) {
  const fontStyle = { fontSize };
  return (
    <div className={`${className} ${styles.fontStyle}  ${styles[colorScheme]}`} style={fontStyle}>
      {text}
    </div>
  );
}

Title.defaultProps = {
  className: '',
};
