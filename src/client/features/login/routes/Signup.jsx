import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

function Login() {
  const navigate = useNavigate();

  return (
    <Layout title="Sign up">
      <SignupForm onSuccess={() => navigate('/')} />
    </Layout>
  );
}

export default Login;
