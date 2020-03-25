import Vue from 'vue';
import Vuex from 'vuex';
import fetch from '../utils/fetch-require-context-modules';

Vue.use(Vuex);

const modules_factories = fetch(require.context('./modules', false, /.*\.js$/));

export default context => {
  const modules = Object.entries(modules_factories)
    .map(([name, factory]) => ({ name, module: factory(context) }))
    .reduce((modules, { name, module }) => {
      if (module.namespaced === undefined) {
        module.namespaced = true;
      }
      modules[name] = module;
      return modules;
    }, {});
  return new Vuex.Store({
    state: JSON.parse(JSON.stringify(context.state)),
    modules,
  });
};
