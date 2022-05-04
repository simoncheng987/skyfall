import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import PageScaffold from '../PageScaffold';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './JoinRoom.module.css';
import ErrorToast from '../../components/ErrorToast';
import { useClient } from '../../context/ClientProvider';

export default function JoinRoom() {
  const ERROR_REQUIRED_FIELDS = 'Please complete both fields';

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [name, setPlayerName] = useState('');
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
        setName(name);
        navigate('/lobby', { state: roomId });
      });

      client.once('room:join-fail', (msg) => {
        setErrorMessage(msg);
        setError(true);
      });

      client.emit('room:join', roomId, name);
    }
  }, [client]);

  const onEnterCallback = () => {
    if (name === '' || roomId === '') {
      setErrorMessage(ERROR_REQUIRED_FIELDS);
      setError(true);
    } else {
      setClient(io());
    }
  };

  return (
    <PageScaffold>
      <Title className={styles.title} fontSize="110px" text="Join Room" colorScheme="brown" />
      <div className={styles.buttonsContainer}>
        <TextField onChange={(e) => setPlayerName(e.target.value)} placeholder="Name" />
        <TextField onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
      </div>
      <Button className={styles.button} text="Enter" onClick={onEnterCallback} />
      {error && <ErrorToast className={styles.toast} text={errorMessage} />}
    </PageScaffold>
  );
}
