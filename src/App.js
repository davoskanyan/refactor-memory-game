import React, { useState, useEffect } from "react";
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

function App() {
  const boxColors = ["red", "blue", "green", "yellow"];
  const [moveCount, setMoveCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [clicksEnabled, setClicksEnabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerCombination, setPlayerCombination] = useState([]);
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [boxStates, setBoxStates] = useState([false, false, false, false]);

  useEffect(() => {}, []);

  const isPrefix = (largerArray, smallerArray) => {
    return (
      smallerArray.length <= largerArray.length &&
      smallerArray.every((value, index) => value === largerArray[index])
    );
  };

  const isSame = (firstArray, secondArray) => {
    return (
      secondArray.length === firstArray.length &&
      secondArray.every((value, index) => value === firstArray[index])
    );
  };

  const resetStates = () => {
    setClicksEnabled(false);
    setGameStarted(false);
    setPlayerCombination([]);
    setGameCombination([]);
    setNumberOfRounds(1);
    setBoxStates([false, false, false, false]);
  };

  useEffect(() => {
    const isCorrect = isPrefix(gameCombination, playerCombination);
    if (isCorrect) {
      console.log("isPrefix");
      console.log(playerCombination);
      console.log(gameCombination);
      const isEqual = isSame(gameCombination, playerCombination);
      if (isEqual && gameCombination.length > 0) {
        console.log("isEqual");
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
      console.log("game over");
      console.log(playerCombination);
      console.log(gameCombination);
      setGameOver(true);
      resetStates();
    }
  }, [moveCount]);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * boxColors.length);
    return boxColors[randomIndex];
  };

  function generateCombination(length) {
    return Array.from({ length }, () => getRandomColor());
  }

  const startGame = async () => {
    console.log("startGame");
    const numberOfColors = numberOfRounds + 3;
    setNumberOfRounds(numberOfColors);
    const colorCombination = generateCombination(numberOfColors);
    setGameCombination(colorCombination);
    setPlayerCombination([]);
    setGameStarted(true);
    setGameOver(false);
    console.log(numberOfColors);
    console.log(gameCombination);
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
    if (boxStates[index]) {
      return;
    }
    if (color) {
      setPlayerCombination([...playerCombination, color]);
      const count = moveCount + 1;
      setMoveCount(count);
    }

    setBoxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = true;
      return newStates;
    });

    setTimeout(() => {
      setBoxStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false;
        return newStates;
      });
    }, FADE_TRANSITION);
  };

  return (
    <div className="App">
      <div>{gameOver ? "Game Over" : ""}</div>
      <div>{!gameStarted ? "Press Start Button" : ""}</div>
      <GameArea isActive={gameStarted}>
        {boxColors.map((color, index) => (
          <Box
            isActive={boxStates[index]}
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
