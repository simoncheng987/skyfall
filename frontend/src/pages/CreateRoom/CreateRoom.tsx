import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import PageScaffold from '../PageScaffold';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './CreateRoom.module.css';
import ErrorToast from '../../components/ErrorToast';
import { useClient } from '../../context/ClientProvider';

export default function CreateRoom() {
  const ERROR_INVALID_NAME = 'Please input your name.';
  const ERROR_MISSING_ROOM = 'Ohho! Cannot create room.';

  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roomId, setRoomId] = useState('');

  const navigate = useNavigate();

  const { client, setClient, setName } = useClient();

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
        navigate('/lobby', { state: roomId });
      });

      client.once('room:join-fail', () => {
        setErrorMessage(ERROR_MISSING_ROOM);
        setError(true);
      });

      client.emit('room:join', roomId, playerName);
    }
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
      <ArrowSmLeftIcon className={styles.backButton} onClick={() => navigate('/')} />
      <Title className={styles.title} fontSize="110px" text="Create Room" colorScheme="pink" />
      <TextField
        className={styles.textField}
        placeholder="Your Name"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button className={styles.button} text="Enter" onClick={() => createRoom()} />
      {error && <ErrorToast className={styles.toast} text={errorMessage} />}
    </PageScaffold>
  );
}
