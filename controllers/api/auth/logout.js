module.exports = function logout(req, res) {
  delete req.session.user;
  return res.status(200).end();
}
