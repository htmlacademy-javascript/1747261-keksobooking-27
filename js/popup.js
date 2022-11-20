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
  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown',onDocumentKeydown);
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);
  successPopup.addEventListener('click', () => {
    successPopup.remove();
    document.removeEventListener('keydown',onDocumentKeydown);
  });
};

const showErrorPopup = () => {
  document.body.append(errorPopup);
  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
      document.removeEventListener('keydown',onDocumentKeydown);
    }
  };
  document.addEventListener('keydown',onDocumentKeydown);
  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  });
  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown',onDocumentKeydown);
  });
};

export {showSuccessPopup,showErrorPopup};
