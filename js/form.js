const ADDRESS_ROUNDING = 5;

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressField = adForm.querySelector('#address');

const getAddressLatLng = (latLng) => {
  addressField.value = `${(latLng.lat).toFixed(ADDRESS_ROUNDING)}, ${(latLng.lng).toFixed(ADDRESS_ROUNDING)}`;
  addressField.readOnly = true;
};

const disabledForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (const element of adForm.children) {
    element.disabled = true;
  }

  mapFilters.classList.add('map__filters--disabled');
  for (const element of mapFilters.children) {
    element.disabled = true;
  }
};

const abledForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const element of adForm.children) {
    element.disabled = false;
  }

  mapFilters.classList.remove('map__filters--disabled');
  for (const element of mapFilters.children) {
    element.disabled = false;
  }
};

export {disabledForm,abledForm,getAddressLatLng};
