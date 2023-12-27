import { getMiniPhotos } from './drawMiniatures.js';
import { loadData } from './api.js';
import './messages.js';
let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  getMiniPhotos(photos);
};

const onFail = () => {
  const errorMesage = document.createElement('div');
  errorMesage.style.position = 'absolute';
  errorMesage.style.left = 0;
  errorMesage.style.top = 0;
  errorMesage.style.right = 0;

  errorMesage.style.fontSize = '20px';
  errorMesage.style.backgroundColor = 'red';
  errorMesage.style.padding = '15px';

  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Ошибка загрузки изображений';
  document.body.append(errorMesage);
};
loadData(onSuccess, onFail);
