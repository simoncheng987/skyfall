import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvatarFrame from '../../components/AvatarFrame';
import Button from '../../components/Button';
import Title from '../../components/Title';
import { useClient } from '../../context/ClientProvider';
import PageScaffold from '../PageScaffold';
import styles from './Lobby.module.css';

export default function Lobby() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/create');
    }
  }, []);

  const WAITING_PLAYER = 'Waiting for player...';
  const MAX_PLAYER = 2;
  const imageUrls = ['host.png', 'guest.png'];

  const { client, setOpponent } = useClient();

  const [players, setPlayers] = useState<[string, string][]>([]);

  client?.on('broadcast:player-joined', (mapStr) => {
    const map = JSON.parse(mapStr);
    Object.entries(map).forEach(([key, value]) => {
      if (key !== client.id) {
        setOpponent(value as string);
      }
    });

    setPlayers(Object.entries(map));
  });

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
        {players.length >= MAX_PLAYER && <Button className={styles.button} text="Start" />}
      </div>
    </PageScaffold>
  );
}
