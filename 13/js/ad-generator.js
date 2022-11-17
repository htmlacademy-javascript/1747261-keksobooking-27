const TYPE_HOUSING_LABEL = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Двоерц',
  hotel: 'Отель',
};

const similarAdNearTemplate = document.querySelector('#card').content.querySelector('.popup');
const adNear = similarAdNearTemplate.cloneNode(true);

const renderAvatar = (avatar) => {
  if (avatar) {
    adNear.querySelector('.popup__avatar').src = avatar;
  }
  else {
    adNear.querySelector('.popup__avatar').remove();
  }
};

const renderTitle = (title) => {
  if (title) {
    adNear.querySelector('.popup__title').textContent = title;
  }
  else {
    adNear.querySelector('.popup__title').remove();
  }
};

const renderAddress = (address) => {
  if(address) {
    adNear.querySelector('.popup__text--address').textContent = address;
  }
  else {
    adNear.querySelector('.popup__text--address').remove();
  }
};

const renderPrice = (price) => {
  if (price) {
    adNear.querySelector('[data-price]').textContent = price;
  }
  else {
    adNear.querySelector('.popup__text--price').remove();
  }
};

const renderType = (type) => {
  if (type) {
    adNear.querySelector('.popup__type').textContent = TYPE_HOUSING_LABEL[type];
  }
  else {
    adNear.querySelector('.popup__type').remove();
  }
};

const renderCapacity = (rooms,guests) => {
  if (rooms || guests) {
    if(rooms && guests) {
      adNear.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
    }
    else if (rooms) {
      adNear.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты `;
    }
    else {
      adNear.querySelector('.popup__text--capacity').textContent = `для ${guests} гостей`;
    }
  }
  else {
    adNear.querySelector('.popup__text--capacity').remove();
  }
};

const renderTextTime = (checkin,checkout) => {
  if (checkin || checkout) {
    if (checkin && checkout) {
      adNear.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    }
    else if (checkin) {
      adNear.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}`;
    }
    else {
      adNear.querySelector('.popup__text--time').textContent = `выезд до ${checkout}`;
    }
  }
  else {
    adNear.querySelector('.popup__text--time').remove();
  }
};
const hide = (elem) => elem.classList.add('hidden');
const renderFeatures = (features) => {
  const popupElements = adNear.querySelectorAll('.popup__feature');

  popupElements.forEach((element) => hide(element));

  if (!features) {
    return;
  }

  features.forEach((feature) => {
    popupElements.forEach((element) => {
      if (element.classList.contains(`popup__feature--${feature}`)) {
        element.classList.remove('hidden');
      }
    });
  });
};

const renderDescription = (description) => {
  const descriptionAd = adNear.querySelector('.popup__description');
  if (description) {
    descriptionAd.classList.remove('visually-hidden');
    descriptionAd.textContent = description;
  }
  else {
    descriptionAd.classList.add('visually-hidden');
  }
};

const renderPhotos = (photos) => {
  const photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
  const photoTemplateElement = photoTemplate.cloneNode(true);
  if (photos) {
    photos.forEach((photo) => {
      adNear.querySelector('.popup__photos').classList.remove('hidden');
      photoTemplateElement.src = photo;
      adNear.querySelector('.popup__photos').append(photoTemplateElement);
    });
  }
  else {
    adNear.querySelector('.popup__photos').classList.add('hidden');
  }
};

const renderAdNear = ({author,offer}) => {
  renderAvatar(author.avatar);
  renderTitle(offer.title);
  renderAddress(offer.address);
  renderPrice(offer.price);
  renderType(offer.type);
  renderCapacity(offer.guests,offer.rooms);
  renderTextTime(offer.checkin,offer.checkout);

  renderFeatures(offer.features);

  renderDescription(offer.description);
  renderPhotos(offer.photos);

  return adNear;
};

export {renderAdNear};
