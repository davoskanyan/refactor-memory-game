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
  const [gameStarted, setGameStarted] = useState(false);
  const [clicksEnabled, setClicksEnabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

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
      const isEqual = gameCombination.length === 1
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
