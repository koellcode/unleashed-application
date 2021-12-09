import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Signup } from './features/login/routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<h2>loggedin</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
