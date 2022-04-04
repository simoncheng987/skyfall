import React from 'react';
import PageScaffold from '../PageScaffold';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './CreateRoom.module.css';

export default function CreateRoom() {
  return (
    <PageScaffold>
      <Title className={styles.title} fontSize="110px" text="Create Room" colorScheme="pink" />
      <TextField className={styles.textField} placeholder="Your Name" />
      <Button className={styles.button} text="Enter" />
    </PageScaffold>
  );
}
