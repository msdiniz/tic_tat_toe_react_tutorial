import { useState } from "react";

function useGame() {
  const [gameStatus, setGameStatus] = useState({ match: "", ended: false });
  function informStatusGame(status) {
    switch (status) {
      case status.match("Winner"):
        setGameStatus("Winner", true);
        break;
      case status.match("Draw"):
        setGameStatus("Draw", true);
        break;
      default:
        setGameStatus("Ongoing", false);
        break;
    }
  };

  const currentStatus =  gameStatus.match;
  const ended = gameStatus.ended;
  
  return {
    informStatusGame,
    currentStatus,
    ended
  };
}

export default useGame;