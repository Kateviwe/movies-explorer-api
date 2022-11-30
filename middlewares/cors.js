// Мидлвэр для работы с механизмом CORS

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://movies.frontend.kateviwe.nomoredomains.icu',
  'https://movies.frontend.kateviwe.nomoredomains.icu',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = (req, res, next) => {
  // Сохраняем источник запроса в переменную origin
  const { origin } = req.headers;
  // Сохраняем метод запроса в переменную method
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  // Обработка простых CORS-запросов
  // Проверим, есть ли источник запроса среди разрешённых
  if (allowedCors.includes(origin)) {
    // Прописываем его в заголовок ответа
    res.header('Access-Control-Allow-Origin', origin);
    // С опцией credentials браузер передает токен, который сохраняется в куках
    res.header('Access-Control-Allow-Credentials', true);
  }

  // Обработка сложных CORS-запросов
  if (method === 'OPTIONS') {
    // Тогда это предварительный CORS-запрос
    // Разрешаем кросс-доменные запросы типов, указанных в DEFAULT_ALLOWED_METHODS
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // Разрешаем кросс-доменные запросы с заголовками, указанными в requestHeaders
    // Обычно используют значение заголовка Access-Control-Request-Headers,
    // который передает браузер вместе с запросом
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // Завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  // Браузер сам заблокирует запрос, поскольку заголовок не был передан
  return next();
};
