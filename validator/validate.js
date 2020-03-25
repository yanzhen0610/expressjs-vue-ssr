const ValidationError = require('../errors/ValidationError');

function throwOnErrors(result) {
  if (result.errors) {
    throw (new ValidationError).setResult(result);
  }
  return result;
}

function _validate({ rules, input, inputRoot, path }) {
  input = input || {};
  const result = { validated: {}, errors: null };

  for (let [field, fieldRules] of Object.entries(rules)) {
    let [value, errors] = [input[field], null];
    const currentPath = `${path.length ? path + '.' : ''}${field}`;

    // validate
    if (Array.isArray(fieldRules)) {
      for (let rule of fieldRules) {
        const result = rule({ field, value, inputRoot, path: currentPath, });
        value = result.validated;
        if (result.error) {
          (errors = (errors || [])).push(result.error);
        }
      }
    } else {
      // nested fields
      const result = _validate({ rules: rules[field], input: value, inputRoot, path: currentPath, });
      value = result.validated;
      errors = result.errors;
    }

    result.validated[field] = value;
    if (errors) {
      (result.errors = (result.errors || {}))[field] = errors;
    }
  }

  return result;
}

module.exports = function validate(rules, input) {
  const result = _validate({ rules, input, inputRoot: input, path: '' });
  result.throwOnErrors = () => throwOnErrors(result);
  return result;
}
