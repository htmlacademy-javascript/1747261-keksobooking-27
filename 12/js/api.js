const DATA_ADDRESS = 'https://23.javascript.pages.academy/keksobooking/data';
const SERVER_ADDRESS = 'https://23.javascript.pages.academy/keksobooking';


const getData = (onSuccess,onFail) => {
  fetch(DATA_ADDRESS)
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_ADDRESS, {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
