import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

/**
 * This reusable component represents a Back button, which takes user back to the home page (/).
 */
export default function BackButton() {
  const navigate = useNavigate();
  return <ArrowSmLeftIcon className={styles.backButton} onClick={() => navigate('/')} />;
}
