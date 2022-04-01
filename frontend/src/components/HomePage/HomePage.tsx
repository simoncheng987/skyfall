import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import PageScaffold from '../PageScaffold';
import Title from '../Title';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <PageScaffold>
      <div className={styles.columnFlex}>
        <Title text="Skyfall" colorScheme="yellow" fontSize="160px" />
        <Button
          text="Create Room"
          className={styles.button}
          buttonStyle="secondary"
          onClick={() => navigate('create')}
        />
        <Button text="Join Room" className={styles.button} onClick={() => navigate('join')} />
      </div>
    </PageScaffold>
  );
}
