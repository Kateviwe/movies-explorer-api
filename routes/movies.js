// Файл маршрутов. Создадим роуты для сущности "movies"

// Метод Router создаёт объект, на который мы будем вешать обработчики
// Создадим роутер
const router = require('express').Router();

const {
  postNewMovieValidation,
  defineMovieIdValidation,
} = require('../middlewares/validation');

const {
  getAllSaveMovies,
  postNewMovie,
  deleteNecessaryMovie,
} = require('../controllers/movies');

router.get('/', getAllSaveMovies);
router.post('/', postNewMovieValidation, postNewMovie);
router.delete('/:movieId', defineMovieIdValidation, deleteNecessaryMovie);

module.exports = router;
