<template>
  <div>
    <demo-header>登录</demo-header>
    <demo-logo></demo-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      :error-message="usernameErrMsg"
      placeholder="请输入用户名"
      clearable
      @input="checkUsername"
      @clear="clearUsernameErrMsg"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkPassword"
      @clear="clearPasswordErrMsg"
    />
    <demo-button @click="startRegister">登录</demo-button>
    <div class="register">
      若为新用户，请<router-link to="/register">注册</router-link>
      <!-- <p @click="$router.push('/user')">若为新用户，请注册</p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      usernameErrMsg: "", //用户名错误提示
      passwordErrMsg: "", //密码错误提示
    };
  },
  created() {
    let { username, password } = this.$route.params;
    if (username && password) {
      this.username = username;
      this.password = password;
    }
  },
  methods: {
    //校验用户名
    checkUsername() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.username)) {
        this.usernameErrMsg = "";
      } else {
        this.usernameErrMsg = "用户名格式错误";
      }
    },
    clearUsernameErrMsg() {
      this.usernameErrMsg = "";
    },
    checkPassword() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.password)) {
        this.passwordErrMsg = "";
      } else {
        this.passwordErrMsg = "密码格式错误";
      }
    },
    clearPasswordErrMsg() {
      this.passwordErrMsg = "";
    },
    startRegister() {
      if (
        this.username &&
        this.password &&
        !this.usernameErrMsg &&
        !this.passwordErrMsg
      ) {
        this.$axios
          .post("http://localhost:3000/login", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            const { statusCode, message, data } = res.data;
            if (statusCode === 200) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user_id", data.user.id);
              this.$toast.success(message);

              if (!this.$route.params.back) {
                this.$router.push("/user");
              } else {
                this.$router.back();
              }
            } else {
              this.$toast.fail(message);
            }
          });
      } else {
        this.$toast.fail("验证失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  float: right;
  margin-right: 20px;
}
</style>
