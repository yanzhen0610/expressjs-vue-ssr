const toIso8601String = require('../utils/toIso8601String');

module.exports = function log(req, res, next) {
  const timestamp = toIso8601String(new Date);
  const start = Date.now();
  const remote = req.socket.remoteAddress;
  const method = req.method;
  const path = req.url;
  const userAgent = req.headers['user-agent'];

  res.on('close', () => {
    const status = res.statusCode;
    const duration = Date.now() - start;
    const length = res.get('content-length') || 0;
    console.log(`[${timestamp}] ${remote} ${status} ${length} ${duration}ms ${method} ${path} -- ${userAgent}`);
  });

  return next();
}
