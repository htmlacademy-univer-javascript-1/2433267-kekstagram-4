import { onDocumentKeydown } from './utils.js';

const comTemplate = document.querySelector('.social__comment');

const comLoader = document.querySelector('.comments-loader');

const showMore = () => {
  let currentComment = document.querySelector('.social__comment.hidden');
  let i = 0;

  for (; i < 5; i++) {
    if (currentComment === null) {
      comLoader.classList.add('hidden');
      break;
    }
    currentComment.classList.remove('hidden');
    currentComment = currentComment.nextElementSibling;
    if (currentComment === null) {
      comLoader.classList.add('hidden');
      document.querySelector('.active__comments-count').textContent =
        +document.querySelector('.active__comments-count').textContent + 1;
      break;
    }
  }
  document.querySelector('.active__comments-count').textContent =
    +document.querySelector('.active__comments-count').textContent + i;
};

const loadAllCom = (commentsContainer, comments) => {
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; ++i) {
    const comment = comTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__picture').alt = comments[i].name;
    comment.querySelector('.social__text').textContent = comments[i].message;
    comment.classList.add('hidden');
    commentsFragment.append(comment);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
};

function openPhoto(evt, url, description, likes, comments) {
  const openedPicture = document.querySelector('.big-picture');
  comLoader.classList.remove('hidden');
  openedPicture.classList.remove('hidden');
  openedPicture.querySelector('.big-picture__img img').src = url;
  openedPicture.querySelector('.likes-count').textContent = likes;
  openedPicture.querySelector('.comments-count').textContent = comments.length;
  openedPicture.querySelector('.social__caption').textContent = description;
  openedPicture.querySelector('.active__comments-count').textContent = '0';

  const comContainer = document.querySelector('.social__comments');
  loadAllCom(comContainer, comments);
  showMore();

  document.body.classList.add('modal-open');

  openedPicture.querySelector('.big-picture__cancel').addEventListener('click', closePhoto);
  document.addEventListener('keydown', onDocumentKeydown(closePhoto));
  openedPicture.querySelector('.social__comments-loader').addEventListener('click', showMore);
}

function closePhoto(evt) {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  evt.target.removeEventListener('click', closePhoto);
  document.removeEventListener('keydown', onDocumentKeydown(closePhoto));
  document
    .querySelector('.social__comments-loader')
    .removeEventListener('click', showMore);
  comLoader.classList.remove('hidden');
}

export {openPhoto};
