const DESCRIPTIONS = [
  'Романтический закат',
  'Отражение цветов',
  'Красота природы',
  'Горы и море',
  'Момент наслаждения',
  'Солнечные лучи',
  'Волшебный пейзаж',
  'Берег и облака',
  'Одинокий человек',
  'Встреча с природой'
  ];

  const NAMES = [
  'Анна',
  'Дмитрий',
  'Елена',
  'Иван',
  'Катерина',
  'Максим',
  ];

  const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const COUNT_PHOTO = 25;
  const COMMENTS_MAX = 30;

  const Likes = {
  MIN:15,
  MAX:200
  };

  const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
  };

  const addComments = () => ({
  id: getRandomInteger(0, COUNT_PHOTO),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length -1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  });

  const addPhoto = () =>({
  id: getRandomInteger(1, COUNT_PHOTO),
  url: `photos/${getRandomInteger(1, COUNT_PHOTO)}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from(getRandomInteger(0 , COMMENTS_MAX), addComments)
  });

  const getPhoto = () => {
  const photo = Array.from({length: COUNT_PHOTO}, addPhoto);
  return photo;
  };

  getPhoto();
