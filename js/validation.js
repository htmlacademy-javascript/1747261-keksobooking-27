import {resetAddress, resetCoordinate} from './map.js';
import {showErrorPopup, showSuccessPopup} from './popup.js';
import {sendData} from './api.js';
import {resetFilters} from './filter.js';
import {resetPreview} from './form.js';

const CAPACITY_NOT_FOR_GUESTS = '0';
const ROOM_FOR_ONE_GUEST = '1';
const RoomsOption = {
  '1': ['1'],
  '2': ['2','1'],
  '3': ['3','2','1'],
  '100': ['0']
};
const TypeOption = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(
  adForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element'
  }
);

const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');

const validateCapacity = () =>
  RoomsOption[roomsField.value].includes(capacityField.value);

const getCapacityErrorMessage = () => {
  if (capacityField.value === CAPACITY_NOT_FOR_GUESTS) {
    return '100 комнат не для гостей';
  } else if (roomsField.value === ROOM_FOR_ONE_GUEST) {
    return `${capacityField.value} гостей невозможно разместить в ${roomsField.value} комнате`;
  }
  else {
    return `${capacityField.value} гостей невозможно разместить в ${roomsField.value} комнаты`;
  }
};

const onCapacityChange = () => {
  pristine.validate(capacityField);
  pristine.validate(roomsField);
};

const onRoomsChange = () => {
  pristine.validate(capacityField);
  pristine.validate(roomsField);
};

pristine.addValidator(capacityField,validateCapacity,getCapacityErrorMessage);
capacityField.addEventListener('change', onCapacityChange);
roomsField.addEventListener('change', onRoomsChange);

const priceField = adForm.querySelector('[name="price"]');
const typeField = adForm.querySelector('[name="type"]');
const sliderElement = adForm.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

const validatePrice = () =>
  +TypeOption[typeField.value] <= +priceField.value;

const getPriceErrorMessage = () =>
  `Минимальная цена ${TypeOption[typeField.value]}`;

const onTypeChange = () => {
  priceField.placeholder = TypeOption[typeField.value];
  priceField.min = TypeOption[typeField.value];
  pristine.validate(priceField);
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
typeField.addEventListener('change', onTypeChange);

const timeinField = adForm.querySelector('[name="timein"]');
const timeoutField = adForm.querySelector('[name="timeout"]');

const onTimeinChange = () => {
  timeoutField.value = timeinField.value;
};

const onTimeoutChange = () => {
  timeinField.value = timeoutField.value;
};

timeinField.addEventListener('change', onTimeinChange);
timeoutField.addEventListener('change', onTimeoutChange);

const submitButton = adForm.querySelector('.ad-form__submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  adForm.reset();
  sliderElement.noUiSlider.set(0);
  resetPreview();
};

const reset = (ads) => {
  resetForm();
  resetCoordinate();
  resetAddress();
  resetFilters(ads);
};

const resetAdForm = document.querySelector('.ad-form__reset');

const setResetButtonClick = (ads) => {
  resetAdForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    reset(ads);
  });
};

const setUserFormSubmit = (ads) => {
  adForm.addEventListener('submit',(evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          showSuccessPopup();
          unblockSubmitButton();
          reset(ads);
        },
        () => {
          showErrorPopup();
          unblockSubmitButton();
        },

        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit,setResetButtonClick};
