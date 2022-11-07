// 400
const { ERROR_CODE_INCORRECT_INPUT } = require('../utils/constants');

class IncorrectInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = ERROR_CODE_INCORRECT_INPUT;
  }
}

module.exports = {
  IncorrectInputError,
};
