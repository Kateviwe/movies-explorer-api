// Чтобы загрузить файл .env в Node.js, используется модуль dotenv
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Подключим модуль body-parser для объединения всех пакетов на принимающей стороне
const bodyParser = require('body-parser');
// Подключим модуль cookie-parser для извлечения данных из заголовка Cookie (чтение куки на сервере)
// и преобразования строки в объект
const cookieParser = require('cookie-parser');
// Подключим модуль Helmet для автоматической простановки заголовков безопасности
const helmet = require('helmet');
// Подключим обработчик ошибок celebrate
// Чтобы отправить клиенту ошибку, в celebrate есть специальный мидлвэр — errors
const { errors } = require('celebrate');

const limiter = require('./utils/rateLimit');

// Импорт роутеров
const allRoutes = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');
// Импортируем логгеры (сбор логов при запросах к серверу и ошибках)
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;

// Создадим приложение методом express()
const app = express();

app.use(cors);
// Для собирания JSON-формата
app.use(bodyParser.json());
// Для приёма веб-страниц внутри POST-запроса
// "extended: true" означает, что данные в полученном объекте body могут быть любых типов
// При значении false, в свойства body могут попасть только строки и массивы
app.use(bodyParser.urlencoded({ extended: true }));
// Простановка заголовков безопасности
app.use(helmet());
// Подключим, и куки станут доступны в объекте req.cookies.jwt
app.use(cookieParser());

// Подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/moviesdb');

// Подключаем логгер запросов (обязательно до всех обработчиков роутов)
app.use(requestLogger);

app.use(limiter);

// Подключаем файл с логикой маршрутизации
app.use(allRoutes);

// Подключаем логгер ошибок (обязательно после всех обработчиков роутов, но до обработчиков ошибок)
app.use(errorLogger);

// Обработчик ошибок, возникших при валидации данных с помощью библиотеки Joi
// Будет обрабатывать только ошибки, которые сгенерировал celebrate
// 400 (Bad Request)
app.use(errors());
// Централизованный обработчик ошибок
// Перехватит все остальные ошибки
app.use(errorHandler);

app.listen(PORT);
