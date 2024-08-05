import { useState } from "react";
import { Box, GameArea } from "./components";
import { generateCombination, boxColors, FADE_TRANSITION } from "./utils";

function App() {
  /**
   * ✨ Replace the next three states with a single `gameStatus` state.
   * The `gameStatus` state should be a string with the following possible values: "notStarted", "displayingCombination", "userTurn", "gameOver".
   */
  const [gameStarted, setGameStarted] = useState(false);
  const [clicksEnabled, setClicksEnabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  /**
   * ✨ The `resetStates` function is called from different flows.
   * Instead of setting the game status here, set it before or after calling this function.
   */
  const resetStates = () => {
    setClicksEnabled(false);
    setGameStarted(false);
    setGameCombination([]);
    setNumberOfRounds(1);
    setActiveBoxIndex(null);
  };

  const handleMove = (color) => {
    const isCorrect = gameCombination[0] === color;

    if (isCorrect) {
      setGameCombination((previousCombination) => previousCombination.slice(1));
      const isEqual = gameCombination.length === 1;
      if (isEqual && gameCombination.length > 0) {
        const isGameEnd = numberOfRounds >= 10 ? true : false;

        if (isGameEnd) {
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
      setGameOver(true);
      resetStates();
    }
  };

  /**
   * ✨ Understand the code and update the `gameStatus` state at appropriate places.
   * Ensure the game logic remains correct.
   */

  const startGame = async () => {
    const numberOfColors = numberOfRounds + 3;
    setNumberOfRounds(numberOfColors);
    const colorCombination = generateCombination(numberOfColors);
    setGameCombination(colorCombination);
    setGameStarted(true);
    setGameOver(false);
    await showGameCombination(colorCombination);
  };

  const showGameCombination = async (gameCombination) => {
    setClicksEnabled(false);

    for (const color of gameCombination) {
      const index = boxColors.indexOf(color);

      await new Promise((resolve) => {
        setTimeout(() => {
          clickBox(index, false);
          resolve();
        }, 2 * FADE_TRANSITION);
      });
    }

    setClicksEnabled(true);
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

  /**
   * ✨ To keep the JSX clean, you can create a boolean variable for each game status:
   *
   * const isNotStarted = gameStatus === "notStarted";
   * const isDisplayingCombination = gameStatus === "displayingCombination";
   * const isUserTurn = gameStatus === "userTurn";
   * const isGameOver = gameStatus === "gameOver";
   */

  return (
    <div className="App">
      <div>
        {gameStarted && clicksEnabled
          ? `Your Turn ${numberOfRounds - gameCombination.length}/${numberOfRounds}`
          : ""}
      </div>
      <div>{gameStarted && !clicksEnabled ? "Displaying Combination" : ""}</div>
      <div>{gameOver ? "Game Over" : ""}</div>
      <div>{!gameStarted ? "Press Start Button" : ""}</div>
      <GameArea isActive={gameStarted}>
        {boxColors.map((color, index) => (
          <Box
            isActive={index === activeBoxIndex}
            color={color}
            disabled={clicksEnabled}
            onClick={() => {
              clickBox(index, color);
            }}
          ></Box>
        ))}
      </GameArea>
      <button type="button" disabled={gameStarted} onClick={startGame}>
        Start
      </button>
    </div>
  );
}

export default App;
