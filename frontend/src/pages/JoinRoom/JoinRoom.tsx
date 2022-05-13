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
import BackButton from '../../components/BackButton';

/**
 * This page component is for users to join a particular room by entering their name, and room ID.
 * Note that it uses ClientContext as one of its dependencies.
 */
export default function JoinRoom() {
  const navigate = useNavigate();
  const { client, setClient, setName } = useClient();

  const ERROR_REQUIRED_FIELDS = 'Please complete both fields';

  // Various states tracking the error state of the page, and the two inputs.
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');

  /*
  When 'error' is set to 'true', a setInterval callback is scheduled to run after 2000ms that sets
  'error' to false. This is because the error toast should only be shown for 2 seconds.
   */
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
        navigate('/lobby', { state: { lives: 0, roomId } });
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
      // If either of the fields were left empty, show the error toast.
      setErrorMessage(ERROR_REQUIRED_FIELDS);
      setError(true);
    } else {
      setClient(io());
    }
  };

  return (
    <PageScaffold>
      <BackButton />
      <Title className={styles.title} fontSize="110px" text="Join Room" colorScheme="brown" />

      {/* Container for all the text fields. */}
      <div className={styles.buttonsContainer}>
        <TextField
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Name"
          ariaLabel="name-input"
        />
        <TextField
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Room ID"
          ariaLabel="room-id-input"
        />
      </div>

      {/* Button to submit request to join the room. */}
      <Button
        className={styles.button}
        text="Enter"
        onClick={onEnterCallback}
        ariaLabel="join-button"
      />
      {error && <ErrorToast className={styles.toast} text={errorMessage} />}
    </PageScaffold>
  );
}
