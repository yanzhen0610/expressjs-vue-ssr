<template>
  <el-menu v-bind:router="true" mode="horizontal">
    <div class="navbar">
      <div class="menu-left">
        <router-link v-bind:to="{ name: 'home' }">
          <el-menu-item
            v-bind:index="$router.resolve({ name: 'home' }).route.path"
            v-bind:route="{ name: 'home' }"
          >
            {{ $t("home_page") }}
          </el-menu-item>
        </router-link>
      </div>
      <div class="menu-right">
        <router-link v-if="!user" v-bind:to="{ name: 'login' }">
          <el-menu-item
            v-bind:index="$router.resolve({ name: 'login' }).route.path"
            v-bind:route="{ name: 'login' }"
          >
            {{ $t("login") }}
          </el-menu-item>
        </router-link>
        <el-submenu v-else index="user_menu">
          <template slot="title">{{
            user.display_name || user.username
          }}</template>
          <el-menu-item @click="logout">{{ $t("logout") }}</el-menu-item>
        </el-submenu>
      </div>
    </div>
  </el-menu>
</template>

<style lang="scss" scoped>
.navbar {
  position: relative;

  a {
    color: inherit;
    text-decoration: inherit;
  }

  .menu-left {
    float: left;
    height: 100%;
  }

  .menu-right {
    float: right;
    height: 100%;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("auth/logout");
        return this.$notify({
          title: this.$t("logged_out_successfully"),
          type: "info"
        });
      } catch {}
    }
  }
};
</script>
