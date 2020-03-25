const config = require('../config');
const randstr = require('../utils/randstr');

const sessionCookieName = `${config.app_name}-session-id`;
const sessionHeaderName = 'X-SESSION-ID';

// in memory session store
const sessionStore = {};

module.exports = function session(req, res, next) {
  let sessionId = req.get(sessionHeaderName) || req.cookie[sessionCookieName] || null;
  if (!(sessionId && sessionId in sessionStore)) {
    sessionId = randstr(config.session.id_length);
    res.cookie(sessionCookieName, sessionId, {
      domain: config.domain,
      maxAge: config.session.maxAge,
      httpOnly: true,
    });
    sessionStore[sessionId] = {
      sessionId,
      setTimeoutId: setTimeout(() => delete sessionStore[sessionId], config.session.maxAge),
    };
  }

  req.session = sessionStore[sessionId];

  return next();
}
