/* eslint-disable eqeqeq */
/* eslint-disable no-console */

// ДЗ: БОЛЬШЕ ФУНКЦИЙ

// Первое задание:

console.log('Задание № 1. Вариант 1. Проверяет вписывается ли строка в указанную длину');
/**
 * Проверяет вписывается ли строка в указанную длину
 * @param {string} target
 * @param {number} maxLength
 * @return {boolean}
 */
const fitsLength = (target, maxLength) => target.length <= maxLength;

console.log(fitsLength('проверяемая строка', 20));
console.log(fitsLength('проверяемая строка', 18));
console.log(fitsLength('проверяемая строка', 10));


// Вариант 2 - проверяет length строки при условии, что она меньше или равна числу второго аргумента
console.log('\nЗадание № 1. Вариант 2. Проверяет вписывается ли строка в указанную длину');
const StringCheck = (str, strLength) => {
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
console.log('\nЗадание № 2. Проверяет является ли строка (или число) палиндромом');
/**
 * Проверяет является ли строка (или число) палиндромом
 * @param {string|number} target
 * @return {boolean}
 */
const isPalindrome = (target) => {
	const normalized = String(target).replaceAll(' ', '').toLowerCase();
	const reversed = normalized.split('').reverse().join('');

	return normalized === reversed;
};
console.log(isPalindrome('топот')); // Результат: true - строка является палиндромом
console.log(isPalindrome('ДовОд')); // Результат: true - несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('Кекс')); // Результат: false - это не палиндром

// Третье задание
console.log('\nЗадание № 3. Извлечёт из строки (или числа) цифры от 0 до 9');
/**
 * Извлечёт из строки (или числа) цифры от 0 до 9
 * @param {string|number} target
 * @return {number}
 */
const parseDigits = (target) => {
	const digits = String(target).replace(/[^0-9]/g, '');

	return digits ? Number(digits) : NaN;
};
console.log(parseDigits('2023 год')); // Результат: число 2023
console.log(parseDigits('ECMAScript 2022')); // Результат: число 2022
console.log(parseDigits('1 кефир, 0.5 батона')); // Результат: число 105
console.log(parseDigits('а я томат')); // Результат: NaN


// Четвёртое задание
console.log('\nЗадание № 4. Добавит в начало строки символы другой строки. В результате исходная строка достигнет заданной длинны.');
/**
 * Добавит в начало строки символы другой строки
 * В результате исходная строка достигнет заданной длинны
 * @param {string} target
 * @param {number} length
 * @param {string} pad
 * @return {string}
 */
const padStart = (target, length, pad) => {
	const start = pad.repeat(length);

	return `${start}${target}`.slice(-length);
};

// Добавочный символ использован один раз
console.log(padStart('1', 2, '0')); // Результат: строка '01'

// Добавочный символ использован три раза
console.log(padStart('1', 4, '0')); // Результат: строка '0001'
