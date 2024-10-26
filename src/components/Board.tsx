// src/Board.tsx
import React, { useState } from 'react';
import Square from './Square';
import Button from './Button';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];
const Board: React.FC = () => {
 const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [wins, setWins] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);

   const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    if (checkWinner(newBoard)) return;

    if (!newBoard.includes(null)) {
      setGameOver(true);
      return;
    }

    setIsXNext(!isXNext);
  };

  const checkWinner = (board: BoardState): boolean => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a] as Player);
        console.log("winner is ",board[a])
        setGameOver(true);
        setWins(prev => ({
          ...prev,
          [board[a] as Player]: prev[board[a] as Player] + 1,
        }));
        return true;
      }
    }
    return false;
  };

    const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };
  const resetScores = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
    setWins({ X: 0, O: 0 });
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, index) => (
        <Square key={index} value={cell} onClick={() => handleCellClick(index)} />
      ))}
       <Button onClick={resetScores} className="bg-[#03045e] hover:bg-peach-500 mt-4 text-white">
        Reset Game Score
      </Button>
    </div>
    
  );
};

export default Board;