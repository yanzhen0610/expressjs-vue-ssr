export default context => ({
  api: {
    auth: {
      login: context.base_url + 'api/auth/login',
      logout: context.base_url + 'api/auth/logout',
      user: context.base_url + 'api/auth/user',
    }
  }
});
