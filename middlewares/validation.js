// Мидлвэр для валидации данных с помощью библиотеки Joi
// celebrate позволяет валидировать тело запроса, заголовки, параметры или req.query
const { celebrate, Joi } = require('celebrate');

const regExpUrl = /^(http)s?:\/\/(www\.)?[a-zA-Z0-9-]+\.([\w\-.~:/?#[\]@!$&'()*+,;=]+)/;

const patchUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const postNewMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(RegExp(regExpUrl)),
    trailerLink: Joi.string().required().regex(RegExp(regExpUrl)),
    thumbnail: Joi.string().required().regex(RegExp(regExpUrl)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const defineMovieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).required()
      .hex(),
  }),
});

const postNewUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  patchUserInfoValidation,
  postNewMovieValidation,
  defineMovieIdValidation,
  postNewUserValidation,
  loginValidation,
};
