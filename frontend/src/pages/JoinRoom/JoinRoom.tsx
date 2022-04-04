import React, { useEffect, useState } from 'react';
import PageScaffold from '../PageScaffold';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './JoinRoom.module.css';
import ErrorToast from '../../components/ErrorToast';

export default function JoinRoom() {
  const ERROR_REQUIRED_FIELDS = 'Please complete both fields';
  const ERROR_INVALID_ROOM = 'Ohho! Your room does not exist';

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const timeout = setInterval(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const onEnterCallback = () => {
    if (name === '' || roomId === '') {
      setErrorMessage(ERROR_REQUIRED_FIELDS);
      setError(true);
    }

    // Send a request to the backend here, and check if the room exists.

    setErrorMessage(ERROR_INVALID_ROOM);
    setError(true);
  };

  return (
    <PageScaffold>
      <Title className={styles.title} fontSize="110px" text="Join Room" colorScheme="brown" />
      <div className={styles.buttonsContainer}>
        <TextField onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <TextField onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
      </div>
      <Button className={styles.button} text="Enter" onClick={onEnterCallback} />
      {error && <ErrorToast className={styles.toast} text={errorMessage} />}
    </PageScaffold>
  );
}
