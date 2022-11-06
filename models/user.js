const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { NotAuth } = require('../errors/not-auth-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // 'unique: true' - не валидатор, а подсказка Mongo, по чему строить индексы
    unique: true,
    validate: {
      // validator — функция валидации, возвращающая булевое значение
      // meaning - значение свойства email
      validator(meaning) {
        // validator.isEmail(meaning) - проверка на соответствие схеме электронной почты
        return validator.isEmail(meaning);
      },
      // Сообщение об ошибке срабатывает, если функция валидации возвращает false
      message: 'email невалиден',
    },
  },
  password: {
    type: String,
    required: true,
    // API не будет возвращать хеш пароль
    select: false,
  },
});

// Добавим собственный метод проверки почты и пароля с помощью свойства statics
// findUserByCredentials не должна быть стрелочной для требуемого использования this
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // Если почта и пароль совпадают с теми, что есть в базе, пользователь входит на сайт
  // Иначе — получает сообщение об ошибке
  // В случае аутентификации нужен хеш пароля => добавим метод select со строкой '+password'
  // this - модель User
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // Если пользователь с таким email не нашелся
      if (!user) {
        return Promise.reject(new NotAuth('Ошибка аутентификации'));
      }
      // Если нашелся: захешируем пароль и сравним с хешем в базе
      // password - пароль, который ввел пользователь
      // user.password - пароль, который 'закреплен' за введенным email в базе данных
      return bcrypt.compare(password, user.password)
      // bcrypt.compare работает асинхронно => результат обработаем в след. then
      // Делаем then в then, чтобы user был доступен в нашей области видимости
        .then((arePasswordsMatched) => {
          if (!arePasswordsMatched) {
            return Promise.reject(new NotAuth('Ошибка аутентификации'));
          }
          return user;
        });
    });
};

// Создание модели по схеме, экспорт
module.exports = mongoose.model('user', userSchema);
