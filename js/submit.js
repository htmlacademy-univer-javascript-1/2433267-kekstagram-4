import { isEscKey } from './utils.js';
import { onDocumentKeydown, closeOverlay } from './new-publication.js';

const body = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('section');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('section');

const onBodyClick = (evt) => {
  const target = evt.target;
  if(target.classList.contains('error__inner') || target.classList.contains('success__inner')){
    return;
  }
  closeMessage();
};

const onBodyKeyDown = (evt) => {
  if(isEscKey){
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage () {
  body.removeEventListener('click', onBodyClick);
  body.removeEventListener('keydown', onBodyKeyDown);
  body.removeChild(body.lastChild);
}


const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(1);
  message.style.zIndex = 100;

  body.addEventListener('keydown', onBodyKeyDown);
  body.addEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  body.appendChild(message);
};

const onSuccess = () => {
  closeOverlay();
  showMessage(successMessageTemplate);
};

const onFail = () => {
  showMessage(errorMessageTemplate);
};


export{onSuccess, onFail};
