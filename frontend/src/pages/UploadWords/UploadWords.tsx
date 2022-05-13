import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import PageScaffold from '../PageScaffold';
import styles from './UploadWords.module.css';
import BackButton from '../../components/BackButton';

/**
 * This component is used to take information from users, so word lists can be submitted from the
 * Frontend to the Backend.
 */
export default function UploadWords() {
  /*
  All fields in this page are controlled components, so these states are holding information from
  those fields.
   */
  const [name, setName] = useState('');
  const [words, setWords] = useState('');

  async function onFormSubmit(event: FormEvent) {
    event.preventDefault();

    // Splitting the words into an array, and removing empty words.
    const wordArray = words
      .trim()
      .split(' ')
      .filter((word) => word !== '');

    // Sending the backend request to transmit the words.
    await axios.post('/wordList', {
      listName: name,
      wordArray,
    });

    // Clearing the fields.
    setName('');
    setWords('');
  }

  return (
    <PageScaffold>
      <BackButton />
      <div className={styles.container}>
        <h1 className={styles.title}>Upload Words</h1>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <label className={styles.label} htmlFor="list-name">
            List Name
            <input
              className={`${styles.field} ${styles.name}`}
              id="list-name"
              type="text"
              onChange={(n) => setName(n.target.value)}
              value={name}
            />
          </label>
          <label className={styles.label} htmlFor="words">
            Words
            <textarea
              className={`${styles.field} ${styles.textArea}`}
              id="words"
              rows={5}
              onChange={(w) => setWords(w.target.value)}
              value={words}
            />
            <span className={styles.span}>Note: Separate words using space character</span>
          </label>
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </PageScaffold>
  );
}
