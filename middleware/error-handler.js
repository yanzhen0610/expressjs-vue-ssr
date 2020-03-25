module.exports = function errorHandler(err, req, res, next) {
  if (typeof err.handle == 'function') {
    return err.handle(req, res);
  }

  console.error(err);

  if (res.statusCode == 200) {
    res.status(500);
  }
  return res.end();
}
