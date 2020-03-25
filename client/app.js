import Vue from 'vue';
import Meta from 'vue-meta'
import App from './App.vue';
import routerFactory from './router';
import storeFactory from './store';
import i18nFactory from './i18n';
import urlsFactory from './urls';
import ElementUI from 'element-ui';
import { sync } from 'vuex-router-sync';

Vue.use(Meta, {
  // https://vue-meta.nuxtjs.org/guide/caveats.html#duplicated-tags-after-hydration-with-ssr
  ssrAppId: 1,
  attribute: 'data-meta',
});

Vue.use(ElementUI);

export default context => {
  const urls = urlsFactory(context);
  context.urls = urls;
  const store = storeFactory(context);
  context.store = store;
  const i18n = i18nFactory(context);
  const router = routerFactory(context);

  sync(store, router);

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  });

  return { app, router, store, i18n, urls };
};
