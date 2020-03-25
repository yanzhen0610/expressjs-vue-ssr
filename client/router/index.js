import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router_config = {
  base: '/',
  mode: 'history',
  routes,
};

export default context => {
  const router = new Router({ ...router_config, base: context.base_path });

  router.beforeEach(async (to, from, next) => {
    if (!to.meta) return next();
    const middleware = to.meta.middleware;
    if (!(middleware instanceof Array)) return next();
    const { store } = context;

    const pipeline_context = { to, from, store };

    await middleware.reduce((stack, pipe) => context => pipe(context, (...args) => {
      // `next()` Wrapper
      // If `next()` is called with arguments, then call the
      // original `next()`, else call the middleware stack.
      return args.length ? next(...args) : stack(context);
    }), () => next()/*don't pass context to `next()`*/)(pipeline_context);
  });

  router.afterEach(() => {
    if (router.getMatchedComponents().length === 0) {
      router.push({ name: 'not_found' });
    }
  });

  return router;
};
