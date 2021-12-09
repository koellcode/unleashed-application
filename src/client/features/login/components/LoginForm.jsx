import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <>
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
      <div className="mb-6">
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
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="button">
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
    </>
  );
}

export default LoginForm;
