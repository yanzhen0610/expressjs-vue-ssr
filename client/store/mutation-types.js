// Load store modules dynamically.
const require_context = require.context('./modules', false, /.*\.js$/);

export default require_context.keys()
  .map(file => ({
    name: file.replace(/(^.\/)|(\.js$)/g, ''),
    mutation_types: require_context(file).mutation_types,
  }))
  .reduce((modules_mutation_types, { name, mutation_types }) => ({
    ...modules_mutation_types,
    [name]: mutation_types,
  }), {});
