// 403
const { ERROR_CODE_NO_PERMISSION } = require('../utils/constants');

class NoPermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoPermissionError';
    this.statusCode = ERROR_CODE_NO_PERMISSION;
  }
}

module.exports = {
  NoPermissionError,
};
