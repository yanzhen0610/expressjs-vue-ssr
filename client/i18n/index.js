import Vue from 'vue';
import VueI18n from 'vue-i18n';
import mutation_types from '../store/mutation-types';

Vue.use(VueI18n);

const set_locale = async (i18n, locale) => {
  if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
    const messages = await import(/* webpackChunkName: 'i18n/[request]' */ `./lang/${locale}`);
    i18n.setLocaleMessage(locale, messages);
  }

  if (i18n.locale !== locale) {
    i18n.locale = locale;
  }
};

const locale_update_listener = mutation => {
  if (mutation.type != mutation_types.app.UPDATE_LOCALE) return;
  set_locale(i18n, mutation.payload);
};

export default ({ store }) => {
  const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: new Object(),
    silentTranslationWarn: true,
  });

  store.subscribe(locale_update_listener);
  set_locale(i18n, store.getters['app/locale']);

  return i18n;
};
