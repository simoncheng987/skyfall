import React from 'react';
import styles from './AvatarFrame.module.css';

interface AvatarFrameProps {
  /**
   * The src of the image.
   */
  imgSrc?: string;

  /**
   * Additional class names to style this component from the outside.
   */
  className?: string;
}

/**
 * This is a component that displays a player's avatar.
 */
export default function AvatarFrame({ imgSrc, className }: AvatarFrameProps) {
  return (
    <div className={`${className} ${styles.frame}`}>
      {imgSrc && <img src={imgSrc} alt="player" className={styles.image} />}
    </div>
  );
}

AvatarFrame.defaultProps = {
  imgSrc: '',
  className: '',
};
