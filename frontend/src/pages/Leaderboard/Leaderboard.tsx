import React from 'react';
import axios from 'axios';
import { ArrowSmLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import styles from './Leaderboard.module.css';
import PageScaffold from '../PageScaffold';
import LeaderboardEntry from '../../types/LeaderboardEntry';

export default function Leaderboard() {
  const navigate = useNavigate();

  const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardEntry[]>([]);
  React.useEffect(() => {
    axios.get('/leaderboard').then((response) => {
      setLeaderboardData(response.data);
    });
  }, []);

  const data: LeaderboardEntry[] = leaderboardData.sort((v1, v2) => v2.score - v1.score);
  return (
    <PageScaffold>
      <ArrowSmLeftIcon className={styles.backButton} onClick={() => navigate('/')} />
      <h1 className={styles.leaderBoardTitle}>Leaderboard</h1>
      <table className={styles.fixedHeader}>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Highest Score</th>
            <th>Win : Lose</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value) => (
            <tr key={value.name}>
              <td>{value.name}</td>
              <td>{value.score}</td>
              <td>{`${value.win} : ${value.lose}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageScaffold>
  );
}
