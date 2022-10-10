const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const SIMILAR_AD_COUNT = 10;

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

const formatNumber = (input) => (input < 10 ? `0${input}` : input);

const getRandomArray = (array) => {
  const randomArray = [];
  while (randomArray.length <= getRandomPositiveInteger(1,array.length)) {
    randomArray.push(getRandomArrayElement(array));
  }
  return Array.from(new Set(randomArray));
};

const createAutor = () => ({
  avatar: `img/avatars/user${formatNumber(getRandomPositiveInteger(1,10))}.png`,
});

const createLocation = () => ({
  lat: getRandomPositiveFloat(35.65, 35.7, 5),
  lng: getRandomPositiveFloat(139.7, 139.8, 5),
});

const createOffer = () => ({
  title: 'Шикарный лофт в центре Петербурга',
  address: `${createLocation().lat}, ${createLocation().lng}`,
  price: getRandomPositiveInteger(1,100000),
  type: getRandomArrayElement(TYPE_HOUSING),
  rooms: getRandomPositiveInteger(1,4),
  guests: getRandomPositiveInteger(1,30),
  checkin: getRandomArrayElement(CHECK_TIME),
  checkout: getRandomArrayElement(CHECK_TIME),
  features: getRandomArray(FEATURES),
  description: 'Сдаётся уютная квартира в стиле лофт с удобным местоположением! До Метро Парк Победы 1400 метров, до Пулково 15 минут на такси, 20 минут на Метро до центра города. Всегда свободная парковка рядом с парадной.',
  photos: getRandomArray(PHOTOS),
});

const createAd = () => ({
  autor: createAutor(),
  location: createLocation(),
  offer: createOffer(),
});

const similarAdNear = () => {
  Array.from({length: SIMILAR_AD_COUNT}, createAd);
};

similarAdNear();
