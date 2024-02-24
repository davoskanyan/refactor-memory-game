import React, { useState } from "react";
import styled from "styled-components";

const GameArea = styled.div`
  height: 200px;
  width: 100px;
  border: "1px solid black";
`;

const Box = styled.button`
  width: 50%;
  height: 50%;
  background-color: ${(props) => props.color};
  text-align: center;
  opacity: ${(props) => (props.$isActive ? "50%" : "100%")};
  display: inline-block;
  border: none;
`;

const FADE_TRANSITION = 500;

const boxColors = ["red", "blue", "green", "yellow"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * boxColors.length);
  return boxColors[randomIndex];
};

function generateCombination(length) {
  return Array.from({ length }, () => getRandomColor());
}

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function App() {
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(3);
  const [activeBoxColor, setActiveBoxColor] = useState(null);

  // notStarted | displayingCombination | userTurn | gameOver
  const [gameStatus, setGameStatus] = useState("notStarted");

  const startNextRound = async () => {
    const nextNumberOfRounds = numberOfRounds + 1;
    setNumberOfRounds(nextNumberOfRounds);

    const nextCombination = generateCombination(nextNumberOfRounds);
    setGameCombination(nextCombination);

    setGameStatus("displayingCombination");
    await showGameCombination(nextCombination);
    setGameStatus("userTurn");
  };

  const resetStates = () => {
    setGameCombination([]);
    setNumberOfRounds(3);
    setActiveBoxColor(null);
  };

  const handleMove = async (color) => {
    await performBoxTransition(color);

    const isCorrect = gameCombination[0] === color;
    if (isCorrect) {
      setGameCombination((previousCombination) => previousCombination.slice(1));
      const isEqual = gameCombination.length === 1;
      if (isEqual && gameCombination.length > 0) {
        const isGameEnd = numberOfRounds >= 10;

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

  async function performBoxTransition(color) {
    setActiveBoxColor(color);
    await wait(FADE_TRANSITION);
    setActiveBoxColor(null);
  }

  const showGameCombination = async (gameCombination) => {
    for (const color of gameCombination) {
      await wait(FADE_TRANSITION);
      await performBoxTransition(color);
    }
  };

  const notStarted = gameStatus === "notStarted";
  const displayingCombination = gameStatus === "displayingCombination";
  const userTurn = gameStatus === "userTurn";
  const gameOver = gameStatus === "gameOver";

  return (
    <div className="App">
      <div>
        {userTurn &&
          `Your Turn ${
            numberOfRounds - gameCombination.length
          }/${numberOfRounds}`}
      </div>
      <div>{displayingCombination && "Displaying Combination"}</div>
      <div>{gameOver && "Game Over"}</div>
      <div>{notStarted && "Press Start Button"}</div>
      <GameArea>
        {boxColors.map((color) => (
          <Box
            key={color}
            color={color}
            disabled={!userTurn}
            onClick={() => handleMove(color)}
            $isActive={color === activeBoxColor}
          ></Box>
        ))}
      </GameArea>
      <button
        type="button"
        disabled={userTurn || displayingCombination}
        onClick={startNextRound}
      >
        Start
      </button>
    </div>
  );
}

export default App;
