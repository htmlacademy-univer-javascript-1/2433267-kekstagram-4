import {getRandomNumberFromInterval, shuffle} from './utils.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей',
  'Екатерина','Арина', 'Полина', 'Ольга', 'Юлия', 'Татьяна'];

const DESCRIPTIONS = ['Восторг!', 'Шедевр', 'Поставлю в рамочку', 'Необычный объект', 'Практически НЛО',
  'Что это вообще??', 'Нет слов', 'Описание съел Кекс', 'Возможно, это скульптура', 'Просто фото'];

const CommentsCount = {
  MIN: 0,
  MAX: 30,
};

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const MessagesCount = {
  MIN: 1,
  MAX: 2,
};

const AvatarId = {
  MIN: 1,
  MAX: 6,
};

const getComment = (_, id) => ({
  id,
  avatar: `img/avatar-${getRandomNumberFromInterval(
    AvatarId.MIN,
    AvatarId.MAX
  )}.svg`,
  message: shuffle(MESSAGES).slice(0, getRandomNumberFromInterval(MessagesCount.MIN,
    MessagesCount.MAX)),
  name: NAMES[getRandomNumberFromInterval(0, NAMES.length - 1)],
});

const getPhotoData = (_, id) => ({
  id,
  url: `photos/${id}.jpg`,
  likes: `img/avatar-${getRandomNumberFromInterval(
    LikesCount.MIN,
    LikesCount.MAX
  )}.svg`,
  message: shuffle(MESSAGES).slice(0, getRandomNumberFromInterval(MessagesCount.MIN,
    MessagesCount.MAX)),
  description: DESCRIPTIONS[getRandomNumberFromInterval(0, DESCRIPTIONS.length - 1)],
  comments: Array.from({length: getRandomNumberFromInterval(
    CommentsCount.MIN,
    CommentsCount.MAX
  )}, {getComment}),
});

import {COUNT_PHOTOS} from './consts.js';
export const getPhotos = (countPhotos) => Array.from({length: countPhotos}, getPhotoData);

getPhotos(COUNT_PHOTOS);
