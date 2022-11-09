// Мидлвэр для авторизации

// Чтобы загрузить файл .env в Node.js, используется модуль dotenv
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NotAuth } = require('../errors/not-auth-error');
const { NOT_AUTH } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// Если предоставлен верный токен, запрос проходит на дальнейшую обработку
// Иначе - запрос переходит контроллеру, который возвращает клиенту сообщение об ошибке
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  // try...catch позволит обработать ошибку, если с токеном что-то не так
  // Убедимся, что пользователь прислал именно тот токен,
  // который был выдан ему ранее (метод verify)
  // Верифицируем токен
  // Объявим payload снаружи, а проверим значение внутри try (из-за блочной области видимости)
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new NotAuth(NOT_AUTH));
  }
  req.user = payload;
  // Пропускаем запрос дальше
  next();
};
