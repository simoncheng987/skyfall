import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvatarFrame from '../../components/AvatarFrame';
import Button from '../../components/Button';
import ErrorToast from '../../components/ErrorToast';
import Title from '../../components/Title';
import { useClient } from '../../context/ClientProvider';
import GameSafetyCheck from '../../utils/GameSafetyCheck';
import PageScaffold from '../PageScaffold';
import styles from './Lobby.module.css';

export default function Lobby() {
  GameSafetyCheck();

  const { state } = useLocation();
  const navigate = useNavigate();

  const WAITING_PLAYER = 'Waiting for player...';
  const MAX_PLAYER = 2;
  const imageUrls = ['host.png', 'guest.png'];

  const { client, setOpponent, isHost } = useClient();

  const [players, setPlayers] = useState<[string, string][]>([]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timeout = setInterval(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const startGame = () => client?.emit('game:start');

  client?.on('broadcast:player-joined', (mapStr) => {
    const map = JSON.parse(mapStr);
    Object.entries(map).forEach(([key, value]) => {
      if (key !== client.id) {
        setOpponent(value as string);
      }
    });

    setPlayers(Object.entries(map));
  });

  useEffect(() => {
    if (!state) {
      navigate('/create');
    } else {
      client?.on('game:start-fail', (msg) => {
        setErrorMessage(msg);
        setError(true);
      });

      client?.once('game:start-success', () => {
        navigate('/game', { state: true });
      });
    }

    return () => {
      client?.off('game:start-fail');
      client?.off('broadcast:player-joined');
    };
  }, []);

  return (
    <PageScaffold>
      <div className={styles.root}>
        <Title className={styles.title} fontSize="110px" text="Lobby" colorScheme="pink" />
        <p className={`${styles.roomId} ${styles.defaultText}`}>Room ID: {state as number}</p>
        <div className={styles.playersContainer}>
          {players.map((map, index) => (
            <div className={styles.player} key={map[0]}>
              <AvatarFrame imgSrc={imageUrls[index]} />
              <p className={`${styles.playerName} ${styles.defaultText}`}>{map[1]}</p>
            </div>
          ))}

          {players.length < MAX_PLAYER && (
            <div className={styles.player}>
              <AvatarFrame />
              <p className={`${styles.playerName} ${styles.defaultText}`}>{WAITING_PLAYER}</p>
            </div>
          )}
        </div>
        {isHost && players.length >= MAX_PLAYER && (
          <Button className={styles.button} text="Start" onClick={startGame} />
        )}
        {error && <ErrorToast className={styles.toast} text={errorMessage} />}
      </div>
    </PageScaffold>
  );
}
