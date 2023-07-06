import { useState } from "react";
import { useControlStore } from "../store";
import { Navigate } from "react-router-dom";


export function StartingPage() {
  const { config, initGame } = useControlStore();
  const [rawConfig, setRawConfig] = useState(() => JSON.stringify(
    {
      boardDimensions: [3, 3],
      winningSequenceLength: 3,
      players: [
        {
          name: "Player 1",
          mark: "X",
        },
        {
          name: "Player 2",
          mark: "0",
        },
      ],
    },
    null,
    2
  ));

  const handleStart = () => {
    initGame(rawConfig);
  };

  if (config) {
    return <Navigate to={'/game'} />;
  }

  return (
    <div id="startingWindow">
      <div id="tips">
        Tips
        <ol>
          <li>Choose board dimensions (maximum "boardDimensions": [7, 20])</li>
          <li>
            Choose how many zeros or crosses should be in a row to win in
            "winningSequenceLength" field
          </li>
          <li>
            Write down the names of the first and second players in the "name"
            fields
          </li>
          <li>Press start!</li>
        </ol>
      </div>
      <div id="provideJson">Provide JSON configuration and press ENTER</div>
      <textarea
        name="config"
        id="json"
        cols="30"
        rows="17"
        value={rawConfig}
        onChange={(event) => setRawConfig(event.target.value)}
      />
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
