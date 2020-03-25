<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  metaInfo() {
    return {
      htmlAttrs: {
        lang: this.$store.getters["app/locale"]
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" }
      ],
      noscript: [{ innerHTML: "This website requires JavaScript." }]
    };
  },

  async serverPrefetch() {
    try {
      await this.$store.dispatch("auth/get_user");
    } catch {}
  },

  async mounted() {
    try {
      await this.$store.dispatch("auth/get_user");
    } catch {}
  }
};
</script>
