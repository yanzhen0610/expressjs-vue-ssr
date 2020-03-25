<template>
  <layout-default>
    <h1>{{ $t('page_not_found') }}</h1>
    <h2>{{ $t('redirecting_to_home_page') }}</h2>
  </layout-default>
</template>

<script>
import layout from "../layouts";

export default {
  components: {
    "layout-default": layout("Default")
  },

  mounted() {
    this.$notify({
      title: this.$t("page_not_found"),
      message: this.$t("redirecting_to_home_page"),
      type: "warning"
    });
    this.$router.push({ name: "home" });
  }
};
</script>
