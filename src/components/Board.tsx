// src/Board.tsx
import React, { useState } from 'react';
import Square from './Square';

const Board: React.FC = () => {
  // Explicitly define board state type
  const [board, setBoard] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));

  const handleCellClick = (index: number) => {
    // Only allow setting a value if the cell is empty
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = 'X'; // Example: setting clicked cell to 'X'
      setBoard(newBoard);
    }
    console.log("the number is ",index)
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, index) => (
        <Square key={index} value={cell} onClick={() => handleCellClick(index)} />
      ))}
    </div>
  );
};

export default Board;