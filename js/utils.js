export const getRandomNumberFromInterval = (start, end) =>
  Math.ceil(Math.random() * (end - start + 1)) + (start - 1);

export const shuffle = (array) => array.sort(() => Math.random() - 0.5);
