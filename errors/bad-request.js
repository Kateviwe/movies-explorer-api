// 400
const { ERROR_CODE_BAD_REQUEST } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = ERROR_CODE_BAD_REQUEST;
  }
}

module.exports = {
  BadRequestError,
};
