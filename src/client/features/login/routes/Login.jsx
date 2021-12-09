import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

function Login() {
  const navigate = useNavigate();

  return (
    <Layout title="Log in">
      <LoginForm onSuccess={() => navigate('/')} />
    </Layout>
  );
}

export default Login;
