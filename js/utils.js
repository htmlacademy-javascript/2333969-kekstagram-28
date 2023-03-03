/**
 * Выбирает случайный элемент из любого списка [] (универсальный тип)
 * @template Item
 * @param {Item[]} list
 * @return {Item}
 */
export const pickItemFromList = (list) => {
  const index = Math.floor(Math.random() * list.length);

  return list[index];
};

/**
 * Выбирает случайное целое число в диапазоне
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const pickIntegerInRange = (min, max) => {
  const value = min + Math.random() * (max - min);

  return Math.round(value);

};
