// 409
const { ERROR_CODE_USER_DUPLICATION } = require('../utils/constants');

class UserDuplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = ERROR_CODE_USER_DUPLICATION;
  }
}

module.exports = {
  UserDuplicationError,
};
