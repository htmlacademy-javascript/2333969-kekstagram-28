/* eslint-disable eqeqeq */
/* eslint-disable no-console */

// БОЛЬШЕ ФУНКЦИЙ

// Первое задание:
// Вариант 1 - стравнивает текстовую строку переданную аргументом и число не менее 10 согласно аргументу
console.log('Задание № 1. Вариант 1');
const getStringCheck = function (str, strLength) {
  if (str === 'проверяемая строка' && strLength > 10) {
    return `${true} - строка проходит по длине`;
  } else {

    return `${false} — строка не проходит`;
  }
};
console.log(getStringCheck('проверяемая строка', 20));
console.log(getStringCheck('проверяемая строка', 18));
console.log(getStringCheck('проверяемая строка', 10));


// Вариант 2 - проверяет length строки при условии, что она меньше или равна числу второго аргумента
console.log('\nЗадание № 1. Вариант 2');
const StringCheck = function (str, strLength) {
  if (str.length <= strLength) {
    return `${true} - строка проходит по длине`;
  } else {
    return `${false} — строка не проходит`;
  }
};
console.log(StringCheck('проверяемая строка', 20));
console.log(StringCheck('проверяемая строка', 18));
console.log(StringCheck('проверяемая строка', 10));


// Второе задание:
// Вариант 1
console.log('\nЗадание № 2. Вариант 1');
function isPalindrome(wordPalindrome) {
  let wordCheck = '';
  for (let i = wordPalindrome.length - 1; i >= 0; --i) {
    wordCheck += wordPalindrome[i];
  }
  return wordPalindrome == wordCheck;
}
console.log(isPalindrome('топот')); // Результат: true - строка является палиндромом
console.log(isPalindrome('ДовОд')); // Результат: true - несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('Кекс')); // Результат: false - это не палиндром


// Варинат 2
console.log('\nЗадание № 2. Вариант 2. (Видит регистр символов)');
const isPalindromeWord = function (wordPalindrome) {
  wordPalindrome = wordPalindrome.toLowerCase().replace(/[^а-яa-z1-9]/gi, '');
  const lastIndex = wordPalindrome.length - 1;
  for (let i = 0; i < wordPalindrome.length / 2; i++) {
    if (wordPalindrome[i] !== wordPalindrome[lastIndex - i]) {
      return false;
    }
  }
  return true;
};
console.log(isPalindromeWord('топот')); // Результат: true - строка является палиндромом
console.log(isPalindromeWord('Дов0д')); // Результат: true - несмотря на разный регистр, тоже палиндром
console.log(isPalindromeWord('Кекс')); // Результат: false - это не палиндром


// Третье задание
console.log('\nЗадание № 3.(не убирает точку в 0.5, как и не видит 0.5 вообще!');
function isLeadNumber(stringNumber) {
  const strNum = parseInt(stringNumber.match(/\d+/), 10);
  return strNum;
}
console.log(isLeadNumber('2023 год')); // Результат: число 2023
console.log(isLeadNumber('ECMAScript 2022')); // Результат: число 2022
console.log(isLeadNumber('1 кефир, 0.5 батона')); // Результат: число 105
console.log(isLeadNumber('а я томат')); // Результат: NaN


// Четвёртое задание
console.log('\nЗадание № 4.');

