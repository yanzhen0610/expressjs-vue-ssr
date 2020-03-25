module.exports = function user(req, res) {
  return res.status(req.session.user ? 200 : 403).send(req.session.user || null);
}
