import { MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH, FILE_TYPES } from './consts.js';
import {resetEffect, initEffect} from './effects.js';
import {resetScale} from './scale.js';
import { isEscKey } from './utils.js';
import { onSuccess, onFail } from './submit.js';
import { uploadData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay.hidden');
const closeBtn = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitBtn = uploadForm.querySelector('#upload-submit');
const userImage = uploadForm.querySelector('.img-upload__preview img');
const effects = uploadForm.querySelectorAll('.effects__preview');

const validationForm = /^#[0-9a-zа-яё]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

export const onDocumentKeydown = (evt) =>{
  if(isEscKey(evt) &&
  !document.body.querySelector('.error') &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description')){
    evt.preventDefault();
    closeOverlay();
  }
};

const validateHashtagsCount = (value) => value.trim().split(/\s+/).length <= MAX_HASHTAGS_COUNT;

const validHashtags = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  for (let i = 0; i < hashtags.length; ++i) {
    if (!validationForm.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagsUniqueness = (value) => {
  const hashtags = value.trim().split(/\s+/);
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

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'Максимальное кол-во хэштегов: 5'
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUniqueness,
  'Не должно быть повторяющихся хэштегов'
);

pristine.addValidator(
  hashtagsField,
  validHashtags,
  'Ошибка хештега'
);

const validateDescription = (value) => value.trim().length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Описание не может быть больше 140 символов'
);

export function closeOverlay(){
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = null;
  pristine.reset();
  resetEffect();
  resetScale();
  uploadForm.reset();
  hashtagsField.textContent = '';
  descriptionField.textContent = '';
  submitBtn.removeAttribute('disabled');
}

function openOverlay() {
  initEffect();
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeBtn.addEventListener('click', closeOverlay);

  document.addEventListener('keydown', onDocumentKeydown);

  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  if(FILE_TYPES.some((it) => fileName.endsWith(it))){
    userImage.src = URL.createObjectURL(file);

    effects.forEach((effect) => {
      effect.style.backgroundImage = `url('${userImage.src}')`;
    });
  }
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

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  uploadData(onSuccess, onFail, 'POST', formData);
});
