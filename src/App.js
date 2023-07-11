import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { BoardPage } from './pages/BoardPage';
import { EndingPage } from './pages/EndingPage';
import { StartingPage } from './pages/StartingPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<StartingPage />} />
        <Route exact path="/game" element={<BoardPage />} />
        <Route exact path="/end" element={<EndingPage />} />
        <Route
          path="*"
          element={<Navigate to="/start" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;