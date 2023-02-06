import React from "react";

// function Square() {
// const [value, setValue] = useState(null);
// Commented because I Lifted the state to Board component
// function handleClick() {
//   setValue('X');
// }
// function handleClick() {
//   console.log(`${value} clicked!`);
// }
function Square({ value, onSquareClick, highlight = false }) {
  return (
    <button className={(highlight ? "win" : "square")} onClick={onSquareClick}>
      {value}
    </button>
  );
}
// Array(9).fill(null) creates an array with nine elements and
// sets each of them to null.
// The useState() call around it declares a squares state variable that’s initially set to that array. Each entry in the array corresponds to the value of a square. When you fill the board in later, the squares array will look something like this:
// ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
// function Board() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [squares, setSquares] = useState(Array(9).fill(null));

export default function Board({ xIsNext, squares, onPlay, someoneWon/* , winnerCoordinates */ }) {
  function handleClick(i) {
    if (squares[i] || someoneWon) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
    console.log(nextSquares);
  }
  
  function shouldHighlight(whichSquare) {
    if (!someoneWon) return false;
    console.log(someoneWon.winnerCoordinates);
    return someoneWon.winnerCoordinates.indexOf(whichSquare) !== -1;
  }
  
  function renderSquare(i) {
    return (
      <Square
        key={"square " + i}
        highlight={shouldHighlight(i)}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
      />
    );
  }
  // highlight={shouldHighlight(0)} value={squares[0]} onSquareClick={() => handleClick(0)}

  function renderSquares(n) {
    let squares = [];
    for (let i = n; i < n + 3; i++) {
      squares.push(renderSquare(i));
    }
    return squares;
  }

  function renderRows(i) {
    return <div className="board-row" key={"div " + i}>{renderSquares(i)}</div>;
  }

  return (
    // <>
    // ^^^^ not working because Babel version:
    // https://stackoverflow.com/questions/48316365/react-fragment-shorthand-failing-to-compile
    <React.Fragment>
      {/* <div className="board-row">
        <Square highlight={shouldHighlight(0)} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square highlight={shouldHighlight(1)} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square highlight={shouldHighlight(2)} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square highlight={shouldHighlight(3)} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square highlight={shouldHighlight(4)} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square highlight={shouldHighlight(5)} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square highlight={shouldHighlight(6)} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square highlight={shouldHighlight(7)} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square highlight={shouldHighlight(8)} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div> */}
      {renderRows(0)}
      {renderRows(3)}
      {renderRows(6)}
    </React.Fragment>

  );
}
