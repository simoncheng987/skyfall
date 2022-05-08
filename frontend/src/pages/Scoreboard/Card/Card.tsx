import React from 'react';
import styles from './Card.module.css';
import AvatarFrame from '../../../components/AvatarFrame';

interface CardProps {
  name: String;
  score: Number;
}

export default function Card({ name, score }: CardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.playerInformation}>
        <AvatarFrame imgSrc="/host.png" />
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.scoreContainer}>
        <p className={styles.statsHeading}>SCORE</p>
        <p className={styles.statsBody}>{score} words</p>
      </div>
    </div>
  );
}
