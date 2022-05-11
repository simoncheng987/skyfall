import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageScaffold from '../PageScaffold';
import Button from '../../components/Button';
import styles from './Scoreboard.module.css';
import Title from '../../components/Title';
import Card from './Card';
import GameSafetyCheck from '../../utils/GameSafetyCheck';
import { useClient } from '../../context/ClientProvider';
import { useGameContext } from '../../context/GameContextProvider';

interface PlayerFactoryProps {
  winner?: boolean;
  loser?: boolean;
  guest?: boolean;
  playerName: string;
  score: number;
}

function PlayerFactory({ winner, loser, playerName, score, guest }: PlayerFactoryProps) {
  const title = winner ? 'Winner' : loser ? '💩' : '';
  return (
    <div className={styles.player}>
      <Title fontSize="90px" text={title} colorScheme="yellow" />
      <Card name={playerName} score={score} guestImage={guest} />
    </div>
  );
}

PlayerFactory.defaultProps = {
  winner: false,
  loser: false,
  guest: false,
};

export default function Scoreboard() {
  GameSafetyCheck();

  const { state } = useLocation();
  const navigate = useNavigate();
  const { isHost, name, opponent } = useClient();
  const { playerLives, playerScore, opponentLives, opponentScore, resetGame } = useGameContext();

  const [playerOne, setPlayerOne] = useState<PlayerFactoryProps>({ playerName: '', score: 0 });
  const [playerTwo, setPlayerTwo] = useState<PlayerFactoryProps>({ playerName: '', score: 0 });

  useEffect(() => {
    if (!state) {
      navigate('/');
    } else {
      const playerProps: PlayerFactoryProps = {
        playerName: name,
        score: playerScore,
        winner: playerLives > opponentLives,
        loser: playerLives <= opponentLives,
      };
      const opponentProps: PlayerFactoryProps = {
        playerName: opponent || '',
        score: opponentScore,
        winner: opponentLives > playerLives,
        loser: opponentLives <= playerLives,
      };
      if (isHost) {
        setPlayerOne(playerProps);
        setPlayerTwo(opponentProps);
      } else {
        setPlayerTwo(playerProps);
        setPlayerOne(opponentProps);
      }
    }
  }, []);

  const endGame = () => {
    resetGame();
    navigate('/');
  };

  return (
    <PageScaffold>
      <div className={styles.container}>
        <div className={styles.grid}>
          <PlayerFactory
            playerName={playerOne.playerName}
            score={playerOne.score}
            winner={playerOne.winner}
            loser={playerOne.loser}
          />
          <PlayerFactory
            guest
            playerName={playerTwo.playerName}
            score={playerTwo.score}
            winner={playerTwo.winner}
            loser={playerTwo.loser}
          />
        </div>
        <Button className={styles.button} text="Return To Home" onClick={endGame} />
      </div>
    </PageScaffold>
  );
}
