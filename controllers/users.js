// Файл контроллеров
// Импортируем модуль для хеширования пароля перед сохранением в базу данных
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { IncorrectInputError } = require('../errors/incorrect-input-error');
const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request');
const { UserDuplicationError } = require('../errors/user-duplication-error');
const { NotAuth } = require('../errors/not-auth-error');

const {
  NOT_FOUND_ERROR_USERS,
  BAD_REQUEST_ERROR_USERS,
  INCORRECT_INPUT_ERROR,
  USER_DUPLICATION_ERROR,
  NOT_AUTH,
} = require('../utils/constants');

// Импортируем модель 'user'
const User = require('../models/user');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(NOT_FOUND_ERROR_USERS))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        // 400
        next(new BadRequestError(BAD_REQUEST_ERROR_USERS));
      } else {
        next(err);
      }
    });
};

module.exports.patchUserInfo = (req, res, next) => {
  // Получим из объекта запроса имя и email пользователя
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, { new: true, runValidators: true })
    .orFail(new NotFoundError(NOT_FOUND_ERROR_USERS))
  // Особенность mongoose: при сохранении данных (POST) валидация происходит автоматически, а
  // при обновлении (PATCH) для валидации надо добавлять вручную опцию: runValidators: true
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        // 409
        next(new UserDuplicationError(USER_DUPLICATION_ERROR));
      } else if (err.name === 'ValidationError') {
        // 400
        next(new IncorrectInputError(`${INCORRECT_INPUT_ERROR}. ${err}`));
      } else {
        next(err);
      }
    });
};

// Регистрация нового пользователя
module.exports.postNewUser = (req, res, next) => {
  // Получим из объекта запроса имя, email и пароль
  const {
    name,
    email,
    password,
  } = req.body;

  // Уникальность email определяется исходя из схемы user: "unique: true"
  // Применим метод hash для хеширования пароля пользователя
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name, email, _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // 409
        next(new UserDuplicationError(USER_DUPLICATION_ERROR));
      } else if (err.name === 'ValidationError') {
      // ValidationError - ошибка валидации в mongoose
      // Валидация делается автоматически по схеме в папке models
        // 400
        next(new IncorrectInputError(`${INCORRECT_INPUT_ERROR}. ${err}`));
      } else {
        next(err);
      }
    });
};

// Чтобы войти в систему, пользователь отправляет на сервер почту и пароль
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // Создадим токен методом sign
      // Первый аргумент: пейлоуд токена — зашифрованный в строку объект пользователя
      // id достаточно, чтобы однозначно определить пользователя
      // expiresIn - время, в течение которого токен остаётся действительным
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      // Запишем токен в куки, и опцией maxAge определим время хранения куки: 7 дней
      // 'httpOnly: true' - доступ из JavaScript запрещен
      // 'sameSite: true' - защита от автоматической отправки кук
      // Указываем браузеру, чтобы он посылал куки только, если запрос сделан с того же домена
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ email });
    })
    .catch((err) => {
      if (err.name === 'NotAuthorised') {
        // 401
        next(new NotAuth(NOT_AUTH));
      } else {
        next(err);
      }
    });
};

module.exports.getCookiesDelete = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из профиля' });
};
