import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Signup } from './features/login/routes';
import { Welcome } from './features/user/routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
