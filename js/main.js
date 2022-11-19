import {setResetButtonClick, setUserFormSubmit} from './validation.js';
import {renderMarkers} from './map.js';
import {getData} from './api.js';
import {debounce, showAlert} from './util.js';
import {abledFilters} from './form.js';
import {setChangeEventOnFilter,SIMILAR_AD_COUNT, getFilteredAds} from './filter.js';

setUserFormSubmit();
setResetButtonClick();
getData((ads) => {
  renderMarkers(ads.slice(0,SIMILAR_AD_COUNT));
  abledFilters();
  setChangeEventOnFilter(debounce(
    () => renderMarkers(getFilteredAds(ads))));
},
() => {
  showAlert('Не удалось получить похожие объявления. Попробуй еще раз!');
});
