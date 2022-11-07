// Вынесем в данный файл всю логику маршрутизации

// Метод Router создаёт объект, на который мы будем вешать обработчики
// Создадим роутер
const router = require('express').Router();

const {
  postNewUser,
  login,
  getCookiesDelete,
} = require('../controllers/users');

const {
  postNewUserValidation,
  loginValidation,
} = require('../middlewares/validation');

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../errors/not-found-error');

const { NOT_FOUND_ERROR } = require('../utils/constants');

// Роуты без авторизации
router.post('/signup', postNewUserValidation, postNewUser);
router.post('/signin', loginValidation, login);

// Роуты с авторизацией
router.use(auth);
// Запрос на api с '/deletecookies'
router.post('/signout', getCookiesDelete);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// Обработка несуществующих роутов
// 404
router.use('*', (req, res, next) => next(new NotFoundError(NOT_FOUND_ERROR)));

module.exports = router;
