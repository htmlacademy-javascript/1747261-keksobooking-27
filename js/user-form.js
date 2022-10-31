const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(
  adForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element'
  },
  true
);

const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const roomsOption = {
  '1': ['1'],
  '2': ['2','1'],
  '3': ['3','2','1'],
  '100': ['0']
};

const validateCapacity = () => {
  roomsOption[roomsField.value].includes(capacityField.value);
};

const getCapacityErrorMessage = () => {
  if (capacityField.value === '0') {
    return '100 комнат не для гостей';
  } else if (roomsField.value === '1') {
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

const validPrestine = () => {
  adForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {validPrestine};
