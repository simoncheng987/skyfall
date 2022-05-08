import React from 'react';
import { Link } from 'react-router-dom';
import PageScaffold from '../PageScaffold';
import Button from '../../components/Button';
import styles from './Scoreboard.module.css';
import Title from '../../components/Title';
import Card from './Card';

interface PlayerFactoryProps {
  winner?: boolean;
  loser?: boolean;
  playerName: string;
  score: number;
}

function PlayerFactory({ winner, loser, playerName, score }: PlayerFactoryProps) {
  const title = winner ? 'Winner' : loser ? '💩' : '';
  return (
    <div className={styles.player}>
      <Title fontSize="90px" text={title} colorScheme="yellow" />
      <Card name={playerName} score={score} />
    </div>
  );
}

PlayerFactory.defaultProps = {
  winner: false,
  loser: false,
};

export default function Scoreboard() {
  const playerOne = {
    name: 'Shrey',
    score: 31,
  };

  const playerTwo = {
    name: 'Opponent',
    score: 25,
  };

  return (
    <PageScaffold>
      <div className={styles.container}>
        <div className={styles.grid}>
          <PlayerFactory playerName={playerOne.name} score={playerOne.score} winner />
          <PlayerFactory playerName={playerTwo.name} score={playerTwo.score} loser />
        </div>
        <Link to="/">
          <Button className={styles.button} text="Return To Home" />
        </Link>
      </div>
    </PageScaffold>
  );
}
