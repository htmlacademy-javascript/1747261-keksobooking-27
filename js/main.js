import {getSimilarAdNear,createAd} from './data.js';
import {renderAdNear} from './ad-generator.js';

getSimilarAdNear();

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.append(renderAdNear(createAd()));
