
// находим контейнер привью
/**
 * @type {HTMLElement}
 */
const preview = document.querySelector('.big-picture__preview');


// переменная для контейнера обсуждения в котоую находим класс содержащий структуру неупорядоченного списка с комментариями
/**
 * @type {HTMLUListElement}
 */
const discussion = preview.querySelector('.social__comments');

// переменная содержащая сами комментарии внутри контейнера discussion? а именно дш элементы неупорядоченного списка
/**
 * @type {HTMLLIElement}
 */
const commentTemplate = discussion.querySelector('.social__comment');


const moreButton = preview.querySelector('.comments-loader');

/**
 * @type {PictureState & {commentsTotal: number}}
 */

let currentData;

// функция для создания комментария
/**
 *
 * @param {CommentState} data
 * @return {HTMLLIElement}
 */
const createComment = ((data) => {
  const comment =
    /**
     * @type {HTMLLIElement}
     */
    (commentTemplate.cloneNode(true));

  // подставляем разные аватары к комментариям
  comment.querySelector('.social__picture').setAttribute('src', data.avatar);
  // подставляем имя автора в тег alt для аватара
  comment.querySelector('.social__picture').setAttribute('alt', data.name);
  // меняем содержимое комментария
  comment.querySelector('.social__text').textContent = data.message;

  return comment;

});

// описание onMoreButtonClick
const onMoreButtonClick = () => {
  // удаление методом splice первых 5 комментариев и вывод их
  // с помощью метода map превращаем в DOM-элемент
  const newComments = currentData.comments.splice(0, 5).map(createComment);

  // отображаемоме количество комментарив = общее количество комментариев минус показанное количество комментариев
  const shown = currentData.commentsTotal - currentData.comments.length;

  // найденный класс comments-shown обволакивает в тег span начальное значение количества комментариев в index.html
  preview.querySelector('.comments-shown').textContent = String(shown);

  // метод append добавляет комментарии к существующим
  discussion.append(...newComments);

  // скрываем кнопку "Загрузить ещё" при отсутствии комментариев - закончились например, манипулируюя добавлением или отсутствием класса hidden
  // если hidden есть то toggle его удалить и наоборот, если hidden нет то toggle его добавит
  // в строке ниже toggle сработает когда значение будет true, а именно когда отображаемое количество будет равно общему числу комментариев
  moreButton.classList.toggle('hidden', shown === currentData.commentsTotal);
};

// модуль обновления привью
/**
 * @param {PictureState} data
 */

const updatePreview = (data) => {
  currentData = {
    ...structuredClone(data), commentsTotal: data.comments.length
  };

  // находим изображение в контейнере в туже переменную preview + туда же тег с картинкой,
  // после устанавливаем атрибут в src -> data.url
  preview.querySelector('.big-picture__img img').setAttribute('src', data.url);

  // находим количество лайков в туже переменную и меняем на строку из data.likes
  preview.querySelector('.likes-count').textContent = String(data.likes);

  // находим количество комментариев в туже переменную и меняем на из data.description
  preview.querySelector('.social__caption').textContent = data.description;


  preview.querySelector('.comments-count').textContent = String(currentData.commentsTotal);

  discussion.replaceChildren();

  // обработчик на onMoreButtonClick - кнопка с комментариями "Загрузить ещё"
  moreButton.addEventListener('click', onMoreButtonClick);


  // @ts-ignore
  moreButton.click();

};

export default updatePreview;
