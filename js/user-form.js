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
const roomsOption = {
  '1': ['1'],
  '2': ['2','1'],
  '3': ['3','2','1'],
  '100': ['0']
};

const CAPACITY_NOT_FOR_GUESTS = '0';
const ROOM_FOR_ONE_GUEST = '1';

const validateCapacity = () =>
  roomsOption[roomsField.value].includes(capacityField.value);

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

const typeOption = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

const priceField = adForm.querySelector('[name="price"]');
const typeField = adForm.querySelector('[name="type"]');

const validatePrice = () =>
  +typeOption[typeField.value] < +priceField.value;

const getPriceErrorMessage = () =>
  `Минимальная цена ${typeOption[typeField.value]}`;

const onTypeChange = () => {
  priceField.placeholder = typeOption[typeField.value];
  priceField.min = typeOption[typeField.value];
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

const validPrestine = () => {
  adForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {validPrestine};
