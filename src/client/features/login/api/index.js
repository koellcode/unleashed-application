import { useState } from 'react';
import fetch from '../../../lib/fetch';
import validateUser from '../../../../common/validation/user';
import { LOGIN_MESSAGES } from '../utils/messages';

export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  return {
    login: (email, password) => {
      setLoading(true);
      return fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
        .then(() => true)
        .catch(() => setErrorMessage('login failed'))
        .finally(() => setLoading(false));
    },

    loading,
    error: errorMessage,
  };
};

export const useSignup = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  return {
    signup: (email, password, name) => {
      const user = { email, password, name };

      try {
        validateUser(user);
      } catch (error) {
        setErrorMessage(LOGIN_MESSAGES[error.message] || 'unknown valdation error');
        return Promise.resolve(false);
      }

      setLoading(true);
      return fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(user),
      })
        .then(() => true)
        .catch(() => setErrorMessage('sign up failed'))
        .finally(() => setLoading(false));
    },
    loading,
    error: errorMessage,
  };
};
