// Мидлвэр для централизованной обработки ошибок

// 500
const { ERROR_CODE } = require('../utils/constants');
const { COMMON_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  // Если ошибка сгенерирована не нами, у неё не будет свойства statusCode
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ERROR_CODE).send({ message: `${COMMON_ERROR}: ${err.message}` });
  }
  next();
};
