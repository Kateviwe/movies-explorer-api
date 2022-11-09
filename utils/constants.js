// Коды ошибок
const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_INCORRECT_INPUT = 400;
const ERROR_CODE_NOT_AUTH = 401;
const ERROR_CODE_NO_PERMISSION = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_USER_DUPLICATION = 409;
const ERROR_CODE = 500;

// Общие
const INCORRECT_INPUT_ERROR = 'Некорректные входные данные';
const NOT_AUTH = 'Ошибка аутентификации';
const COMMON_ERROR = 'Произошла ошибка';
const NOT_FOUND_ERROR = 'Запрашиваемый ресурс не найден';
const COOKIES_DELETE_MESSAGE = 'Вы вышли из профиля';
const MOVIE_REMOVE_MESSAGE = 'Фильм удален';

// Сообщения ошибок /controllers/movies
const NOT_FOUND_ERROR_MOVIES = 'Запрашиваемый фильм не найден';
const NO_PERMISSION_ERROR_MOVIES = 'Удаление невозможно: это не ваш фильм';
const BAD_REQUEST_ERROR_MOVIES = 'Некорректный id фильма';

// Сообщения ошибок /controllers/users
const NOT_FOUND_ERROR_USERS = 'Запрашиваемый пользователь не найден';
const BAD_REQUEST_ERROR_USERS = 'Некорректный id пользователя';
const USER_DUPLICATION_ERROR = 'Пользователь с таким email уже существует';

// Сообщения ошибок /models/movies
const NOT_VALID_IMAGE_MOVIES = 'Ссылка на постер к фильму (image) невалидна';
const NOT_VALID_TRAILER_MOVIES = 'Ссылка на трейлер фильма (trailer) невалидна';
const NOT_VALID_THUMBNAIL_MOVIES = 'Ссылка на миниатюрное изображение постера к фильму (thumbnail) невалидна';

// Сообщения ошибок /models/users
const NOT_VALID_EMAIL_USERS = 'email невалиден';

module.exports = {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_INCORRECT_INPUT,
  ERROR_CODE_NOT_AUTH,
  ERROR_CODE_NO_PERMISSION,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_USER_DUPLICATION,
  ERROR_CODE,
  INCORRECT_INPUT_ERROR,
  NOT_FOUND_ERROR_MOVIES,
  NO_PERMISSION_ERROR_MOVIES,
  BAD_REQUEST_ERROR_MOVIES,
  NOT_FOUND_ERROR_USERS,
  BAD_REQUEST_ERROR_USERS,
  USER_DUPLICATION_ERROR,
  NOT_AUTH,
  COMMON_ERROR,
  NOT_VALID_IMAGE_MOVIES,
  NOT_VALID_TRAILER_MOVIES,
  NOT_VALID_THUMBNAIL_MOVIES,
  NOT_VALID_EMAIL_USERS,
  NOT_FOUND_ERROR,
  COOKIES_DELETE_MESSAGE,
  MOVIE_REMOVE_MESSAGE,
};
