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
import Dropdown from '../../components/Dropdown';

/**
 * This is a page for creating a room for playing the game.
 * Players can pick a list of word and configure the starting lives in this page.
 */
export default function CreateRoom() {
  const ERROR_INVALID_NAME = 'Please input your name.';
  const ERROR_MISSING_ROOM = 'Ohho! Cannot create room.';
  const WORD_LIST_NAME = 'default';

  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [lives, setInitialLives] = useState(3);
  const [listNames, setListNames] = useState<string[]>([WORD_LIST_NAME]);
  const [pickedList, setPickedList] = useState<string>(WORD_LIST_NAME);

  const navigate = useNavigate();

  const { client, setClient, setName, setHost } = useClient();

  useEffect(() => {
    // Fetching the list of word for player to pick
    fetch('/wordList')
      .then((res) => res.json())
      .then((data) =>
        data.map((wordList: { listName: string; wordList: string[] }) => wordList.listName),
      )
      .then((wordlistNames) => setListNames(wordlistNames))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timeout = setInterval(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  useEffect(() => {
    // Setting up the client when it is available.
    if (client) {
      client.once('room:join-success', () => {
        setName(playerName);
        setHost();
        navigate('/lobby', { state: { lives, pickedList, roomId } });
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

      <h1 className={styles.label}>Word List</h1>
      <Dropdown options={listNames} onChange={(e) => setPickedList(e.target.value)} />

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
