import { closeOverlay } from './newPublication.js';
import { closeModal } from './utils.js';
import { uploadData } from './api.js';

const body = document.body;

const errorMesage = document.querySelector('#error')
  .content
  .querySelector('.error');
const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const formUpload = document.querySelector('.img-upload__form');

const onMessageKeyDown = (evt) => {
  closeModal(evt, closeMessage);
};

const onMessageClick = (evt) => {
  const clickElem = evt.target;

  if(clickElem.classList.contains('success__inner') || clickElem.classList.contains('error__inner')){
    return;
  }
  closeMessage();
};

const showMessage = (message) => {
  message.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageKeyDown);
  message.style.zIndex = 2;
  body.appendChild(message);
};

function closeMessage () {
  body.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onMessageKeyDown);
  body.removeChild(body.lastChild);
}

const showSuccessMessage = () => showMessage(successMessage.cloneNode(1));

const showErrorMessage = () => showMessage(errorMesage.cloneNode(1));


const onSuccess = () => {
  closeOverlay();
  showSuccessMessage();
};

const onFail = () => {
  showErrorMessage();
};

const onFormUploadSubmnit = (evt) => {
  evt.preventDefault();
  uploadData(onSuccess, onFail, 'POST', new FormData(evt.target));
};

formUpload.addEventListener('submit', onFormUploadSubmnit);
