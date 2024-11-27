import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  // Game configuration
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  
  // Game state
  const [board, setBoard] = useState(Array(gridSize * gridSize).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  // Reset game when grid size changes
  useEffect(() => {
    resetGame();
  }, [gridSize, winStreak]);

  // Check for winner
  const checkWinner = (newBoard) => {
    // Check rows
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

    // Check columns
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

    // Check diagonals (top-left to bottom-right)
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

    // Check diagonals (top-right to bottom-left)
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

    // Check for draw
    if (newBoard.every(cell => cell !== null)) {
      return 'draw';
    }

    return null;
  };

  // Handle cell click
  const handleCellClick = (index) => {
    // Don't allow move if cell is already filled or game is won
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else {
      // Switch players
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(gridSize * gridSize).fill(null));
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

  // Grid Size Validation Function
  const handleGridSizeChange = (value) => {
    const numValue = Number(value);
    
    // Check if grid size is between 3 and 10
    if (numValue < 3 || numValue > 10) {
      // Use alert instead of error state
      alert('Grid size must be between 3 and 10');
      // Reset to default 3 if invalid
      setGridSize(3);
      setWinStreak(3);
      return;
    }

    setGridSize(numValue);
    
    // Adjust win streak if it exceeds new grid size
    setWinStreak(Math.min(winStreak, numValue));
  };

  // Win Streak Validation Function
  const handleWinStreakChange = (value) => {
    const streak = Number(value);
    
    // Validate win streak
    if (streak < 3 || streak > gridSize) {
      // Use alert instead of error state
      alert(`Win streak must be between 3 and ${gridSize}`);
      // Reset to default or maximum allowed
      setWinStreak(Math.min(Math.max(streak, 3), gridSize));
      return;
    }

    setWinStreak(streak);
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>

      {/* Game Configuration */}
      <div className="mb-4 flex justify-center space-x-4">
        <div>
          <label className="block mb-2">Grid Size (3-10)</label>
          <input 
            type="number" 
            value={gridSize} 
            onChange={(e) => handleGridSizeChange(e.target.value)}
            min="3" 
            max="10" 
            className="w-20 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Win Streak (3-{gridSize})</label>
          <input 
            type="number" 
            value={winStreak} 
            onChange={(e) => handleWinStreakChange(e.target.value)}
            min="3" 
            max={gridSize} 
            className="w-20 p-2 border rounded"
          />
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="grid gap-1 mx-auto" 
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
        
        {winner && (
          <button 
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;