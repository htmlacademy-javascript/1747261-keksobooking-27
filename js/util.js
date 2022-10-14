const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomPositiveFloat = (a,b,precision) => {
  if (a < 0 || b < 0 || precision < 0) {
    return NaN;
  }
  if (a === b) {
    return a.toFixed(precision);
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  let random = upper + 1;
  while (random > upper) {
    random = Math.random() * (upper - lower + 1) + lower;
  }
  return random.toFixed(precision);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (array) => {
  const randomArray = [];
  while (randomArray.length <= getRandomPositiveInteger(1,array.length)) {
    randomArray.push(getRandomArrayElement(array));
  }
  return Array.from(new Set(randomArray));
};

const formatNumber = (input) => (input < 10 ? `0${input}` : input);

export {getRandomPositiveInteger,getRandomPositiveFloat,getRandomArrayElement,getRandomArray,formatNumber};
