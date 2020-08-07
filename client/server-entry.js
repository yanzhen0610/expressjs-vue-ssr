import axios from 'axios';
import appFactory from './app';
import { NavigationFailureType, isNavigationFailure } from 'vue-router';

export default async context => {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  context.axios = axios.create({
    headers: { ...context.headers, 'X-SESSION-ID': context.session_id }
  });
  const { app, router, store } = appFactory(context);
  const { manifest } = context;

  const scripts = [
    { ...manifest['app.js'], crossorigin: 'anonymous', defer: true }
  ];
  const styles = [
    {
      rel: 'stylesheet',
      href: manifest['app.css'].src,
      integrity: manifest['app.css'].integrity,
      crossorigin: 'anonymous'
    }
  ];
  scripts.push({
    // https://www.youtube.com/watch?v=ff4fgQxPaO0
    innerHTML: `window.__CONFIGS__=JSON.parse(${JSON.stringify(
      JSON.stringify({
        // prevent from client side script removing scripts and styles
        RESOURCES: { scripts, styles },
        // configurable public path
        PUBLIC_PATH: context.public_path,
        // base path
        BASE_PATH: context.base_path,
        // base URL
        BASE_URL: context.base_url,
        // session ID
        SESSION_ID: context.session_id
      })
    )});`
  });

  // append meta data
  if (!app.$options.metaInfo) app.$options.metaInfo = {};
  // append scripts
  if (!app.$options.metaInfo.script) app.$options.metaInfo.script = [];
  app.$options.metaInfo.script.push(...scripts);
  // append stylesheets
  if (!app.$options.metaInfo.link) app.$options.metaInfo.link = [];
  app.$options.metaInfo.link.push(...styles);
  // no escape in <script>
  if (!app.$options.metaInfo.__dangerouslyDisableSanitizers)
    app.$options.metaInfo.__dangerouslyDisableSanitizers = [];
  app.$options.metaInfo.__dangerouslyDisableSanitizers.push('script');

  // set server-side router's location
  let route = context.url;
  for (let i = 0; i < 3 /*max*/ && route; ++i) {
    try {
      await router.push(route);
      break;
    } catch (e) {
      route = isNavigationFailure(err, NavigationFailureType.duplicated)
        ? false
        : err;
    }
  }
  // if routing is rejected with `false`, then redirect to home page
  if (route === false) {
    route.push({ name: 'home' });
  }

  // metadata is provided by vue-meta plugin
  context.meta = app.$meta();

  // wait until router has resolved possible async components and hooks
  await new Promise(router.onReady.bind(router));

  // redirected
  const currentRoute = router.currentRoute;
  if (currentRoute.path != context.path) {
    throw { code: 307, location: currentRoute.fullPath };
  }
  // no matched routes, reject with 404
  if (!router.getMatchedComponents().length) {
    throw { code: 404 };
  }
  // This `rendered` hook is called when the app has finished rendering
  context.rendered = () => {
    // After the app is rendered, our store is now
    // filled with the state from our components.
    // When we attach the state to the context, and the `template` option
    // is used for the renderer, the state will automatically be
    // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
    // https://www.youtube.com/watch?v=ff4fgQxPaO0
    context.state = JSON.stringify(store.state);
  };

  // the Promise should resolve to the app instance so it can be rendered
  return app;
};
