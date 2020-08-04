module.exports = function errorHandler(err, req, res, next) {
  if (typeof err.handle == 'function') {
    return err.handle(req, res);
  }

  if (err.statusCode) {
    if (err.statusCode >= 500) {
      console.error(err);
      return res.status(500).end();
    }

    return res.status(err.statusCode).end();
  }

  console.error(err);

  if (res.statusCode == 200) {
    res.status(500);
  }
  return res.end();
}
