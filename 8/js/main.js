// Подключаем весь файл gallery.js
import './gallery.js';

// подключаем функцию renderPictures из файла gallery.js
import initGallery from './gallery.js';

// Подключаем функцию createImageStateList из файла data.js
import createPictureStateList from './data.js';

initGallery(createPictureStateList());


