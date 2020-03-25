export const mutation_types = {
  UPDATE_LOCALE: 'UPDATE_LOCALE',
};

export default () => ({
  state: {
    locale: 'en',
  },
  getters: {
    locale: state => state.locale,
  },
  mutations: {
    [mutation_types.UPDATE_LOCALE]: (state, locale) => state.locale = locale,
  },
  actions: {
    set_locale: ({ commit }, locale) => {
      commit(mutation_types.UPDATE_LOCALE, locale);
    },
  },
});
