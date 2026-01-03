import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UzbekistanPage from './pages/UzbekistanPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ozbekiston" element={<UzbekistanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
