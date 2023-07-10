import { useControlStore } from "../store";
import { useNavigate, Navigate } from "react-router-dom";

export function EndingPage() {
  const { config, resetGame, newGame, result } = useControlStore();
  const navigate = useNavigate();

  const handleRestartGame = () => {
    navigate('/game');
    resetGame();
  };

  const handleNewGame = () => {
    navigate('/start');
    newGame();
  };

  if (!config) {
    return <Navigate to={'/start'} />;
  }

  let output;
  if (result === 2) {
    output = "It's a draw!";
  } else if (result === -1) {
    output = config.players[0].name + " wins!";
  } else if (result === 1) {
    output = config.players[1].name + " wins!";
  }

  return (
    <div id="endingWindow">
      <div id="result">{output}</div>
      <img src='images/dancing-color-changing-banana-uqgjzgre642ls20t.gif' alt="" />
      <button onClick={handleRestartGame} id="restartG">Restart</button>
      <button onClick={handleNewGame} id="newG">New game</button>
    </div>
  );
}
