import { closeModal } from './utils.js';
import { MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH } from './consts.js';
import {resetEffect, initEffect} from './effects.js';
import {resetScale} from './scale.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay.hidden');
const closeBtn = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitBtn = uploadForm.querySelector('#upload-submit');

const validationForm = /^#[0-9a-zа-яё]{1,19}$/i;

const onDocumentKeyDown = (evt) =>{
  closeModal(evt, closeOverlay);
};
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validateHashtagsCount = (value) => value.trim().split(' ').length <= MAX_HASHTAGS_COUNT;

const validateHashtagsUniq = (value) => {
  const hashtags = value.split(' ');
  const hashTagMap = {};
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag in hashTagMap) {
      return false;
    }
    hashTagMap[hashtag] = true;
  }
  return true;
};

const validHashtages = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; ++i) {
    if (!validationForm.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'Максимальное количество хэштегов: 5'
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUniq,
  'Удалите повторяющиеся хэштеги'
);

pristine.addValidator(
  hashtagsField,
  validHashtages,
  'Ошибка в хештеге'
);

const validateDescription = (value) => value.trim().length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Максимальная длина описания: 140'
);

export function closeOverlay(){
  if(document.querySelector('.error')){
    return;
  }
  imageOverlay.classList.add('hidden');
  resetEffect();
  resetScale();
  uploadForm.reset();
  pristine.reset();
  document.body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeyDown);
  uploadInput.value = null;
  hashtagsField.textContent = '';
  descriptionField.textContent = '';
  submitBtn.removeAttribute('disabled');
}

function openOverlay() {
  initEffect();
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeBtn.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeyDown);
}

uploadInput.addEventListener('change', openOverlay);

hashtagsField.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.removeAttribute('disabled');
  }
});

descriptionField.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.removeAttribute('disabled');
  }
});
