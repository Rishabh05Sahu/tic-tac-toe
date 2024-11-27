import React, { useState } from 'react';

const TicTacToe = () => {

  const [gridSizeInput, setGridSizeInput] = useState(3);
  const [winStreakInput, setWinStreakInput] = useState(3);
  const [gridSize, setGridSize] = useState(null);
  const [winStreak, setWinStreak] = useState(null);
  
  // Game state
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  // Submit Game Configuration
  const handleSubmitConfiguration = () => {
 
    if (gridSizeInput < 3 || gridSizeInput > 10) {
      alert('Grid size must be between 3 and 10');
      return;
    }

    if (winStreakInput < 3 || winStreakInput > gridSizeInput) {
      alert(`Win streak must be between 3 and ${gridSizeInput}`);
      return;
    }


    setGridSize(gridSizeInput);
    setWinStreak(winStreakInput);


    setBoard(Array(gridSizeInput * gridSizeInput).fill(null));
    

    setCurrentPlayer('X');
    setWinner(null);
  };

  const checkWinner = (newBoard) => {
    if (!gridSize || !winStreak) return null;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col <= gridSize - winStreak; col++) {
        let match = true;
        for (let k = 0; k < winStreak; k++) {
          if (newBoard[row * gridSize + col + k] !== currentPlayer) {
            match = false;
            break;
          }
        }
        if (match) return currentPlayer;
      }
    }

    // Column check
    for (let col = 0; col < gridSize; col++) {
      for (let row = 0; row <= gridSize - winStreak; row++) {
        let match = true;
        for (let k = 0; k < winStreak; k++) {
          if (newBoard[(row + k) * gridSize + col] !== currentPlayer) {
            match = false;
            break;
          }
        }
        if (match) return currentPlayer;
      }
    }

    // Diagonal check (top-left to bottom-right)
    for (let row = 0; row <= gridSize - winStreak; row++) {
      for (let col = 0; col <= gridSize - winStreak; col++) {
        let match = true;
        for (let k = 0; k < winStreak; k++) {
          if (newBoard[(row + k) * gridSize + (col + k)] !== currentPlayer) {
            match = false;
            break;
          }
        }
        if (match) return currentPlayer;
      }
    }

    // Diagonal check (top-right to bottom-left)
    for (let row = 0; row <= gridSize - winStreak; row++) {
      for (let col = winStreak - 1; col < gridSize; col++) {
        let match = true;
        for (let k = 0; k < winStreak; k++) {
          if (newBoard[(row + k) * gridSize + (col - k)] !== currentPlayer) {
            match = false;
            break;
          }
        }
        if (match) return currentPlayer;
      }
    }

    // Draw check
    if (newBoard.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  // Handle cell click
  const handleCellClick = (index) => {

    if (!gridSize || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else {
      
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Reset game
  const resetGame = () => {
    setGridSize(null);
    setWinStreak(null);
    setBoard([]);
    setCurrentPlayer('X');
    setWinner(null);
  };

  // Render game board
  const renderBoard = () => {
    return board.map((cell, index) => (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        className="w-16 h-16 border flex items-center justify-center text-3xl font-bold 
        hover:bg-gray-100 transition-colors"
      >
        {cell}
      </button>
    ));
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>

      {/* Game Configuration */}
      {!gridSize && (
        <div className="mb-4 flex flex-col items-center space-y-4">
          <div>
            <label className="block mb-2">Grid Size (3-10)</label>
            <input 
              type="number" 
              value={gridSizeInput} 
              onChange={(e) => setGridSizeInput(Number(e.target.value))}
              min="3" 
              max="10" 
              className="w-20 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Win Streak (3-{gridSizeInput})</label>
            <input 
              type="number" 
              value={winStreakInput} 
              onChange={(e) => setWinStreakInput(Number(e.target.value))}
              min="3" 
              max={gridSizeInput} 
              className="w-20 p-2 border rounded"
            />
          </div>
          <button 
            onClick={handleSubmitConfiguration}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Start Game
          </button>
        </div>
      )}

      {/* Game Board */}
      {gridSize && (
        <>
          <div 
            className="grid gap-1 mx-auto mb-4" 
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              width: 'fit-content'
            }}
          >
            {renderBoard()}
          </div>

          {/* Game Status */}
          <div className="mt-4">
            {winner ? (
              winner === 'draw' ? (
                <p className="text-2xl font-bold">It's a Draw!</p>
              ) : (
                <p className="text-2xl font-bold">Player {winner} Wins!</p>
              )
            ) : (
              <p className="text-xl">Current Player: {currentPlayer}</p>
            )}
            
            <div className="flex justify-center space-x-4 mt-4">
              {winner && (
                <button 
                  onClick={resetGame}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Play Again
                </button>
              )}
              {!winner&&(
              <button 
                onClick={resetGame}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reset Configuration
              </button>)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TicTacToe;