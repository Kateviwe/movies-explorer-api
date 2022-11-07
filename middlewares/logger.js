// Мидлвэр для сбора логов
const winston = require('winston');
const expressWinston = require('express-winston');

// Создадим логгеры
// Будем логировать запросы к серверу
const requestLogger = expressWinston.logger({
  // Опция transports отвечает за то, куда нужно писать лог
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  // Опция format отвечает за формат записи логов
  format: winston.format.json(),
});

// Будем логировать ошибки, которые происходят на сервере
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

// После создания логгеров их нужно экспортировать
module.exports = {
  requestLogger,
  errorLogger,
};
