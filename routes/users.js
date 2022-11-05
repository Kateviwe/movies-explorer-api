// Файл маршрутов. Создадим роуты для сущности "users"

// Метод Router создаёт объект, на который мы будем вешать обработчики
// Создадим роутер
const router = require('express').Router();

const {
  patchUserInfoValidation,
} = require('../middlewares/validation');

const {
  getUserInfo,
  patchUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', patchUserInfoValidation, patchUserInfo);

module.exports = router;
