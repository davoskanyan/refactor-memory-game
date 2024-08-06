import { useState } from "react";
import { Box, GameArea } from "./components";
/**
 * ✨ Create and import constants INITIAL_NUMBER_OF_ROUNDS and MAX_NUMBER_OF_ROUNDS from utils
 */
import { generateCombination, boxColors, FADE_TRANSITION } from "./utils";

function App() {
  /**
   * This state can have one of the following values:
   * "notStarted", "displayingCombination", "userTurn", "gameOver"
   */
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [gameCombination, setGameCombination] = useState([]);
  /**
   * ✨ Set the initial value of `numberOfRounds` state to `null` before the game starts.
   */
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  const resetStates = () => {
    setGameCombination([]);
    /**
     * ✨ Reset the initial value of `numberOfRounds`.
     */
    setNumberOfRounds(1);
    setActiveBoxIndex(null);
  };

  const handleMove = (color) => {
    const isCorrect = gameCombination[0] === color;

    if (isCorrect) {
      setGameCombination((previousCombination) => previousCombination.slice(1));
      const isEqual = gameCombination.length === 1;
      if (isEqual && gameCombination.length > 0) {
        /**
         * ✨ Use the MAX_NUMBER_OF_ROUNDS constant.
         */
        const isGameEnd = numberOfRounds >= 10 ? true : false;

        if (isGameEnd) {
          setGameStatus("notStarted");
          resetStates();
        } else {
          const rounds = numberOfRounds + 1;
          setNumberOfRounds(rounds);
          const colorCombination = generateCombination(rounds);
          setGameCombination(colorCombination);
          showGameCombination(colorCombination);
        }
      }
    } else {
      setGameStatus("gameOver");
      resetStates();
    }
  };

  const startGame = async () => {
    const numberOfColors = numberOfRounds + 3;
    /**
     * ✨ Set the INITIAL_NUMBER_OF_ROUNDS when the game starts.
     */
    setNumberOfRounds(numberOfColors);
    const colorCombination = generateCombination(numberOfColors);
    setGameCombination(colorCombination);
    await showGameCombination(colorCombination);
  };

  const showGameCombination = async (gameCombination) => {
    setGameStatus("displayingCombination");

    for (const color of gameCombination) {
      const index = boxColors.indexOf(color);

      await new Promise((resolve) => {
        setTimeout(() => {
          clickBox(index, false);
          resolve();
        }, 2 * FADE_TRANSITION);
      });
    }

    setGameStatus("userTurn");
  };

  const clickBox = (index, color) => {
    if (index === activeBoxIndex) {
      return;
    }
    if (color) {
      handleMove(color);
    }

    setActiveBoxIndex(index);

    setTimeout(() => {
      setActiveBoxIndex(null);
    }, FADE_TRANSITION);
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
        {boxColors.map((color, index) => (
          <Box
            isActive={index === activeBoxIndex}
            color={color}
            disabled={!isUserTurn}
            onClick={() => {
              clickBox(index, color);
            }}
          ></Box>
        ))}
      </GameArea>
      <button
        type="button"
        disabled={isUserTurn || isDisplayingCombination}
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
}

export default App;
