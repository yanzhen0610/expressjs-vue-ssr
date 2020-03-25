const nocache = require('nocache')();
const onHeaders = require('on-headers');

module.exports = function noCache(req, res, next) {
  onHeaders(res, () => res.removeHeader('ETag'));
  return nocache(req, res, next);
}
