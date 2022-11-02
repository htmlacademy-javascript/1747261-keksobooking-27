import {disabledForm,abledForm,getAddressLatLng} from './form.js';
import {getSimilarAdNear,createAd} from './data.js';
import {renderAdNear} from './ad-generator.js';

disabledForm();

const CENTER_TOKYO = {
  lat: 35.69034,
  lng: 139.75175,
};


const map = L.map('map-canvas')
  .on('load', () => abledForm())
  .setView(CENTER_TOKYO, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon ({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26,52],
});

const adPinIcon = L.icon ({
  iconUrl: '../img/pin.svg',
  iconSize: [40,40],
  iconAnchor: [20,40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const {lat, lng} = ad;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: adPinIcon,
  }
  );

  marker.addTo(markerGroup).bindPopup(renderAdNear(createAd(ad)));
};

getSimilarAdNear.forEach((ad) => {
  createMarker(ad);
});

// markerGroup.clearLayers();
const mainPinMarker = L.marker(CENTER_TOKYO, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const points = evt.target.getLatLng();
  getAddressLatLng(points);
});

const resetAdForm = document.querySelector('.ad-form__reset');

resetAdForm.addEventListener('click', () => {
  mainPinMarker.setLatLng(CENTER_TOKYO);
});
