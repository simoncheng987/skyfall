import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

export default function BackButton() {
  const navigate = useNavigate();
  return <ArrowSmLeftIcon className={styles.backButton} onClick={() => navigate('/')} />;
}
