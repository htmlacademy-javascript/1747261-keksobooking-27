import {clearMap, renderMarkers} from './map.js';


const LOW_FILTER_PRICE = 10000;
const HIGH_FILTER_PRICE = 50000;
const SIMILAR_AD_COUNT = 10;
const DEFAULT_VALUE = 'any';

const filtersList = document.querySelector('.map__filters');

const resetFilters = (ads) => {
  filtersList.reset();
  clearMap();
  renderMarkers(ads.slice(0,SIMILAR_AD_COUNT));
};

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
  return offer.type === housingTypeInput.value || housingTypeInput.value === DEFAULT_VALUE;
};

const filterByPrice = ({offer}) => {
  const housingPriceInput = filtersList.querySelector('[name="housing-price"]');
  const priceRange = getPriceRange(offer.price);
  return priceRange === housingPriceInput.value || housingPriceInput.value === DEFAULT_VALUE;
};

const filterByRooms = ({offer}) => {
  const housingRoomsInput = filtersList.querySelector('[name="housing-guests"]');
  return offer.rooms === +housingRoomsInput.value || housingRoomsInput.value === DEFAULT_VALUE;
};

const filterByGuests = ({offer}) => {
  const housingGuestsInput = filtersList.querySelector('[name="housing-rooms"]');
  return offer.guests === +housingGuestsInput.value || housingGuestsInput.value === DEFAULT_VALUE;
};

const filterByFeatures = ({offer}) => {
  const features = document.querySelectorAll('[name="features"]');
  const checkedFeatures = getCheckedFeatures(features);
  return checkedFeatures.length === 0 || offer.features && checkedFeatures.every((element) => offer.features.includes(element));
};

const getFilteredAds = (ads) => {
  const filterAds = [];
  for (const ad of ads) {
    if (filterAds.length >= SIMILAR_AD_COUNT) {
      break;
    }
    if (
      filterByType(ad) &&
      filterByPrice(ad) &&
      filterByRooms(ad) &&
      filterByGuests(ad) &&
      filterByFeatures(ad)
    ) {
      filterAds.push(ad);
    }
  }

  return filterAds;
};

const setChangeEventOnFilter = (cb) => {
  filtersList.addEventListener('change', () => {
    clearMap();
    cb();
  });
};

export {resetFilters,getFilteredAds,setChangeEventOnFilter,SIMILAR_AD_COUNT};
