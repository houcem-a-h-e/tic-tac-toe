// src/Board.tsx
import React, { useState } from 'react';
import Square from './Square';
import Button from './Button';
import Modal from './Modal';

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

    const computerMove = (currentBoard: BoardState) => {
    const emptyCells = currentBoard.map((cell, index) => (cell === null ? index : null)).filter((v) => v !== null);
    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const move = emptyCells[randomIndex] as number;

    currentBoard[move] = 'O';
    setBoard([...currentBoard]);

    if (!checkWinner(currentBoard) && !currentBoard.includes(null)) {
      setGameOver(true);
    } else {
      setIsXNext(true);
    }
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
  const handleCloseModal = () => {
    setGameOver(false);
    setWinner(null);
    restartGame();
  };
  return (
    <>
    <div className="grid grid-cols-3 gap-2">
      {board.map((cell, index) => (
        <Square key={index} value={cell} onClick={() => handleCellClick(index)} />
      ))}
       
    </div>
    <div className="mb-4 text-lg">
        <p className="font-semibold">Player X Wins: {wins.X}</p>
        <p className="font-semibold">Player O Wins: {wins.O}</p>
      </div>
      <Button onClick={resetScores} className="bg-[#03045e] hover:bg-peach-500 mt-4 text-white">
        Reset Game Score
      </Button>
       {gameOver && (
        <Modal onClose={handleCloseModal} message={winner ? `${winner} Wins!` : 'It\'s a Draw!'} />
      )}
      </>
    
  );
};

export default Board;