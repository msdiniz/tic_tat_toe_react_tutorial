import { useState } from "react";

// Not using it:
export function HandlePlay(nextSquares, squareTouched) {
  // TODO: create Custom Hook unifying history and location
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [location, setLocation] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const [xIsNext, setXIsNext] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  // const currentSquares = history[history.length - 1];
  // Always the last move ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const currentSquares = history[currentMove];
  const locations = [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3]
  ];
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory, currentSquares);

  const coordinates = locations[squareTouched];
  const nextLocation = [...location.slice(0, currentMove + 1), coordinates];
  setLocation(nextLocation);

  setCurrentMove(nextHistory.length - 1);
  // setXIsNext(!xIsNext);
  return {
    history,
    setHistory,
    location,
    setLocation,
    currentMove,
    setCurrentMove,
    xIsNext,
    currentSquares //,
    // nextSquares,
    // squareTouched
  };
}

export function calculateWinner(squares) {
  // if (!squares) return;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // setWinnerCoordinates([a, b, c]);
      return { playerThatWon: squares[a], winnerCoordinates: [a, b, c] };
    }
  }
  return null;
}

export function gameStatus(winner, history, xIsNext) {
  // let status;
  if (winner) {
    return "Winner: " + winner.playerThatWon;
  } else if (history.length === 10) {
    return "Draw! ";
  } else {
    return "Next player: " + (xIsNext ? "X" : "O");
  }
}
