const similarAdNearTemplate = document.querySelector('#card').content.querySelector('.popup');
const adNear = similarAdNearTemplate.cloneNode(true);
const TYPE_HOUSING_LABEL = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Двоерц',
  hotel: 'Отель',
};

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

const renderFeatures = (features) => {
  const featuresContainer = adNear.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  if (features) {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    featuresList.forEach((featuresListItem) => {
      const modifier = featuresListItem.classList[1];
      if(!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });
  }
  else {
    featuresContainer.remove();
  }
};

const renderDescription = (description) => {
  const descriptionAd = adNear.querySelector('.popup__description');
  if (description) {
    descriptionAd.textContent = description;
  }
  else {
    descriptionAd.remove();
  }
};

const renderPhotos = (photos) => {
  const photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
  const photoTemplateElement = photoTemplate.cloneNode(true);
  if (photos) {
    photos.forEach((photo) => {
      photoTemplateElement.src = photo;
      adNear.querySelector('.popup__photos').append(photoTemplateElement);
    });
  }
  else {
    adNear.querySelector('.popup__photos').remove();
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
