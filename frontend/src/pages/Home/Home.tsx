import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartBarIcon } from '@heroicons/react/outline';
import Button from '../../components/Button';
import PageScaffold from '../PageScaffold';
import Title from '../../components/Title';
import styles from './Home.module.css';

/**
 * This component is the entrypoint to the application, because it is registered with the / route
 * of the application, and it shows the following buttons to access different parts of the game.
 *
 * - Create Room
 * - Join Room
 * - Upload Words
 * - Leaderboard (top-right corner)
 */
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
        <Button
          text="Upload Words"
          className={styles.button}
          buttonStyle="grey"
          onClick={() => navigate('upload-words')}
          ariaLabel="upload-words-button"
        />
      </div>
      <ChartBarIcon
        aria-label="leaderboard-icon"
        className={styles.leaderboard}
        onClick={() => navigate('leaderboard')}
      />
    </PageScaffold>
  );
}
