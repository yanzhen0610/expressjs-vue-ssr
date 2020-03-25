const validate = require('./validate');

module.exports = function factory(rules) {
  return {
    rules,
    validate(input) {
      return validate(this.rules, input);
    }
  };
}
