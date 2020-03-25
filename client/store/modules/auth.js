export const mutation_types = {
  UPDATE_USER: 'UPDATE_USER',
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
};

export default context => ({
  state: {
    user: null,
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
    [mutation_types.UPDATE_USER]: (state, user) => state.user = user,
    [mutation_types.LOGIN]: (state, user) => state.user = user,
    [mutation_types.LOGOUT]: (state) => state.user = null,
  },
  actions: {
    fetch_user: async ({ state, commit }) => {
      const response = await context.axios.get(context.urls.api.auth.user, {
        validateStatus: state => state < 500,
      });
      const user = response.data.data;
      if (state.user && !user) commit(mutation_types.LOGOUT);
      if (!state.user && user) commit(mutation_types.LOGIN, user);
      commit(mutation_types.UPDATE_USER, user);
      return user;
    },
    get_user: async ({ state, dispatch }) => {
      if (state.user) return state.user;
      return await dispatch('fetch_user');
    },
    login: async ({ state, commit }, { username, password }) => {
      const response = await context.axios.post(context.urls.api.auth.login, { username, password });
      const user = response.data.data;
      if (!state.user && user) commit(mutation_types.LOGIN, user);
      commit(mutation_types.UPDATE_USER, user);
      return user;
    },
    logout: async ({ commit }) => {
      await context.axios.post(context.urls.api.auth.logout);
      commit(mutation_types.LOGOUT);
      commit(mutation_types.UPDATE_USER, null);
    },
  },
});
