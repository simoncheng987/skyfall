import React from 'react';
import styles from './AvatarFrame.module.css';

interface AvatarFrameProps {
  imgSrc?: string;
  className?: string;
}

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
