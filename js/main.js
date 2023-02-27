// Массив описания
const descriptions = [
  'Описание 1',
  'Описание 2',
  'Описание 3'
];

// Массив сообщений
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

// Массив имён
const names = [
  'Александр',
  'Иван',
  'Кристина',
  'Татьяна'
];

// Определяет случайное описание, сообщение, имя - тип строка
/**
 * @template Item
 * @param {Item[]} list
 * @return {Item}
 */
const pickItemFromList = (list) => {
  const index = Math.floor(Math.random() * list.length);

  return list[index];
};


// Определяет количество лайков, номер фото аватара - тип число
/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const pickIntegerInRange = (min, max) => {
  const value = min + Math.random() * (max - min);

  return Math.round(value);

};

// КОММЕНТАРИИ
/**
 * создаст объект комментария
 * @param {number} id
 * @return {CommentState}
 */
const createCommentState = (id) => {
  const avatar = `img/avatar-${pickIntegerInRange(1, 6)}.svg`;
  const message = pickItemFromList(messages);
  const name = pickItemFromList(names);

  return {id, avatar, message, name};
};

/**
 * создаст список комментариев
 * @param {number} length
 * @return {CommentState[]}
 */
const createCommentStateList = (length) => {
  const list = new Array(length).fill(1);

  return list.map((start, index) => createCommentState(start + index));
};

/**
 * создаст объект фотографии
 * @param {number} id
 * @return {ImageState}
*/
const createImageState = (id) => {
  const url = `photos/${id}.jpg`;
  const description = pickItemFromList(descriptions);
  const likes = pickIntegerInRange(15, 200);
  const comments = createCommentStateList(pickIntegerInRange(0, 20));

  return {id, url, description, likes, comments};
};

/**
 * создаст список объектов описывающие фотографии
 * @param {number} length
 * @return {ImageState[]}
*/
const createImageStateList = (length = 25) => {
  const list = new Array(length).fill(1);

  return list.map((start, index) => createImageState(start + index));
};

createImageStateList();
