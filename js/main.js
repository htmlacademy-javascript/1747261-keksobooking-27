import {setResetButtonClick, setUserFormSubmit} from './validation.js';
import {renderMarkers,CenterTokyo,map} from './map.js';
import {getData} from './api.js';
import {debounce, showAlert} from './util.js';
import {enableFilters,enableForm} from './form.js';
import {setChangeEventOnFilter,SIMILAR_AD_COUNT, getFilteredAds} from './filter.js';


map.on('load',() => {
  enableForm();
  getData((ads) => {
    renderMarkers(ads.slice(0,SIMILAR_AD_COUNT));
    enableFilters();
    setResetButtonClick(ads);
    setUserFormSubmit(ads);
    setChangeEventOnFilter(debounce(
      () => renderMarkers(getFilteredAds(ads))));
  },

  () => {
    showAlert('Не удалось получить похожие объявления. Попробуй еще раз!');
  });
})
  .setView(CenterTokyo, 12);

