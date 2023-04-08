// событие для закрытия popup нажатием на клавишу Esc
/**
 *
 * @param {KeyboardEvent} event
 */
const onDocumentKeyDown = (event) => {
  // условие: если event.key начинается с Esc
  if (event.key.startsWith('Esc')) {
    /**
     * @type {HTMLButtonElement}    //тип для метода click к переменной cancelButton на 20й строке
     */
    // кол закрывающий модальное окно
    // находим в переменную cancelButton класс .overlay , который не должен быть скрыт классом hidden и  внутри которого должен быть класс cancel
    const cancelButton = document.querySelector('.overlay:not(.hidden) .cancel');

    // в переменную cancelButton передаём метод dispatchEvent() - т.е. передать событие? а скобках описываем само событие
    // cancelButton.dispatchEvent(new MouseEvent('click'));

    // альтернативный метод click() вместо dispatchEvent()
    cancelButton.click();
  }
};

// событие для кнопки закрыть с классом cancel
/**
 *
 * @param {MouseEvent & {target: Element}} event
 */
const onCancelButtonClick = (event) => {
  // находим класс overlay, поиск которого идёт вверх по разметки при помощи closest , а не вниз как при помощи querySelector
  const popup = event.target.closest('.overlay');

  // добавляем класс hidden чтобы скрыть popup
  popup.classList.add('hidden');

  // удаляем класс modal-open, чтобы разрешить прокрутку body
  document.body.classList.remove('modal-open');

  // убираем обработчик событий нажатии клавиш при закрытии popup
  document.removeEventListener('keydown', onDocumentKeyDown);
};

// функция для показа/открытия popup
/**
 *
 * @param {Element} popup
 */
const openPopup = (popup) => {
  // находим класс закрытия popup
  const cancelButton = popup.querySelector('.cancel');

  // добавляем класс hidden к popup
  popup.classList.remove('hidden');

  // возвращает scroll к началу popup т.е. каждый новый открытый popup будет открываться с верхней своей границы
  popup.scroll(0, 0);

  // добавляем обработчик события по клику на класс cancel с событием onCancelButtonClick
  cancelButton.addEventListener('click', onCancelButtonClick);

  // добавляем к body класс modal-open для запрете прокрутки странице при появлении popup
  document.body.classList.add('modal-open');

  // добавляем обработчик событий при нажатии клавиш при открытии popup
  document.addEventListener('keydown', onDocumentKeyDown);
};

export default openPopup;

