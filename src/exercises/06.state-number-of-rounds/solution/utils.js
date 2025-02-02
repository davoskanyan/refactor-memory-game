export const boxColors = ["red", "blue", "green", "yellow"];

export const FADE_TRANSITION = 500;

export const INITIAL_NUMBER_OF_ROUNDS = 4;

export const MAX_NUMBER_OF_ROUNDS = 10;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * boxColors.length);
  return boxColors[randomIndex];
};

export function generateCombination(length) {
  return Array.from({ length }, () => getRandomColor());
}
