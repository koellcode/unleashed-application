import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  useEffect(() => {
    fetch('/api/user', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
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
