import { clearMap } from './map.js';
const LOW_FILTER_PRICE = 10000;
const HIGH_FILTER_PRICE = 50000;

const filtersList = document.querySelector('.map__filters');

const getPriceRange = (value) => {
  let priceRange;
  if (value < LOW_FILTER_PRICE) {
    priceRange = 'low';
  } else if (value >= LOW_FILTER_PRICE && value <= HIGH_FILTER_PRICE) {
    priceRange = 'middle';
  } else if (value > HIGH_FILTER_PRICE) {
    priceRange = 'high';
  }

  return priceRange;
};

const getCheckedFeatures = (features) => {
  const checkedFeatures = [];
  features.forEach((item) => {
    if (item.checked) {
      checkedFeatures.push(item.value);
    }
  });
  return checkedFeatures;
};

const filterByType = ({offer}) => {
  const housingTypeInput = filtersList.querySelector('[name="housing-type"]');
  return offer.type === housingTypeInput.value || housingTypeInput.value === 'any';
};

const filterByPrice = ({offer}) => {
  const housingPriceInput = filtersList.querySelector('[name="housing-price"]');
  const priceRange = getPriceRange(offer.price);
  return priceRange === housingPriceInput.value || housingPriceInput.value === 'any';
};

const filterByRooms = ({offer}) => {
  const housingRoomsInput = filtersList.querySelector('[name="housing-rooms"]');
  return offer.rooms === +housingRoomsInput.value || housingRoomsInput.value === 'any';
};

const filterByGuests = ({offer}) => {
  const housingGuestsInput = filtersList.querySelector('[name="housing-guests"]');
  return offer.guests === +housingGuestsInput.value || housingGuestsInput.value === 'any';
};

const filterByFeatures = ({offer}) => {
  const features = document.querySelectorAll('[name="features"]');
  const checkedFeatures = getCheckedFeatures(features);
  return checkedFeatures.length === 0 || offer.features && checkedFeatures.every((element) => offer.features.includes(element));
};

const filterAd = (ad) =>
  filterByType(ad)
  && filterByPrice(ad)
  && filterByRooms(ad)
  && filterByGuests(ad)
  && filterByFeatures(ad);

const setChangeEventOnFilter = (cb) => {
  filtersList.addEventListener('change', () => {
    clearMap();
    cb();
  });
};

export {filterAd,setChangeEventOnFilter};
