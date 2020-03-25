import './public-path';
import axios from 'axios';

import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";

import './assets/style.scss';
import 'element-ui/lib/theme-chalk/index.css';

import appFactory from './app';

const { app, router } = appFactory({
  // https://www.youtube.com/watch?v=ff4fgQxPaO0
  state: JSON.parse(window.__INITIAL_STATE__),
  // base path
  base_path: window.__CONFIGS__.BASE_PATH,
  // base URL
  base_url: window.__CONFIGS__.BASE_URL,
  // axios
  axios: axios.create({ headers: { 'X-SESSION-ID': window.__CONFIGS__.SESSION_ID } }),
});

const resources = window.__CONFIGS__.RESOURCES;
// append meta data
if (!app.$options.metaInfo) app.$options.metaInfo = {};
// append scripts
if (!app.$options.metaInfo.script) app.$options.metaInfo.script = [];
app.$options.metaInfo.script.push(...resources.scripts);
// append stylesheets
if (!app.$options.metaInfo.link) app.$options.metaInfo.link = [];
app.$options.metaInfo.link.push(...resources.styles);

// If the current URL is not defined in routes
if (router.resolve(window.location.pathname).route.matched.length === 0) {
  router.push({ name: 'not_found' });
}

router.onReady(() => {
  app.$mount('#app');
});
