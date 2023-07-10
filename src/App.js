import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { BoardPage } from './pages/BoardPage';
import { EndingPage } from './pages/EndingPage';
import { StartingPage } from './pages/StartingPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route exact path="/game" element={<BoardPage />} />
        <Route exact path="/end" element={<EndingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
