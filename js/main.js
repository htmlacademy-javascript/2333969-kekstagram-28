// Подключаем функцию createImageStateList из файла data.js
import createPictureStateList from './data.js';

// подключаем функцию renderPictures из файла gallery.js
import initGallery from './gallery.js';

// подключаем upload.js
import './upload.js';

initGallery(createPictureStateList());
