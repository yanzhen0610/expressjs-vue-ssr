const cookie = require('cookie');

module.exports = function parseCookie(req, res, next) {
  req.cookie = cookie.parse(req.get('Cookie') || '');
  return next();
}
