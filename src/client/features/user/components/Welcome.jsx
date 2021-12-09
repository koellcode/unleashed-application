import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../../lib/fetch';

function Welcome() {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  useEffect(() => {
    fetch('/api/user')
      .then((user) => {
        setUserName(user.name);
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);
  return <h2>Welcome {username}! To logout click here.</h2>;
}

export default Welcome;
