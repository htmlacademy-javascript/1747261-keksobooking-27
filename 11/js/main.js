import {setResetButtonClick, setUserFormSubmit} from './validation.js';
import {renderMarkers} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

setUserFormSubmit();
setResetButtonClick();
getData((ads) => {
  renderMarkers(ads);
}, () => {
  showAlert('Не удалось получить похожие объявления. Попробуй еще раз!');
});
