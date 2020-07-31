module.exports = function not_found(req, res) {
  return res.setError(
    'not_found',
    'Not Found'
  ).status(404).end();
}
