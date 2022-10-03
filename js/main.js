const getRandomInteger = (min,max,precision) => {
  if (min < 0 || max < 0 || precision < 0 || min > max) {
    return NaN;
  }
  if (min === max) {
    return min.toFixed(precision);
  }
  let random = max + 1;
  while (random > max) {
    random = Math.random() * (max - min + 1) + min;
  }
  return random.toFixed(precision);
};

getRandomInteger(2,3,2);
