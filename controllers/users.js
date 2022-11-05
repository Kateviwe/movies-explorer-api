// Файл контроллеров
// Импортируем модуль для хеширования пароля перед сохранением в базу данных
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;

const { IncorrectInputError } = require('../errors/incorrect-input-error');
const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request');
// const { UserDuplicationError } = require('../errors/user-duplication-error');
// const { NotAuth } = require('../errors/not-auth-error');

// Импортируем модель 'user'
const User = require('../models/user');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        // 400
        next(new BadRequestError('Некорректный id пользователя'));
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
    .orFail(new NotFoundError('Запрашиваемый пользователь не найден'))
  // Особенность mongoose: при сохранении данных (POST) валидация происходит автоматически, а
  // при обновлении (PATCH) для валидации надо добавлять вручную опцию: runValidators: true
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // 400
        next(new IncorrectInputError(`Некорректные входные данные. ${err}`));
      } else {
        next(err);
      }
    });
};
