import { getMiniPhotos } from "./draw-miniature.js";
import { loadData } from './api.js'

export let cards = [];
const onSuccess = (data) => {
  cards = data.slice();
  getMiniPhotos(cards);
};

document.querySelector('.img-filters').classList.remove('img-filters--inactive');

const onFail = () => {
  const errorMesage = document.createElement('div');
  errorMesage.style.position = 'absolute';
  errorMesage.style.left = 0;
  errorMesage.style.top = '50%';
  errorMesage.style.right = 0;

  errorMesage.style.fontSize = '16px';
  errorMesage.style.backgroundColor = 'red';
  errorMesage.style.padding = '20px';

  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Ошибка при загрузке изображений с сервера.';
  document.body.append(errorMesage);
};

loadData(onSuccess, onFail);
