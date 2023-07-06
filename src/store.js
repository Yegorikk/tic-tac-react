import { create } from "zustand";
import { produce } from "immer";

export const useControlStore = create((set, get) => ({
    config: null,
    movesCount: 0,
    isSecondPlayer: false,
    gameBoard: [],
    result: null,
    setConfig: (newConfig) => set({ config: newConfig }),
    initGame: (rawConfig) => {
        try {
            if (isValidConfig(rawConfig)) {
                get().setConfig(JSON.parse(rawConfig))
                get().createField(get().config)
            }
        } catch {
            alert('Provide valid JSON!')
        }
    },
    createField: (config) => {
        const [rows, cols] = config.boardDimensions;
        const gameBoard = Array.from({ length: rows }, () => Array(cols).fill(null));
        set(
            produce((state) => {
                state.gameBoard = gameBoard;
            })
        );
    },
    handleTurn: (row, column) => {
        const currentPlayer = get().config.players[+get().isSecondPlayer];
        const gameBoard = get().gameBoard;

        if (gameBoard[row][column] !== null) return;
        set(
            produce((state) => {
                state.gameBoard[row][column] = currentPlayer.mark;
            })
        );
        get().checkResult(currentPlayer, get().gameBoard);
        get().toggleIsSecondPlayer();
    },

    checkResult: (player, gameBoard) => {
        const {
            boardDimensions: [rows, cols],
            winningSequenceLength,
        } = get().config;
        get().incrementMovesCount();
        console.log(get().movesCount, player, get().gameBoard)

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (j <= cols - winningSequenceLength) {
                    let winCount = 0;
                    for (let k = 0; k < winningSequenceLength; k++) {
                        if (gameBoard[i][j + k] === player.mark) {
                            winCount++;
                        } else {
                            break;
                        }
                    }
                    if (winCount === winningSequenceLength) {
                        get().endGame(player);
                        return;
                    }
                }

                if (i <= rows - winningSequenceLength) {
                    let winCount = 0;
                    for (let k = 0; k < winningSequenceLength; k++) {
                        if (gameBoard[i + k][j] === player.mark) {
                            winCount++;
                        } else {
                            break;
                        }
                    }
                    if (winCount === winningSequenceLength) {
                        get().endGame(player);
                        return;
                    }
                }

                if (i <= rows - winningSequenceLength && j <= cols - winningSequenceLength) {
                    let winCount = 0;
                    for (let k = 0; k < winningSequenceLength; k++) {
                        if (gameBoard[i + k][j + k] === player.mark) {
                            winCount++;
                        } else {
                            break;
                        }
                    }
                    if (winCount === winningSequenceLength) {
                        get().endGame(player);
                        return;
                    }
                }

                if (i <= rows - winningSequenceLength && j >= winningSequenceLength - 1) {
                    let winCount = 0;
                    for (let k = 0; k < winningSequenceLength; k++) {
                        if (gameBoard[i + k][j - k] === player.mark) {
                            winCount++;
                        } else {
                            break;
                        }
                    }
                    if (winCount === winningSequenceLength) {
                        get().endGame(player);
                        return;
                    }
                }
            }
        }

        if (get().movesCount === rows * cols) {
            get().endGame();
        }
    },
    endGame: (player) => {
        if (player === get().config.players[0]) {
            set({ result: -1 });
        } else if (player === get().config.players[1]) {
            set({ result: 1 });
        } else {
            set({ result: 2 });
        }
    },
    newGame: () => {
        set({
            config: null,
            gameBoard: [],
            movesCount: 0,
            isSecondPlayer: false,
            result: null,
        })
    },
    resetGame: () => {
        set({
            gameBoard: [],
            movesCount: 0,
            isSecondPlayer: false,
            result: null,
        })
        get().createField(get().config)
    },
    incrementMovesCount: () => set((state) => ({ movesCount: state.movesCount + 1 })),
    toggleIsSecondPlayer: () => set((state) => ({ isSecondPlayer: !state.isSecondPlayer })),
    setGameBoard: (board) => set({ gameBoard: board }),
}));



function isValidConfig(config) {
    const { players, boardDimensions, winningSequenceLength } = JSON.parse(config);

    if (!boardDimensions || boardDimensions.length !== 2) {
        alert("Please provide valid board dimensions.");
        return false;
    }

    const [rows, cols] = boardDimensions;

    if (typeof rows !== "number" || typeof cols !== "number" || rows <= 0 || cols <= 0) {
        alert("Please provide valid board dimensions.");
        return false;
    }

    if (rows > 7 || cols > 20) {
        alert("Board dimensions cannot exceed [7, 20].");
        return false;
    }

    if (typeof winningSequenceLength !== "number" || winningSequenceLength <= 0) {
        alert("Please provide a valid winning sequence length.");
        return false;
    }

    if (winningSequenceLength > rows || winningSequenceLength > cols) {
        alert("Winning sequence length cannot exceed board dimensions.");
        return false;
    }

    // check names
    if (!(players instanceof Array) || players.length !== 2) {
        alert("The players name or mark fields are missing");
        return false;
    }

    if (!players[0].name || !players[1].name) {
        alert("Please provide names for both players.");
        return false;
    }

    if (players[0].mark !== "X" && players[0].mark !== "0") {
        alert("Please provide only X or 0 in the mark field.");
        return false;
      }
      
      if (players[1].mark !== "X" && players[1].mark !== "0") {
        alert("Please provide only X or 0 in the mark field.");
        return false;
      }
      
      if (players[0].mark === players[1].mark) {
        alert("Marks can not be the same!");
        return false;
      }

    return true;
}
