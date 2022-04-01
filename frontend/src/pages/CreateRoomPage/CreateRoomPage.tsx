import React from 'react';
import PageScaffold from '../../components/PageScaffold';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import styles from './CreateRoomPage.module.css';

interface TitleProps {
  className?: string;
}
export default function CreateRoomPage({ className }: TitleProps) {
  return (
    <div className={`${className}`}>
      <PageScaffold>
        <Title className={styles.title} fontSize="120px" text="CREATE ROOM" colorScheme="pink" />
        <TextField className={styles.textField} placeholder="Your Name" />
        <Button className={styles.button} text="Enter" />
      </PageScaffold>
    </div>
  );
}

CreateRoomPage.defaultProps = {
  className: '',
};
