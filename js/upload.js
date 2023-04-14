import updatePreview from './upload-preview.js';
import openPopup from './popup.js';
import openStatusPopup from './status-popup.js';
import {request} from './utils.js';


// находим класс с формой: form class=".img-upload__form"
/**
 * @type {HTMLFormElement}
 */
const form = document.querySelector('.img-upload__form');

// находим popup внутри формы
/**
 * @type {HTMLElement}
 */
const popup = form.querySelector('.img-upload__overlay');

// инициализируем библиотеку pristine
// @ts-ignore
const pristine = new Pristine(form, {
  classTo: 'img-upload__wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});


/**
 *
 * @param {string} message
 * @param {(tags: string[]) => boolean} validate
 */
const addHashtagsValitator = (message, validate) => {
  pristine.addValidator(form.hashtags, (value) => {
    const tags = value.toLowerCase().split(' ').filter(Boolean);

    return validate(tags);
  }, message, 1, true);
};

/**
 *
 * @param {string} message
 * @param {(description: string) => boolean} validate
 */
const addDescriptionValidator = (message, validate) => {

  pristine.addValidator(form.description, validate, message);
};


const sendFormData = async () => {
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');
  const body = new FormData(form);

  form.submitButton.setAttribute('disabled', '');

  try {
    await request(url, {method, body});

    form.resetButton.click();

    openStatusPopup('success');

  } catch (exception) {
    openStatusPopup('error');
  }

  form.submitButton.removeAttribute('disabled', '');
};

/**
 *
 * @param {Event & {target: HTMLInputElement}} event
*/
const onFormChange = (event) => {
  if (event.target === form.filename) {


    // константа с данными - event.target со свойством files
    const data = event.target.files.item(0);

    // вызов функции из upload-preview.js
    updatePreview(data);

    openPopup(popup);
  }

};


/**
 *
 * @param {SubmitEvent} event
*/
const onFormSubmit = (event) => {
  event.preventDefault();

  if (pristine.validate()) {
    sendFormData();
  }

};

// обработчик на очистку формы от подсказок
const onFormReset = () => {
  pristine.reset();

};


addHashtagsValitator('Хэш-теги должны начинаться с символа # (решётка)', (tags) => tags.every((tag) => tag.startsWith('#')));

// условие в регулярном выражении: /^#[a-zа-яё0-9]+$/
// /  / - обозначает регулярное выражение
// ^ → начало строки
// # → начинается с решётки
// [ ] → в квадратных скобках указываем что должно быть в строке, всё слитно пишем
// a-z → все буквы латинского алфавита
// а-я → все буквы русского алфавита
// ё → буква ё тоже включена в состав
// 0-9 → все цифры от 0 до 9
// $ → конец строки
// если после последнего слеша / поставить i то это означает, что не важно какой регистр: /^#[a-zа-яё0-9]+$/i
addHashtagsValitator('После решётки # буквы/цифры', (tags) => tags.every((tag) => /^#[a-zа-яё0-9]+$/.test(tag)));


addHashtagsValitator('Максимальная длинна одного хэш-тега 20 символов', (tags) => tags.every((tag) => tag.length <= 20));

addHashtagsValitator('Не более 5 хэш-тегов', (tags) => tags.length <= 5);

addHashtagsValitator('Хэш-теги не должны повторяться', (tags) => tags.length === new Set(tags).size);


addDescriptionValidator(
  'Длина описания не должна превышать 140 символов',
  (description) => description.length <= 140
);

form.addEventListener('change', onFormChange);
form.addEventListener('submit', onFormSubmit);
form.addEventListener('reset', onFormReset);

