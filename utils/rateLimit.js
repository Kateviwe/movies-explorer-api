// Защита от множества автоматических запросов
// Он ограничивает количество запросов с одного IP-адреса в единицу времени
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  // За 10 минут можно совершить максимум 100 запросов с одного IP
  windowMs: 10 * 60 * 1000,
  max: 100,
});

module.exports = limiter;
