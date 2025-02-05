import { useState } from "react";
import { MemoryGameUi } from "./components";
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
    if (!isCorrect) {
      setGameStatus("gameOver");
      return;
    }

    setGameCombination((previousCombination) => previousCombination.slice(1));
    const wasLastMove = gameCombination.length === 1;
    if (wasLastMove) {
      startNextRound();
      return;
    }

    const isGameFinished = numberOfRounds >= MAX_NUMBER_OF_ROUNDS;
    if (isGameFinished) {
      setGameStatus("gameOver");
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

  return (
    <MemoryGameUi
      boxColors={boxColors}
      gameStatus={gameStatus}
      movesCount={numberOfRounds}
      remainingMovesCount={numberOfRounds - gameCombination.length}
      activeBoxColor={activeBoxColor}
      onStartNextRound={startNextRound}
      onColorClick={handleMove}
    />
  );
}

export default App;
