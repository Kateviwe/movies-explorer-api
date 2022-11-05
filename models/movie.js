const mongoose = require('mongoose');
const validator = require('validator');

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
      message: 'Ссылка на постер к фильму (image) невалидна',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(meaning) {
        return validator.isURL(meaning);
      },
      message: 'Ссылка на трейлер фильма (trailerLink) невалидна',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(meaning) {
        return validator.isURL(meaning);
      },
      message: 'Ссылка на миниатюрное изображение постера к фильму (thumbnail) невалидна',
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
