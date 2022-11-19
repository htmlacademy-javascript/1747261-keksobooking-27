import {isEscEvent} from './util.js';

const successPopup = document.querySelector('#success')
  .content.querySelector('.success')
  .cloneNode(true);
const errorPopup = document.querySelector('#error')
  .content.querySelector('.error')
  .cloneNode(true);
const closeErrorButton = errorPopup.querySelector('.error__button');

const showSuccessPopup = () => {
  document.body.append(successPopup);
  const keydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown',keydownHandler);
    }
  };
  document.addEventListener('keydown', keydownHandler);
  successPopup.addEventListener('click', () => {
    successPopup.remove();
    document.removeEventListener('keydown',keydownHandler);
  });
};

const showErrorPopup = () => {
  document.body.append(errorPopup);
  const keydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
      document.removeEventListener('keydown',keydownHandler);
    }
  };
  document.addEventListener('keydown',keydownHandler);
  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', keydownHandler);
  });
  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown',keydownHandler);
  });
};

export {showSuccessPopup,showErrorPopup};