import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../context/ClientProvider';

export default function GameSafetyCheck() {
  const navigate = useNavigate();
  const { client, clearContext } = useClient();

  useEffect(() => {
    if (!client) {
      clearContext();
      navigate('/');
    }
  }, [client]);
}
