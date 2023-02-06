// https://www.geeksforgeeks.org/how-to-build-a-tic-tac-toe-game-using-react-hooks/
// https://beta.reactjs.org/learn/tutorial-tic-tac-toe
// https://github.com/thiskevinwang/react-tictactoe-extras
// https://codepen.io/msdiniz-the-sasster/pen/LYBaGRW?editors=0110 (class)
// https://codesandbox.io/s/tic-tac-toe-tutorial-react-with-enhancements-qbjrzb?file=/index.js (function)
// import { useReducer } from "react";
import { useState } from "react";
import React from "react";
import Board from "./Board";

export default function Game() {
  // TODO: create Custom Hook unifying history and location 
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [location, setLocation] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const [xIsNext, setXIsNext] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  // const currentSquares = history[history.length - 1];
  // Always the last move ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const currentSquares = history[currentMove];
  const [historyAscending, setHistoryAscending] = useState(true);
  // const [winnerCoordinates, setWinnerCoordinates] = useState(null);

  // https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
  function handleNewGame() {
    // reset();
    window.location.reload();
    // forceUpdate();
    // setHistory(Array(9).fill(null));
    // setCurrentMove(0);
    // setXIsNext(true);
  }

  function handlePlay(nextSquares, squareTouched) {
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
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  function sortHistory() {
    setHistoryAscending(!historyAscending);
  }

  function calculateWinner(squares) {
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

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner.playerThatWon;
  } else if (history.length === 10) {
    status = 'Draw! ';
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move # ${move}: at (${location[move]})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {move !== currentMove && <button onClick={() => jumpTo(move)}>{description}</button>}
        {move === currentMove && <b>`You are at move #{move}`</b>}
      </li>
    );
  });

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} someoneWon={winner} /* winnerCordinates={winnerCoordinates} */ />
        </div>
        <div className="game-info">
          <ol>{historyAscending ? moves : moves.reverse()}</ol>
          <button onClick={() => sortHistory()}>
            Sort by: {historyAscending ? "Ascending" : "Descending"}
          </button>
        </div>
        <div>
          {(status.match("Winner") || status.match("Draw")) && (
            <button onClick={handleNewGame}>New Game ?</button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
