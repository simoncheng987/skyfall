import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartBarIcon } from '@heroicons/react/outline';
import Button from '../../components/Button';
import PageScaffold from '../PageScaffold';
import Title from '../../components/Title';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageScaffold>
      <Title text="Skyfall" colorScheme="yellow" fontSize="130px" />
      <div className={styles.buttons}>
        <Button
          text="Create Room"
          className={styles.button}
          buttonStyle="secondary"
          onClick={() => navigate('create')}
          ariaLabel="create-room-button"
        />
        <Button
          text="Join Room"
          className={styles.button}
          onClick={() => navigate('join')}
          ariaLabel="join-room-button"
        />
      </div>
      <ChartBarIcon className={styles.leaderboard} onClick={() => navigate('leaderboard')} />
    </PageScaffold>
  );
}
