export default () => async ({ store }, next) => {
  try {
    if (await store.dispatch('auth/get_user')) {
      return next({ name: 'home' });
    }
  } catch { }
  next();
};
