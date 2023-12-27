import { openPhoto } from './bigPhoto.js';

export const getMiniPhotos = (photos) => {
  const pictureTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('img').src = photo.url;
    picture.querySelector('img').alt = photo.description;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;
    picture.addEventListener('click', () => {
      openPhoto(photo);
    });
    picturesFragment.append(picture);
  });

  picturesContainer.append(picturesFragment);
};
