/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLogin } from '../api';

function LoginForm({ onSuccess }) {
  const { login, loading, error } = useLogin();
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value).then((success) => success && onSuccess());
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>
      <p className={`mb-4 text-red-800 text-xs italic ${error ? 'visible' : 'invisible'}`}>
        {error || 'empty'}
      </p>
      <div className="flex items-center justify-between">
        <button
          className={`bg-blue-${loading ? '100' : '500'} text-white font-bold py-2 px-4 rounded`}
          type="submit"
          disabled={loading}
        >
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
