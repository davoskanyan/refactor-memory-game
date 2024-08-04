export const boxColors = ["red", "blue", "green", "yellow"];

export const FADE_TRANSITION = 500;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * boxColors.length);
  return boxColors[randomIndex];
};

export function generateCombination(length) {
  return Array.from({ length }, () => getRandomColor());
}