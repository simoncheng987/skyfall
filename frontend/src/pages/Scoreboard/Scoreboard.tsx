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

/**
 * This factory function creates a statistics card for a player, provided with the information that
 * it needs, e.g., name and score of the player, and whether they won or lost.
 */
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

/**
 * This component is used at the end of the Skyfall game to show statistics of the winner and loser
 * to the players. Note that it uses the ClientContext and GameContext as its dependencies.
 */
export default function Scoreboard() {
  GameSafetyCheck();

  const { state } = useLocation();
  const navigate = useNavigate();
  const { isHost, name, opponent, clearContext, client } = useClient();
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

      client?.emit('game:my-result', playerProps.playerName, playerProps.winner, playerProps.score);
    }

    return () => {
      clearContext();
    };
  }, []);

  /*
  This function is executed when the 'Back to Home' button is pressed. It firstly clears the game
  contexts and redirects the user back to home (/).
   */
  const endGame = () => {
    resetGame();
    navigate('/');
  };

  return (
    <PageScaffold>
      <div className={styles.container}>
        {/* Container for the winner's and loser's statistics cards. */}
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

        {/* Button to return to the home screen. */}
        <Button className={styles.button} text="Return To Home" onClick={endGame} />
      </div>
    </PageScaffold>
  );
}
