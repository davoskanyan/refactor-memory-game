import { useState } from "react";
import { Box, GameArea } from "./components";
import { generateCombination, wait, boxColors, FADE_TRANSITION, INITIAL_NUMBER_OF_ROUNDS, MAX_NUMBER_OF_ROUNDS } from "./utils";

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

  async function performBoxTransition(index) {
    setActiveBoxIndex(index);
    await wait(FADE_TRANSITION);
    setActiveBoxIndex(null);
  }

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
      await wait(FADE_TRANSITION);
      await performBoxTransition(index);
    }

    setGameStatus("userTurn");
  };

  const clickBox = async (index, color) => {
    if (index === activeBoxIndex) {
      return;
    }

    const colorIndex = boxColors.indexOf(color);
    await performBoxTransition(colorIndex);

    if (color) {
      handleMove(color);
    }
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
