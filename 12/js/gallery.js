import updatePreview from './gallery-preview.js';
import openPopup from './popup.js';

// указываем тип элемента и находим класс .picture - "Шаблон изображения случайного пользователя"
/**
 * @type {HTMLElement}
 */
const gallery = document.querySelector('.pictures');

// указываем тип элемента и находим тег template по id='picture'
/**
 * @type {HTMLTemplateElement}
 */
const pictureTemplate = document.querySelector('#picture');

// находим класс с popup
/**
 * @type {HTMLElement}
 */
const popup = document.querySelector('.big-picture');

// функция которая создаёт элемент с заполнением данными, которые мы будем в эту функцию передавать
/**
 *
 * @param {PictureState} data
 * @return {HTMLAnchorElement}
 */
const createPicture = (data) => {
  // создаём новый элемент, через обращение к шаблону pictureTemplate со свойством content
  // (он возвращает содержимое шаблона DocumentFragment) и ищем класс.picture внутри него,
  // а после клонируем его всё содержимое с помощью метода cloneNode
  const picture =
    /**
     * @type {HTMLAnchorElement}
     */
    (pictureTemplate.content.querySelector('.picture').cloneNode(true));

  // Для изображения - находим дочерний элемент .picture__img с дальнейшим обновлением атрибута src с подставлением данных которые приходят из data
  picture.querySelector('.picture__img').setAttribute('src', data.url);
  // Для лайков -//-
  picture.querySelector('.picture__likes').textContent = String(data.likes);
  // Для количества комментариев -//-
  picture.querySelector('.picture__comments').textContent = String(data.comments.length);

  // Связь между объектом с данными PictureState (data) с DOM-элементом picture - ДАННЫЙ МЕТОД ПЛОХОЙ И НЕ ДОПУСТИМ К ИСПОЛЬЗОВАНИЮ!
  // picture.data = data;

  // Добавляет данные к каждому DOM-элементу данные из объекта
  // picture.setAttribute('data-picture', JSON.stringify(data));

  // Добавляет данные к каждому DOM-элементу данные из объекта но через id=1,2,3 и т.д., а не все подряд
  // picture.setAttribute('data-id', String(data.id));

  // создаём связь через замыкания между объектом PictureState (data) и DOM-элементом picture,
  // а именно добавляем обработчик события к DOM-элементу picture с действием на клик
  // по элементу(в нашем случае кли к по миниатюре) с последующим вызова функции
  picture.addEventListener('click', () => {
    // при клике происходит подстановка/обновления данных в popup
    updatePreview(data);
    // показываем окно popup
    openPopup(popup);
    // запрещает проскроливаться body в начало при открытии/закрытии popup (из-за # в теге а в которой находится миниатюра галереи)
    event.preventDefault();
  });

  return picture;
};


/**
 * // [] - говорят о том, что это список объектов
 * @param {PictureState[]} data
 */
// функция которая перерисовывает элементы - убирает старые и добавляет новые элементы (фотографии)
export const renderPictures = (data) => {
  // находим все существующие фотографии - это и будет весь список элементов
  const pictures = gallery.querySelectorAll('.picture');

  // превращаем список элементов в список DOM элементов
  const newPictures = data.map(createPicture);

  // удаляем старые изображения
  pictures.forEach((picture) => picture.remove());

  // добавляем новые элементы
  gallery.append(...newPictures);
};

const initGallery = (data) => {
  // TODO: Сортировка
  // FIXME: Сортировка
  // NOTE: Сортировка

  renderPictures(data);

  //updatePreview(data[0]);
  //openPopup(popup);
};

export default initGallery;
