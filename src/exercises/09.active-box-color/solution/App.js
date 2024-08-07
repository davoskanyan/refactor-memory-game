import { useState } from "react";
import { Box, GameArea } from "./components";
import {
  generateCombination,
  wait,
  boxColors,
  FADE_TRANSITION,
  INITIAL_NUMBER_OF_ROUNDS,
  MAX_NUMBER_OF_ROUNDS
} from "./utils";

function App() {
  /**
   * This state can have one of the following values:
   * "notStarted", "displayingCombination", "userTurn", "gameOver"
   */
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(null);
  const [activeBoxColor, setActiveBoxColor] = useState(null);

  const resetStates = () => {
    setGameCombination([]);
    setNumberOfRounds(null);
    setActiveBoxColor(null);
  };

  const startNextRound = async () => {
    const newNumberOfRounds = numberOfRounds ? numberOfRounds + 1 : INITIAL_NUMBER_OF_ROUNDS;
    setNumberOfRounds(newNumberOfRounds);

    const nextCombination = generateCombination(newNumberOfRounds);
    setGameCombination(nextCombination);

    await showGameCombination(nextCombination);
  };

  async function performBoxTransition(color) {
    setActiveBoxColor(color);
    await wait(FADE_TRANSITION);
    setActiveBoxColor(null);
  }

  const handleMove = async (color) => {
    await performBoxTransition(color);
    const isCorrect = gameCombination[0] === color;

    if (isCorrect) {
      setGameCombination((previousCombination) => previousCombination.slice(1));
      const isEqual = gameCombination.length === 1;
      if (isEqual && gameCombination.length > 0) {
        const isGameEnd = numberOfRounds >= MAX_NUMBER_OF_ROUNDS;

        if (isGameEnd) {
          setGameStatus("notStarted");
          resetStates();
        } else {
          startNextRound();
        }
      }
    } else {
      setGameStatus("gameOver");
      resetStates();
    }
  };

  const showGameCombination = async (gameCombination) => {
    setGameStatus("displayingCombination");

    for (const color of gameCombination) {
      await wait(FADE_TRANSITION);
      await performBoxTransition(color);
    }

    setGameStatus("userTurn");
  };

  const isNotStarted = gameStatus === "notStarted";
  const isDisplayingCombination = gameStatus === "displayingCombination";
  const isUserTurn = gameStatus === "userTurn";
  const isGameOver = gameStatus === "gameOver";

  return (
    <div className="App">
      <div>
        {isUserTurn &&
          `Your Turn ${
            numberOfRounds - gameCombination.length
          }/${numberOfRounds}`}
      </div>
      <div>{isDisplayingCombination && "Displaying Combination"}</div>
      <div>{isGameOver && "Game Over"}</div>
      <div>{isNotStarted && "Press Start Button"}</div>
      <GameArea>
        {boxColors.map((color) => (
          <Box
            isActive={color === activeBoxColor}
            color={color}
            disabled={!isUserTurn}
            onClick={() => handleMove(color)}
          ></Box>
        ))}
      </GameArea>
      <button
        type="button"
        disabled={isUserTurn || isDisplayingCombination}
        onClick={startNextRound}
      >
        Start
      </button>
    </div>
  );
}

export default App;
