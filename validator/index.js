const factory = require('./factory');

module.exports = function validator(rules) {
  return factory(rules);
}
