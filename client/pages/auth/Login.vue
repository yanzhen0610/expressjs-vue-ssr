<template>
  <layout-default>
    <el-card class="login" shadow="always">
      <template slot="header">
        <div class="title">
          <h1>{{ $t('login_form') }}</h1>
        </div>
      </template>
      <div class="login-form">
        <el-form ref="form" v-model="form" autocomplete="on">
          <el-form-item prop="username">
            <div class="icon">
              <i class="el-icon-user"></i>
            </div>
            <el-input
              ref="username"
              v-model="form.username"
              v-bind:placeholder="$t('username')"
              clearable
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
              autofocus
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <div class="icon">
                <i class="el-icon-lock"></i>
              </div>
              <el-input
                ref="password"
                show-password
                clearable
                v-bind:placeholder="$t('password')"
                v-model="form.password"
                type="password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapsLock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
          </el-tooltip>

          <el-form-item>
            <el-button class="button-login" type="primary" @click="handleLogin">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </layout-default>
</template>

<script>
import layout from "../../layouts";

export default {
  components: {
    "layout-default": layout("Default")
  },

  data() {
    return {
      form: {
        username: "",
        password: "",
        capsTooltip: false
      }
    };
  },

  computed: {
    redirect() {
      return this.$route.query.redirect || { name: "home" };
    }
  },

  methods: {
    checkCapsLock(event) {
      this.capsTooltip = event.getModifierState("CapsLock");
    },
    async handleLogin() {
      try {
        const user = await this.$store.dispatch("auth/login", {
          username: this.form.username,
          password: this.form.password
        });
        this.$notify({
          title: this.$t("logged_in_successfully"),
          message: this.$t("logged_in_with", user),
          type: "success"
        });
        try {
          return await this.$router.push(this.redirect);
        } catch {
          return this.$router.push({ name: "home" });
        }
      } catch (e) {
        if (e.response) {
          const { error } = e.response.data;
          return this.$notify({
            title: this.$t("login_failed"),
            message: this.$t("error_code." + error.code),
            type: "error"
          });
        }
        return this.$notify({
          title: this.$t("login_failed"),
          message: this.$t("unknown_reason"),
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login {
  .login-form {
    .el-form-item {
      .el-input {
        input {
          background: transparent;
          border: 0;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.login {
  max-width: 30rem;
  margin: 0 auto;

  .login-form {
    .el-form-item {
      display: table;
      width: 100%;
      border: 1px solid #aaaaaa;
      border-radius: 5px;
      color: #454545;

      .icon {
        display: table-cell;
        padding-left: 0.5rem;
      }

      .el-input {
        display: table-cell;
        width: 100%;

        input {
          background: transparent;
          border: 0;
        }
      }
    }

    .button-login {
      width: 100%;
    }
  }
}
</style>
