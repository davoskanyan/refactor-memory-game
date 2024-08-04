export const boxColors = ["red", "blue", "green", "yellow"];

export const FADE_TRANSITION = 500;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * boxColors.length);
  return boxColors[randomIndex];
};

export const isPrefix = (largerArray, smallerArray) => {
  return (
    smallerArray.length <= largerArray.length &&
    smallerArray.every((value, index) => value === largerArray[index])
  );
};

export const isSame = (firstArray, secondArray) => {
  return (
    secondArray.length === firstArray.length &&
    secondArray.every((value, index) => value === firstArray[index])
  );
};

export function generateCombination(length) {
  return Array.from({ length }, () => getRandomColor());
}