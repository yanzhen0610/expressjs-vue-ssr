module.exports = function rule(rule, options) {
  return require(`./rules/${rule}`)(options);
}
