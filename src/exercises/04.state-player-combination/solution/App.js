import { useState } from "react";
import { Box, GameArea } from "./components";
import { isPrefix, isSame, generateCombination, boxColors, FADE_TRANSITION } from "./utils";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [clicksEnabled, setClicksEnabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  /**
   * ✨ After making the changes below, you should be able to remove the `playerCombination` state and all the usages.
   */
  const [playerCombination, setPlayerCombination] = useState([]);
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  const resetStates = () => {
    setClicksEnabled(false);
    setGameStarted(false);
    setPlayerCombination([]);
    setGameCombination([]);
    setNumberOfRounds(1);
    setActiveBoxIndex(null);
  };

  const handleMove = (color) => {
    const playerNewCombination = [...playerCombination, color];
    setPlayerCombination(playerNewCombination);
    /**
     * ✨ To check if the predicted color is correct, compare the first element of the `gameCombination` array with the
     * `color` argument. After that, update the `gameCombination` array.
     */
    const isCorrect = isPrefix(gameCombination, playerNewCombination);

    if (isCorrect) {
      const isEqual = isSame(gameCombination, playerNewCombination);
      if (isEqual && gameCombination.length > 0) {
        const isGameEnd = numberOfRounds >= 10 ? true : false;

        if (isGameEnd) {
          resetStates();
        } else {
          const rounds = numberOfRounds + 1;
          setNumberOfRounds(rounds);
          const colorCombination = generateCombination(rounds);
          setGameCombination(colorCombination);
          setPlayerCombination([]);
          showGameCombination(colorCombination);
        }
      }
    } else {
      setGameOver(true);
      resetStates();
    }
  };

  const startGame = async () => {
    const numberOfColors = numberOfRounds + 3;
    setNumberOfRounds(numberOfColors);
    const colorCombination = generateCombination(numberOfColors);
    setGameCombination(colorCombination);
    setPlayerCombination([]);
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

  return (
    <div className="App">
      <div>
        {gameStarted && clicksEnabled
          // ✨ Use the `numberOfRounds` state together with `gameCombination` instead of `playerCombination`.
          ? `Your Turn ${playerCombination.length}/${gameCombination.length}`
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
