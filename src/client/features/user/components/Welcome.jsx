import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../../lib/fetch';

function Welcome() {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const handleLogout = useCallback(() => {
    fetch('/api/logout', {
      method: 'POST',
    }).finally(() => navigate('/login'));
  }, []);

  useEffect(() => {
    fetch('/api/user')
      .then((user) => {
        setUserName(user.name);
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);
  return (
    <h2>
      Welcome {username}! To logout click{' '}
      <button type="button" onClick={handleLogout}>
        <strong>here</strong>
      </button>
      .
    </h2>
  );
}

export default Welcome;
