import { useState, useEffect } from "react";
import { Box, GameArea } from "./components";
import { isPrefix, isSame, generateCombination, boxColors, FADE_TRANSITION } from "./utils";

function App() {
  /**
   * ✨ After making the changes below, you should be able to remove the `moveCount` state.
   */
  const [moveCount, setMoveCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [clicksEnabled, setClicksEnabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
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

  /**
   * ✨ Convert this effect into a function that will be called when the player clicks a box.
   */
  useEffect(() => {
    const isCorrect = isPrefix(gameCombination, playerCombination);
    if (isCorrect) {
      const isEqual = isSame(gameCombination, playerCombination);
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
  }, [moveCount]);

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

    setActiveBoxIndex(index);

    setTimeout(() => {
      setActiveBoxIndex(null);

      if (color) {
        setPlayerCombination([...playerCombination, color]);
        const count = moveCount + 1;
        /**
         * ✨ Instead of updating the `moveCount` state to trigger the effect, call the function directly from here.
         */
        setMoveCount(count);
      }
    }, FADE_TRANSITION);
  };

  return (
    <div className="App">
      <div>
        {gameStarted && clicksEnabled
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
