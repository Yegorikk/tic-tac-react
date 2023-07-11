import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { BoardPage } from './pages/BoardPage';
import { EndingPage } from './pages/EndingPage';
import { StartingPage } from './pages/StartingPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tic-tac-react" element={<StartingPage />} />
        <Route exact path="/tic-tac-react/game" element={<BoardPage />} />
        <Route exact path="/tic-tac-react/end" element={<EndingPage />} />
        <Route
          path="*"
          element={<Navigate to="/tic-tac-react" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;