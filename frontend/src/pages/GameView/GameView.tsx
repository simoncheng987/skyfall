import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import CurrentPlayerView from './CurrentPlayerView';
import OpponentPlayerView from './OpponentPlayerView';
import GameStatistics from './GameStatistics';
import { useGameContext } from '../../context/GameContextProvider';
import styles from './GameView.module.css';
import PageScaffold from '../PageScaffold';
import { useClient } from '../../context/ClientProvider';
import GameSafetyCheck from '../../utils/GameSafetyCheck';

/**
 * This is a page that shows the current game status.
 * Player's word list, name, and lives will be shown on the left side of the screen.
 * Opponent's word list, name, and lives will be shown on the top right of the screen.
 * Time since the start of the game, both player's score, will be shown on the bottom right of the screen.
 */
export default function GameView() {
  // Safety check for client's socket
  GameSafetyCheck();

  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    playerScore,
    opponentScore,
    startTime,
    playerWordList,
    opponentWordList,
    onWordSubmitHandler,
    gameStart,
    playerLives,
    opponentLives,
    configureInitialLives,
    initialLives,
  } = useGameContext();

  const { name, opponent, client } = useClient();

  const gameStat = { yourScore: playerScore, opponentScore, gameStartTime: startTime };

  useEffect(() => {
    if (!state) {
      navigate('/create');
    } else {
      // Setting the number of initial lives and starting the game
      configureInitialLives(state as number);
      gameStart(client as Socket);
    }

    client?.once('game:finished', () => {
      navigate('/score', { state: true });
    });
  }, []);

  return (
    <PageScaffold grassEnabled={false}>
      <div className={styles.container}>
        <CurrentPlayerView
          playerName={name}
          onWordSubmit={(e) => onWordSubmitHandler(e, client as Socket)}
          remainingLives={playerLives}
          words={playerWordList}
          totalLives={initialLives}
          className={styles.currentPlayerView}
        />
        <OpponentPlayerView
          words={opponentWordList}
          remainingLives={opponentLives}
          totalLives={initialLives}
          playerName={opponent || ''}
          className={styles.opponentView}
        />
        <GameStatistics data={gameStat} className={styles.gameStatistics} />
      </div>
    </PageScaffold>
  );
}
