
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

// функция для создания комментария
/**
 *
 * @param {CommentState} data
 * @return {HTMLLIElement}
 */
const createComment = (data => {
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

// модуль обновления привью
/**
 *
 * @param {PictureState} data
 */

const updatePreview = (data) => {

  // находим изображение в контейнере в тужt переменную preview + туда же тег с картинкой,
  // после устанавливаем атрибут в src -> data.url
  preview.querySelector('.big-picture__img img').setAttribute('src', data.url);

  // находим количество лайков в туже переменную и меняем на строку из data.likes
  preview.querySelector('.likes-count').textContent = String(data.likes);

  // находим количество комментариев в туже переменную и меняем на из data.description
  preview.querySelector('.social__caption').textContent = data.description;

  discussion.replaceChildren(...data.comments.map(createComment));

};

export default updatePreview;
