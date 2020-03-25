<template>
  <el-container :direction="'vertical'">
    <el-header>
      <nav-bar />
    </el-header>
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<script>
import component from "../components";

export default {
  components: {
    "nav-bar": component("NavBar")
  }
};
</script>
