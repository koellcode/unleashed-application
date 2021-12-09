/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetch from '../../../lib/fetch';

function LoginForm({ onSuccess }) {
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setErrorMessage();
    const user = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then(() => onSuccess())
      .catch(() => setErrorMessage('login failed'));
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
          E-Mail
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          placeholder="email"
        />
      </div>
      <div className="mb-2">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <p className={`mb-4 text-red-800 text-xs italic ${errorMessage ? 'visible' : 'invisible'}`}>
        {errorMessage || 'empty'}
      </p>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="submit">
          Log In
        </button>
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
          to="/signup"
          replace
        >
          Signup ?
        </Link>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
