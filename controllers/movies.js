// Файл контроллеров

const { IncorrectInputError } = require('../errors/incorrect-input-error');
const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request');
const { NoPermissionError } = require('../errors/no-permission-error');

const {
  INCORRECT_INPUT_ERROR,
  NOT_FOUND_ERROR_MOVIES,
  NO_PERMISSION_ERROR_MOVIES,
  BAD_REQUEST_ERROR_MOVIES,
} = require('../utils/constants');

// Импортируем модель 'movie'
const Movie = require('../models/movie');

module.exports.getAllSaveMovies = (req, res, next) => {
  Movie.find({})
    // .populate(['owner', 'likes'])
    .then((movies) => res.send(movies))
    // catch(next) аналогична catch(err => next(err))
    .catch(next);
};

module.exports.postNewMovie = (req, res, next) => {
  // Получим из объекта запроса данные о фильме
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    // .then((doc) => doc.populate(['owner', 'likes']))
    .then((movie) => {
      console.dir(movie);
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // 400
        next(new IncorrectInputError(`${INCORRECT_INPUT_ERROR}. ${err}`));
      } else {
        next(err);
      }
    });
};

module.exports.deleteNecessaryMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    // orFail только кидает ошибку - не обрабатывает
    .orFail(new NotFoundError(NOT_FOUND_ERROR_MOVIES))
    .then((movie) => {
      if (JSON.stringify(movie.owner) === JSON.stringify(req.user._id)) {
        // Асинхронный метод (ждем завершения операции прежде,
        // чем отправлять ответ) => используем then
        return movie.remove()
          .then(() => res.send({ message: 'Фильм удален' }));
      }
      // 403
      next(new NoPermissionError(NO_PERMISSION_ERROR_MOVIES));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // 400
        next(new BadRequestError(BAD_REQUEST_ERROR_MOVIES));
      } else {
        next(err);
      }
    });
};
