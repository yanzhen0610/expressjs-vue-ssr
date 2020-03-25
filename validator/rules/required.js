module.exports = function required() {
  return function validate({ value, path }) {
    return {
      validated: value,
      ...(value ? {} : { error: `${path} is required` }),
    };
  };
};
