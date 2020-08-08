import Vue from 'vue';
import Vuex from 'vuex';
import fetch from '../utils/fetch-require-context-modules';
import _ from 'lodash';

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

  const store = new Vuex.Store({ modules });

  if (context.state) {
    // Prevent from getters are not updating
    // due to some state keys are missing
    // e.g. JSON.stringify({ axios: axios.create() }) // "{}"
    const state = _.merge(store.state, context.state);

    // Clone the state object to avoid malicious scripts
    // is modifying the `window.__INITIAL_STATE__`
    store.replaceState(JSON.parse(JSON.stringify(state)));
  }

  return store;
};
