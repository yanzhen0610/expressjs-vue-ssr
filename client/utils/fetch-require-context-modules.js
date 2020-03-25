export default require_context => {
  const modules = require_context.keys()
    .map(file => ({
      name: file.replace(/(^.\/)|(\.js$)/g, ''),
      module: require_context(file).default,
    }))
    .reduce((modules, { name, module }) => ({
      ...modules,
      [name]: module,
    }), {});

  return modules;
};
