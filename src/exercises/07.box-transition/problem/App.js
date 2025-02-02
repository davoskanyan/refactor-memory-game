import { useState } from "react";
import { Box, GameArea } from "./components";
/**
 * ✨ Create and import a `wait` function in the `utils` module that takes a `time` parameter and returns a promise that
 * resolves after the provided `time` in milliseconds.
 */
import { generateCombination, boxColors, FADE_TRANSITION, INITIAL_NUMBER_OF_ROUNDS, MAX_NUMBER_OF_ROUNDS } from "./utils";

function App() {
  /**
   * This state can have one of the following values:
   * "notStarted", "displayingCombination", "userTurn", "gameOver"
   */
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(null);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  const resetStates = () => {
    setGameCombination([]);
    setNumberOfRounds(null);
    setActiveBoxIndex(null);
  };

  /**
   * ✨ Create a `performBoxTransition` async function that takes an `index` parameter.
   * It should set the active box index to the provided `index`, wait for the fade transition time, and then set the
   * active box index to `null`.
   */

  const handleMove = (color) => {
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
    setNumberOfRounds(INITIAL_NUMBER_OF_ROUNDS);
    const colorCombination = generateCombination(INITIAL_NUMBER_OF_ROUNDS);
    setGameCombination(colorCombination);
    await showGameCombination(colorCombination);
  };

  const showGameCombination = async (gameCombination) => {
    setGameStatus("displayingCombination");

    for (const color of gameCombination) {
      const index = boxColors.indexOf(color);

      /**
       * ✨ Simplify this using the `performBoxTransition` function to handle the box transition logic.
       */
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

    /**
     * ✨ Call the `performBoxTransition` function here. Ensure the transition completes before calling the `handleMove`
     * function.
     */
    setActiveBoxIndex(index);

    setTimeout(() => {
      setActiveBoxIndex(null);

      if (color) {
        handleMove(color);
      }
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
