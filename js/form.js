const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

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

export {disabledForm,abledForm};
