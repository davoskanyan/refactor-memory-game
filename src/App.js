import React, { useState } from "react";
import styled from "styled-components";

const GameArea = styled.div`
  height: 200px;
  width: 100px;
  border: "1px solid black";
`;

const Box = styled.div`
  width: 50%;
  height: 50%;
  background-color: ${(props) => props.color};
  text-align: center;
  opacity: ${(props) => (props.isActive ? "50%" : "100%")};
  display: inline-block;
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

function App() {
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  // notStarted | displayingCombination | userTurn | gameOver
  const [gameStatus, setGameStatus] = useState("notStarted");

  const resetStates = () => {
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
          setGameStatus("notStarted");
          resetStates();
        } else {
          const rounds = numberOfRounds + 1;
          setNumberOfRounds(rounds);
          const colorCombination = generateCombination(rounds);
          setGameCombination(colorCombination);
          showGameCombination(colorCombination);
          setGameStatus("userTurn");
        }
      }
    } else {
      setGameStatus("gameOver");
      resetStates();
    }
  };

  const startGame = async () => {
    const numberOfColors = numberOfRounds + 3;
    setNumberOfRounds(numberOfColors);
    const colorCombination = generateCombination(numberOfColors);
    setGameCombination(colorCombination);
    setGameStatus("displayingCombination");
    await showGameCombination(colorCombination);
    setGameStatus("userTurn");
  };

  const showGameCombination = async (gameCombination) => {
    for (const color of gameCombination) {
      const index = boxColors.indexOf(color);

      await new Promise((resolve) => {
        setTimeout(() => {
          clickBox(index, false);
          resolve();
        }, 2 * FADE_TRANSITION);
      });
    }
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
        {boxColors.map((color, index) => (
          <Box
            isActive={index === activeBoxIndex}
            color={color}
            disabled={!userTurn}
            onClick={() => {
              clickBox(index, color);
            }}
          ></Box>
        ))}
      </GameArea>
      <button
        type="button"
        disabled={userTurn || displayingCombination}
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
}

export default App;
