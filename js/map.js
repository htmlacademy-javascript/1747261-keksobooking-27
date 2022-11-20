import {disableForm,getAddressLatLng,disableFilters} from './form.js';
import {renderAdNear} from './ad-generator.js';

const CenterTokyo = {
  lat: 35.69034,
  lng: 139.75175,
};

disableForm();
disableFilters();
const addressField = document.querySelector('#address');
addressField.value = `${CenterTokyo.lat},${CenterTokyo.lng}`;

const map = L.map('map-canvas');
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

const markerGroup = L.layerGroup().addTo(map);

const createMarkersAdsNear = (ads) => {
  const adPinIcon = L.icon ({
    iconUrl: '../img/pin.svg',
    iconSize: [40,40],
    iconAnchor: [20,40],
  });

  const marker = L.marker(
    ads.location, {
      icon: adPinIcon,
    }
  );

  marker.addTo(markerGroup).bindPopup(() => renderAdNear(ads));
};

const renderMarkers = (ads) => ads.forEach(createMarkersAdsNear);

const clearMap = () => markerGroup.clearLayers();

const mainPinMarker = L.marker(CenterTokyo, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const points = evt.target.getLatLng();
  getAddressLatLng(points);
});

const resetCoordinate = () => {
  mainPinMarker.setLatLng(CenterTokyo);
  map.setView(CenterTokyo);
};

const resetAddress = () => {
  addressField.value = `${CenterTokyo.lat},${CenterTokyo.lng}`;
};

export {CenterTokyo,map,renderMarkers,resetCoordinate,resetAddress,clearMap};
