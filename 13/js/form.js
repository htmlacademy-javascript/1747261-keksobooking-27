const ADDRESS_ROUNDING = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
};

const disabledFilters = () => {
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
};

const abledFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  for (const element of mapFilters.children) {
    element.disabled = false;
  }
};

const fileChooserAvatar = adForm.querySelector('.ad-form-header__input');
const previewAvatar = adForm.querySelector('.ad-form-header__preview img');
const fileChooserPhotoOfHousing = adForm.querySelector('.ad-form__input');
const containerPhotoOfHousing = adForm.querySelector('.ad-form__photo');

const checkFileType = (fileName) =>
  FILE_TYPES.some((it) => fileName.toLowerCase().endsWith(it));

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];

  if (checkFileType(file.name)) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

fileChooserPhotoOfHousing.addEventListener('change', () => {
  const file = fileChooserPhotoOfHousing.files[0];

  if (checkFileType(file.name)) {
    const img = document.createElement('img');
    containerPhotoOfHousing.innerHTML = '';

    img.src = URL.createObjectURL(file);
    img.classList.add('ad-form__photo');
    containerPhotoOfHousing.appendChild(img);
  }
});

export {disabledForm,abledForm,disabledFilters,abledFilters,getAddressLatLng};
