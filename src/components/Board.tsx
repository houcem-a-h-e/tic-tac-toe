import React, { useState } from 'react';
import Circle from './Circle'; // Component for each cell in the board
import Button from './Button'; // Reusable button component
import Modal from './Modal'; // Modal to show game results
import { FaUserFriends, FaRobot, FaRedoAlt, FaUser } from 'react-icons/fa'; // Font Awesome icons

type Player = 'X' | 'O'; // Define players
type BoardState = (Player | null)[]; // State type for the board

const Board: React.FC = () => {
  // State management for the game
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null)); // Initialize the board
  const [isXNext, setIsXNext] = useState<boolean>(true); // Track whose turn it is
  const [wins, setWins] = useState<{ X: number; O: number }>({ X: 0, O: 0 }); // Track wins for each player
  const [gameMode, setGameMode] = useState<'player' | 'computer'>('player'); // Track game mode
  const [gameOver, setGameOver] = useState<boolean>(false); // Track game state
  const [winner, setWinner] = useState<Player | null>(null); // Track winner

  // Handle clicking on a cell
  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return; // Prevent click if cell is already filled or game is over

    const newBoard = board.slice(); // Create a copy of the board
    newBoard[index] = isXNext ? 'X' : 'O'; // Update the board with the current player's move
    setBoard(newBoard);

    if (checkWinner(newBoard)) return; // Check for a winner

    // Check if the game is a draw
    if (!newBoard.includes(null)) {
      setGameOver(true);
      return;
    }

    setIsXNext(!isXNext); // Switch turns

    // If playing against the computer, make a move automatically
    if (gameMode === 'computer' && !gameOver) {
      computerMove(newBoard);
    }
  };

  // Function to check for a winner
  const checkWinner = (board: BoardState): boolean => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    // Check each winning combination
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a] as Player); // Set the winner
        setGameOver(true); // End the game
        setWins(prev => ({
          ...prev,
          [board[a] as Player]: prev[board[a] as Player] + 1, // Increment win count
        }));
        return true;
      }
    }
    return false; // No winner found
  };

  // Logic for the computer's move
  const computerMove = (currentBoard: BoardState) => {
    const emptyCells = currentBoard.map((cell, index) => (cell === null ? index : null)).filter((v) => v !== null);
    if (emptyCells.length === 0) return; // No available moves

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const move = emptyCells[randomIndex] as number;

    currentBoard[move] = 'O'; // Computer plays 'O'
    setBoard([...currentBoard]);

    // Check for a winner or draw after the computer's move
    if (!checkWinner(currentBoard) && !currentBoard.includes(null)) {
      setGameOver(true);
    } else {
      setIsXNext(true); // Switch back to player
    }
  };

  // Reset the game state for a new game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  // Reset scores for both players
  const resetScores = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
    setWins({ X: 0, O: 0 });
  };

  // Change the game mode
  const handleModeChange = (mode: 'player' | 'computer') => {
    if (mode !== gameMode) {
      setGameMode(mode);
      restartGame();
    }
  };

  // Close the modal and reset the game
  const handleCloseModal = () => {
    setGameOver(false);
    setWinner(null);
    restartGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#caf0f8] p-4 mx-2">
      <h1 className="text-3xl mb-4 text-blue-600">Tic Tac Toe</h1>
      <div className="mb-4 flex justify-center space-x-2">
        <Button 
          onClick={() => handleModeChange('player')} 
          className={`bg-[#0077b6] ${gameMode === 'player' ? 'ring-2 ring-blue-200' : ''} 
          hover:bg-[#005f8c] hover:shadow-2xl hover:scale-105 transition-all duration-200`}>
          <FaUserFriends className="inline-block mr-2 text-base sm:text-lg md:text-xl lg:text-2xl" /> 
          <br />2 Players
        </Button>

        <Button 
          onClick={() => handleModeChange('computer')} 
          className={`bg-[#00b4d8] ${gameMode === 'computer' ? 'ring-2 ring-green-200' : ''} 
          hover:bg-[#0095b8] hover:shadow-2xl hover:scale-105 transition-all duration-200`}>
          <FaRobot className="inline-block mr-2 text-base sm:text-lg md:text-xl lg:text-2xl" /> 
          <br />VS Computer
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-1 mb-4 w-full max-w-xs">
        {board.map((cell, index) => (
          <Circle 
            key={index} 
            value={cell} 
            onClick={() => handleCellClick(index)} 
            className="bg-white hover:bg-gray-200" // Add hover effect here
          />
        ))}
      </div>

<div className="mb-4 text-lg">
  <p className="font-semibold flex items-center">
    <FaUser className="mr-2 text-blue-600" />
    Player <span className="text-blue-600 mx-1">X</span> Wins: <span className="text-blue-600 font-bold">{wins.X}</span>
  </p>
  <p className="font-semibold flex items-center">
    <FaUser className="mr-2 text-green-600" />
    Player <span className="text-green-600 mx-1">O</span> Wins: <span className="text-green-600 font-bold">{wins.O}</span>
  </p>
</div>

      <Button 
        onClick={resetScores} 
        className="bg-[#03045e] hover:bg-[#001d3f] hover:shadow-2xl hover:scale-105 mt-4 text-white">
        <FaRedoAlt className="inline-block mr-2" /> Reset Game Score
      </Button>
      {gameOver && (
        <Modal onClose={handleCloseModal} message={winner ? `${winner} Wins!` : 'It\'s a Draw!'} />
      )}
    </div>
  );
};

export default Board;
