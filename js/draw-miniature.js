import { openPhoto } from "./big-photo.js";

export const getMiniPhotos = (photos) => {
const pictureTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture");
const picturesContainer = document.querySelector(".pictures");
const randomPosts = photos;
const picturesFragment = document.createDocumentFragment();

randomPosts.forEach(({ url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector("img").src = url;
  picture.querySelector("img").alt = description;
  picture.querySelector(".picture__likes").textContent = likes;
  picture.querySelector(".picture__comments").textContent = comments.length;
  picture.addEventListener("click", (evt) => {
    openPhoto(evt, url, description, likes, comments);
  });
  picturesFragment.append(picture);
});

picturesContainer.append(picturesFragment);
}

export const removeMiniPhotos = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};
