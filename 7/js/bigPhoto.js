const comTemplate = document.querySelector('.social__comment');

const downloadElse = document.querySelector('.social__comments-loader');

const comLoader = document.querySelector('.comments-loader');


const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closePhoto(evt);
  }
};

function openPhoto(evt, url, description, likes, comments) {
  const openedPicture = document.querySelector('.big-picture');
  comLoader.classList.remove('hidden');
  openedPicture.classList.remove('hidden');
  openedPicture.querySelector('.big-picture__img img').src = url;
  openedPicture.querySelector('.likes-count').textContent = likes;
  openedPicture.querySelector('.comments-count').textContent = comments.length;
  openedPicture.querySelector('.social__caption').textContent = description;

  const commentsFragment = document.createDocumentFragment();

    for (let i = 0; i < comments.length; i++){
      document.querySelector('.active__comments-count').textContent = comments.length;
      comLoader.classList.add('hidden');
      const comment = comTemplate.cloneNode(true);
      comment.querySelector('.social__picture').src = comments[i].avatar;
      comment.querySelector('.social__picture').alt = comments[i].name;
      comment.querySelector('.social__text').textContent = comments[i].message;
      commentsFragment.append(comment);
    }

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);

  document.body.classList.add('modal-open');

  openedPicture.querySelector('.big-picture__cancel').addEventListener('click', closePhoto);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePhoto(evt) {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  evt.target.removeEventListener('click', closePhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openPhoto};
