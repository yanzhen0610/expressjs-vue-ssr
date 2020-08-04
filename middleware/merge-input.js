module.exports = function mergeInput(req, res, next) {
  let input = {};

  // if it's already exists
  if (req.input) {
    input = req.input;
  }

  // merge from url query string
  input = Object.assign(input, req.query);

  // merge from request body if available
  if (req.body instanceof Object) {
    input = Object.assign(input, req.body);
  }

  // merge from route params
  input = Object.assign(input, req.params);

  // assign to req.input
  req.input = input;

  return next();
}
