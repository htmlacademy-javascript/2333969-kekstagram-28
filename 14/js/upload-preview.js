
// объект со значениями масштаба: минимальное, максимальное и шаг (его устанавливаем в SetScale как передаваемые данные)
const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

// перечисление эффектов
const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

// диапозон эффектов [min, max, step]
const effectRangeMap = {
  [Effect.NONE]: [0, 100, 1],
  [Effect.CHROME]: [0, 1, .1],
  [Effect.SEPIA]: [0, 1, .1],
  [Effect.MARVIN]: [0, 100, 1],
  [Effect.PHOBOS]: [0, 3, .1],
  [Effect.HEAT]: [1, 3, .1]
};

// объект для форматирвоание
const effectFormattedMap = {
  [Effect.NONE]: () => '',
  [Effect.CHROME]: (value) => `grayscale(${value})`,
  [Effect.SEPIA]: (value) => `sepia(${value})`,
  [Effect.MARVIN]: (value) => `invert(${value}%)`,
  [Effect.PHOBOS]: (value) => `blur(${value}px)`,
  [Effect.HEAT]: (value) => `brightness(${value})`
};


/**
 *
 * @param {string} name
 */
const createSliderOptions = (name) => {
  const [min, max, step] = effectRangeMap[name];
  // настройка для форматирования
  const format = {
    to: effectFormattedMap[name],
    from: Number
  };
  // возвращаем в функцию объект с параметрами
  return {
    range: {min, max},
    step,
    start: max,
    format,
    behaviour: 'snap',
    connect: 'lower'
  };
};


/**
 * @type {HTMLImageElement}
 */
// передача контейнера .img-upload__preview и самого изображения в теге img
// т.е. изображение которому нужно изменить масштаб
const picture = document.querySelector('.img-upload__preview img');

/**
 * @type {HTMLFieldSetElement}
 */
// элемент управления масштабом, обновляющий значение при установки какого-нибудь масштаба
const scaleControl = document.querySelector('.img-upload__scale');

/**
 * @type {HTMLFieldSetElement}
 */
// элемент визуальных эффектов миниатюр
const effectPicker = document.querySelector('.img-upload__effects');

/**
 * @type {HTMLInputElement}
 */
// запись значения в переменную
const effectLevel = document.querySelector('.effect-level__value');

// переменная создания экземпляра слайдера, в котором используем метод create с двумя аргументами: 1-й: контейнер слайдера и 2-й: метод настроек создаваемый функцией createSliderOptions()
// @ts-ignore
const effectSlider = noUiSlider.create(
  document.querySelector('.effect-level__slider'),
  createSliderOptions(Effect.NONE)
);

// передача/установка % масштаба изображения
/**
 *
 * @param {number} percent
 */
const setScale = (percent) => {

  // передаём процент масштаба изображения
  picture.style.setProperty('transform', `scale(${percent / 100})`);

  // устанавливаем в поле ввода с % масштаба передаваемый процент, чтобы отображалось значение процента масштаба
  scaleControl.querySelector('input').setAttribute('value', `${percent}%`);
};


// описание эффектов фотографии
/**
 *
 * @param {string} name
 */
const setEffect = (name) => {
  picture.setAttribute('class', `effects__preview--${name}`);
  // обращаемся к слайдеру, вызываем н  нём метод updateOptions и создавать новый объект настроек в зависимости от выбранного эффекта
  effectSlider.updateOptions(createSliderOptions(name));
  // скрытие слайдера при выборе без эффекта - Оригинал
  effectLevel.parentElement.classList.toggle('hidden', name === Effect.NONE);
};


// описание обработчика onScaleControlClick - кнопки масштаба
/**
 *
 * @param {MouseEvent} event
 */
const onScaleControlClick = (event) => {

  // находим все элементы масштаба: кнопки и поле ввода с классами input и button
  const [less, input, more] = scaleControl.querySelectorAll('input, button');

  // для поля ввода масштаба
  const value = Number.parseFloat(input.getAttribute('value'));

  // описание шагов масштаба
  switch (event.target) {
    case less:
      // когда при значение 25% мы уменьшим масштаб на 25%, будет ноль и функция Math.man сравнит полученные значения 0 и минимальное 25% и выберит минимальное 25%
      // т.е. не даёт опуститься в масштабе ниже 25%
      setScale(Math.max(value - Scale.STEP, Scale.MIN));
      break;
    case more:
      // когда при значение 100% мы увеличим масштаб на 25%, будет 125 и функция Math.min сравнит полученные значения 125 и максимальное 100% и выберит минимальное 100%
      // т.е. не даёт подняться в масштабе выше 100%
      setScale(Math.min(value + Scale.STEP, Scale.MAX));
      break;
  }
};

/**
 *
 * @param {Event & {target: Element}} event
 */
const onEffectPickerChange = (event) => {
  // получаем название эффекта по value
  const name = event.target.getAttribute('value');

  // функция устанавливающая эффект по клику на миниатюру
  setEffect(name);
};


const effectSliderUpdate = () => {
  picture.style.setProperty('filter', effectSlider.get());
  // передаём числовое значение параметра фильтра
  effectLevel.setAttribute('value', effectSlider.get(true));
};

/**
 *
 * @param {File} data
 */

// функция обновления, с передачей в неё данных в виде файла выбранного пользователем
const updatePreview = (data) => {
  // TODO: Подстановка изображения
  void data;
  setScale(Scale.MAX);

  // установка эффектов из списка Effect
  setEffect(Effect.NONE);

  // обработчик события при клике по кнопкам масштаба
  scaleControl.addEventListener('click', onScaleControlClick);
  effectPicker.addEventListener('change', onEffectPickerChange);
  effectSlider.on('update', effectSliderUpdate);
};

export default updatePreview;
