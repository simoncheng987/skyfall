import React from 'react';
import styles from './Card.module.css';
import AvatarFrame from '../../../components/AvatarFrame';

interface CardProps {
  name: String;
  score: Number;
  guestImage?: boolean;
}

export default function Card({ name, score, guestImage }: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.playerInformation}>
        <AvatarFrame imgSrc={guestImage ? '/guest.png' : '/host.png'} />
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.scoreContainer}>
        <p className={styles.statsHeading}>SCORE</p>
        <p className={styles.statsBody}>{score} words</p>
      </div>
    </div>
  );
}

Card.defaultProps = {
  guestImage: false,
};
