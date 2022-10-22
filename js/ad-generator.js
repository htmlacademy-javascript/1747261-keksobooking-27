const similarAdNearTemplate = document.querySelector('#card').content.querySelector('.popup');
const adNear = similarAdNearTemplate.cloneNode(true);
const TYPE_HOUSING_LABEL = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Двоерц',
  hotel: 'Отель',
};

const createDescription = (description) => {
  const descriptionAd = adNear.querySelector('.popup__description');
  if (description && description.length) {
    descriptionAd.textContent = description;
  }
  else {
    descriptionAd.remove();
  }
};

const createPhotos = (photos) => {
  const photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
  const photoTemplateElement = photoTemplate.cloneNode(true);
  if (photos && photos.length) {
    photos.forEach((photo) => {
      photoTemplateElement.src = photo;
      adNear.querySelector('.popup__photos').append(photoTemplateElement);
    });
  }
  else {
    photoTemplateElement.remove();
  }
};

const createFeatures = (features) => {
  const featuresContainer = adNear.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--'${feature}`);

  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1];
    if(!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
};

const renderAdNear = ({author,offer}) => {
  adNear.querySelector('.popup__avatar').src = author.avatar;
  adNear.querySelector('.popup__title').textContent = offer.title;
  adNear.querySelector('.popup__text--address').textContent = offer.address;
  adNear.querySelector('[data-price]').textContent = offer.price;
  adNear.querySelector('.popup__type').textContent = TYPE_HOUSING_LABEL[offer.type];
  adNear.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adNear.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  createFeatures(offer.features);
  createDescription(offer.description);
  createPhotos(offer.photos);

  return adNear;
};

export {renderAdNear};
