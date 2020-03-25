const require_context = require.context('./', false, /.*\.js$/);
const middleware_factories = require_context.keys()
  .filter(file => file != './index.js')
  .map(file => ({
    name: file.replace(/(^.\/)|(\.js$)/g, ''),
    factory: require_context(file).default,
  }))
  .reduce((factories, { name, factory }) => ({
    ...factories,
    [name]: factory,
  }), {});

export default (name, options) => middleware_factories[name](options);
