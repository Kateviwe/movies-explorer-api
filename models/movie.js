const mongoose = require('mongoose');
const validator = require('validator');

const {
  NOT_VALID_IMAGE_MOVIES,
  NOT_VALID_TRAILER_MOVIES,
  NOT_VALID_THUMBNAIL_MOVIES,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(meaning) {
        return validator.isURL(meaning);
      },
      message: NOT_VALID_IMAGE_MOVIES,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(meaning) {
        return validator.isURL(meaning);
      },
      message: NOT_VALID_TRAILER_MOVIES,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(meaning) {
        return validator.isURL(meaning);
      },
      message: NOT_VALID_THUMBNAIL_MOVIES,
    },
  },
  owner: {
    // Mongo автоматически создаёт поле _id для каждого документа. Так можно связать 2 документа.
    // На уровне схемы: полю следует установить тип: mongoose.Schema.Types.ObjectId, а
    // также свойство ref (имя модели, на которую мы ссылаемся)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

// Создание модели по схеме, экспорт
module.exports = mongoose.model('movie', movieSchema);
