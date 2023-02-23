const descriptions = [
  'Описание 1',
  'Описание 2',
  'Описание 3'
];

// Определяет случайное описание
/**
 * @template Item
 * @param {Item[]} list
 * @return {Item}
 */
const pickItemFromList = (list) => {
  const index = Math.floor(Math.random() * list.length);

  return list[index];
};

// Определяет количество лайков
/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const pickIntegerInRange = (min, max) => {
  const value = min + Math.random() * (max - min);

  return Math.round(value);

};

/**
 * @param {number} id
 * @return {ImageState}
*/

// Функция объекта с возвратом
const createImageState = (id) => {
  const url = `photos/${id}.jpg`;
  const description = pickItemFromList(descriptions);
  const likes = pickIntegerInRange(15, 200);
  const comments = [];

  return {id, url, description, likes, comments};
};

// Генерирует список с длинной 25 (строк)
/**
 * @param {number} length
 * @return {ImageState[]}
*/
const createImageStateList = (length = 25) => {
  const list = new Array(length).fill(1);

  return list.map((start, index) => createImageState(start + index));
};
createImageStateList();

