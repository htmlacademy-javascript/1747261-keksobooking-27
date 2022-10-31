import {getSimilarAdNear,createAd} from './data.js';
import {renderAdNear} from './ad-generator.js';
import {disabledForm,abledForm} from './form.js';
import {validPrestine} from './user-form.js';

getSimilarAdNear();

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.append(renderAdNear(createAd()));

disabledForm();
abledForm();
validPrestine();
