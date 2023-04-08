
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
  // Для лайков
  picture.querySelector('.picture__likes').textContent = String(data.likes);
  // Для количества комментариев
  picture.querySelector('.picture__comments').textContent = String(data.comments.length);

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
};

export default initGallery;
