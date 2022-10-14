import {getRandomPositiveInteger,getRandomPositiveFloat,getRandomArrayElement,getRandomArray,formatNumber} from './util.js';

const TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const SIMILAR_AD_COUNT = 10;
const LAT_ADDRESS = getRandomPositiveFloat(35.65, 35.7, 5);
const LNG_ADDRESS = getRandomPositiveFloat(139.7, 139.8, 5);
const LAT_LOCATION = getRandomPositiveFloat(35.65, 35.7, 5);
const LNG_LOCATION = getRandomPositiveFloat(139.7, 139.8, 5);

const createAuthor = () => ({
  avatar: `img/avatars/user${formatNumber(getRandomPositiveInteger(1,10))}.png`,
});

const createLocation = () => ({
  lat: LAT_LOCATION,
  lng: LNG_LOCATION,
});

const createOffer = () => ({
  title: 'Шикарный лофт в центре Петербурга',
  address: `${LAT_ADDRESS}, ${LNG_ADDRESS}`,
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
  author: createAuthor(),
  location: createLocation(),
  offer: createOffer(),
});

const getSimilarAdNear = () => {
  Array.from({length: SIMILAR_AD_COUNT}, createAd);
};

getSimilarAdNear();

export {getSimilarAdNear};
