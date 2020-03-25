<template>
  <layout-default>{{ $t('home_page') }}</layout-default>
</template>

<script>
import layout from "../layouts";

export default {
  components: {
    "layout-default": layout("Default")
  }
};
</script>
