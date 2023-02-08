// https://www.geeksforgeeks.org/how-to-build-a-tic-tac-toe-game-using-react-hooks/
// https://beta.reactjs.org/learn/tutorial-tic-tac-toe
// https://github.com/thiskevinwang/react-tictactoe-extras
// https://codepen.io/msdiniz-the-sasster/pen/LYBaGRW?editors=0110 (class)
// https://codesandbox.io/s/tic-tac-toe-tutorial-react-with-enhancements-qbjrzb?file=/index.js (function)
// import { useReducer } from "react";
import React, { useState, createContext, useEffect } from "react";
import Game from "./Game";
import useGame from "./hooks/useGame";
// import { GameContext } from "./hooks/GameContext";

export const GameContext = createContext({
  match: "", ended: false
});

export default function App() {
  const contextGame = useGame();

  console.log(contextGame);
  // https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
  // https://stackoverflow.com/questions/67976388/lifting-state-up-with-functional-components
  // https://stackoverflow.com/questions/40722382/how-to-pass-state-back-to-parent-in-react
  // https://reactjs.org/docs/lifting-state-up.html

  // const [gameEnded, setGameEnded] = useState({ match: "", ended: false });

  // https://beta.reactjs.org/learn/sharing-state-between-components
  // function handleEndGame(howGameEnd) {
  //   setGameEnded(howGameEnd);
  // }

  function handleNewGame() {
    // reset();
    window.location.reload();
    // forceUpdate();
    // setHistory(Array(9).fill(null));
    // setCurrentMove(0);
    // setXIsNext(true);
  }

  return (
    <React.Fragment>
      <div className="game">
        <GameContext.Provider value={contextGame}>
          <div className="game-board">
            <Game />
          </div>
          <div>
            {contextGame.ended && (
              <button onClick={handleNewGame}>New Game ? from App</button>
            )}
          </div>
        </GameContext.Provider>
      </div>
    </React.Fragment>
  );
}
