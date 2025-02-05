import styled from "styled-components";

export const GameArea = styled.div`
    height: 220px;
    width: 120px;
`;

export const Box = styled.div`
    width: 50px;
    height: 100px;
    background-color: ${(props) => props.$color};
    text-align: center;
    opacity: ${(props) => (props.$isActive ? "30%" : "100%")};
    display: inline-block;
    border: 3px solid ${(props) => (props.$isActive ? 'black' : props.$color)};
`;

export const MemoryGameUi = ({
  boxColors,
  gameStatus,
  movesCount,
  remainingMovesCount,
  activeBoxColor,
  onStartNextRound,
  onColorClick
}) => {
  const isNotStarted = gameStatus === "notStarted";
  const isDisplayingCombination = gameStatus === "displayingCombination";
  const isUserTurn = gameStatus === "userTurn";
  const isGameOver = gameStatus === "gameOver";

  return (<div className="App">
      <div>
        {isUserTurn && `Your Turn ${remainingMovesCount}/${movesCount}`}
      </div>
      <div>{isDisplayingCombination && "Displaying Combination"}</div>
      <div>{isGameOver && "Game Over"}</div>
      <div>{isNotStarted && "Press Start Button"}</div>
      <GameArea>
        {boxColors.map((color) => (
          <Box
            key={color}
            $isActive={color === activeBoxColor}
            $color={color}
            disabled={!isUserTurn}
            onClick={() => onColorClick(color)}
          ></Box>
        ))}
      </GameArea>
      <button
        type="button"
        disabled={isUserTurn || isDisplayingCombination}
        onClick={onStartNextRound}
      >
        Start
      </button>
    </div>
  );
};
