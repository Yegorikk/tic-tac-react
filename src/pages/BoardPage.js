import { useControlStore } from "../store";
import { Navigate } from "react-router-dom";

export function BoardPage() {
    const {
        gameBoard,
        isSecondPlayer,
        handleTurn,
        result,
        config
    } = useControlStore();

    if (result) {
        return <Navigate to={'/end'} />;
    } else if (!config) {
        return <Navigate to={'/'} />;
    }
    const {
        players,
        boardDimensions: [rows, cols]
    } = config

    return (
        <div id="board">
            <div id="players">
                <div id="versusField">
                    {players[0].name} vs {players[1].name}
                </div>
                <div id="playerTurn">{players[+isSecondPlayer].name} turn</div>
            </div>
            <div
                id="field"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`
                }}
            >
                {gameBoard.map((row, rowIndex) =>
                    row.map((cell, columnIndex) => (
                        <div
                            key={`${rowIndex}-${columnIndex}`}
                            className="cell"
                            data-row={rowIndex}
                            data-column={columnIndex}
                            onClick={() => handleTurn(rowIndex, columnIndex)}
                        >
                            {cell !== null ? cell : "\u00A0\u00A0"}
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
