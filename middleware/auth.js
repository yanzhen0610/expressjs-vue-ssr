module.exports = function auth(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.status(403).end();
}
