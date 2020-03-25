const errorCodes = require('./codes');

module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.code = errorCodes.VALIDATION_ERROR;
  }

  setResult(result) {
    this.result = result;
    return this;
  }

  handle(req, res) {
    res.status(400);
    if (res.isApi && res.setError) {
      res.setError(null, null, { fields: this.result.errors }).end();
    }
    res.end();
  }
}
