import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import PageScaffold from '../PageScaffold';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './CreateRoom.module.css';
import ErrorToast from '../../components/ErrorToast';
import { useClient } from '../../context/ClientProvider';
import BackButton from '../../components/BackButton';
import SpinBox from '../../components/SpinBox';

export default function CreateRoom() {
  const ERROR_INVALID_NAME = 'Please input your name.';
  const ERROR_MISSING_ROOM = 'Ohho! Cannot create room.';

  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [lives, setInitialLives] = useState(3);

  const navigate = useNavigate();

  const { client, setClient, setName, setHost } = useClient();

  useEffect(() => {
    const timeout = setInterval(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  useEffect(() => {
    if (client) {
      client.once('room:join-success', () => {
        setName(playerName);
        setHost();
        navigate('/lobby', { state: { lives, roomId } });
      });

      client.once('room:join-fail', () => {
        setErrorMessage(ERROR_MISSING_ROOM);
        setError(true);
      });

      client.emit('room:join', roomId, playerName);

      return () => {
        client.off('room:join-success');
        client.off('room:join-fail');
      };
    }
    return () => {};
  }, [client]);

  function createRoom() {
    if (playerName.trim().length === 0) {
      setErrorMessage(ERROR_INVALID_NAME);
      setError(true);
    } else {
      fetch('/game', {
        method: 'POST',
      })
        .then((res) => res.text())
        .then((room) => {
          setRoomId(room);
          setClient(io());
        })
        .catch(() => {
          setErrorMessage(ERROR_MISSING_ROOM);
          setError(true);
        });
    }
  }

  return (
    <PageScaffold>
      <BackButton />
      <Title className={styles.title} fontSize="110px" text="Create Room" colorScheme="pink" />
      <h1 className={styles.label}>Player Lives</h1>
      <SpinBox
        className={styles.spinbox}
        min={1}
        max={6}
        defaultValue={3}
        onChange={(e) => setInitialLives(parseInt(e.target.value, 10))}
      />
      <TextField
        className={styles.textField}
        placeholder="Your Name"
        onChange={(e) => setPlayerName(e.target.value)}
        ariaLabel="name-field"
      />
      <Button
        className={styles.button}
        text="Enter"
        onClick={() => createRoom()}
        ariaLabel="enter-button"
      />
      {error && <ErrorToast className={styles.toast} text={errorMessage} />}
    </PageScaffold>
  );
}
