import React, { useState, useEffect } from "react";
import styled from "styled-components";

/**
 * ✨Move all components, utilities, and constants to separate files.
 */
const GameArea = styled.div`
    height: 220px;
    width: 120px;
    border: "1px solid black";
`;

const Box = styled.div`
    width: 50px;
    height: 100px;
    background-color: ${(props) => props.color};
    text-align: center;
    opacity: ${(props) => (props.isActive ? "30%" : "100%")};
    display: inline-block;
    border: 3px solid ${(props) => (props.isActive ? 'black' : props.color)};
`;

const FADE_TRANSITION = 500;

function App() {
  /**
   * ✨Look for constants and functions that can be separated within this component as well.
   */
  const boxColors = ["red", "blue", "green", "yellow"];
  const [moveCount, setMoveCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [clicksEnabled, setClicksEnabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerCombination, setPlayerCombination] = useState([]);
  const [gameCombination, setGameCombination] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(1);
  const [boxStates, setBoxStates] = useState([false, false, false, false]);

  useEffect(() => {
  }, []);

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

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * boxColors.length);
    return boxColors[randomIndex];
  };

  function generateCombination(length) {
    return Array.from({ length }, () => getRandomColor());
  }

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
    if (boxStates[index]) {
      return;
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

      if (color) {
        setPlayerCombination([...playerCombination, color]);
        const count = moveCount + 1;
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
