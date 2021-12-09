/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSignup } from '../api';

function SignupForm({ onSuccess }) {
  const { signup, error, loading } = useSignup();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const { email, password, name } = event.target.elements;
    signup(email.value, password.value, name.value).then((success) => success && onSuccess());
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
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="name"
          type="text"
          placeholder="name"
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
          Sign up
        </button>
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
          to="/login"
          replace
        >
          Login ?
        </Link>
      </div>
    </form>
  );
}

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SignupForm;
