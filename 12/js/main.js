import {setResetButtonClick, setUserFormSubmit} from './validation.js';
import {renderMarkers} from './map.js';
import {getData} from './api.js';
import {debounce, showAlert} from './util.js';
import {abledFilters} from './form.js';
import {setChangeEventOnFilter,filterAd} from './filter.js';

const SIMILAR_AD_COUNT = 10;

setUserFormSubmit();
setResetButtonClick();
getData((ads) => {
  renderMarkers(ads.slice(0,SIMILAR_AD_COUNT));
  abledFilters();
  setChangeEventOnFilter(debounce(
    () => renderMarkers(ads.filter(filterAd).slice(0,SIMILAR_AD_COUNT))));
},
() => {
  showAlert('Не удалось получить похожие объявления. Попробуй еще раз!');
});
