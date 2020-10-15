<template>
  <div>
    <demo-header>注册</demo-header>
    <demo-logo></demo-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkUsername"
      @clear="clearUsernameErrMsg"
    />
    <van-field
      v-model="nickname"
      required
      label="昵称"
      placeholder="请输入昵称"
      :error-message="nicknameErrMsg"
      clearable
      @input="checkNickname"
      @clear="clearNicknameErrMsg"
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
    <demo-button @click.native="startRegister">注册</demo-button>
    <div class="login">
      若已有账户，请<router-link to="/login">登录</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "", //用户名
      nickname: "", //昵称
      password: "", //密码
      usernameErrMsg: "", //用户名错误提示
      nicknameErrMsg: "", //昵称错误提示
      passwordErrMsg: "", //密码错误提示
    };
  },
  methods: {
    //校验用户名
    checkUsername() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.username)) {
        this.usernameErrMsg = "";
      } else {
        this.usernameErrMsg = "用户名验证失败";
      }
    },
    //清用户名错误提示
    clearUsernameErrMsg() {
      this.usernameErrMsg = "";
    },
    //校验昵称
    checkNickname() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/;
      if (reg.test(this.nickname)) {
        this.nicknameErrMsg = "";
      } else {
        this.nicknameErrMsg = "昵称格式错误";
      }
    },
    //清昵称错误提示
    clearNicknameErrMsg() {
      this.nicknameErrMsg = "";
    },
    //校验密码
    checkPassword() {
      const reg = /^1\d{2,7}$/;
      if (reg.test(this.password)) {
        this.passwordErrMsg = "";
      } else {
        this.passwordErrMsg = "密码格式错误";
      }
    },
    //清密码错误提示
    clearPasswordErrMsg() {
      this.passwordErrMsg = "";
    },
    //注册事件
    async startRegister() {
      if (
        this.username &&
        this.nickname &&
        this.password &&
        !this.usernameErrMsg &&
        !this.nicknameErrMsg &&
        !this.passwordErrMsg
      ) {
        const res = await this.$axios.post("http://localhost:3000/register", {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
        });

        console.log(res);
        const { message, statusCode } = res.data;
        if (statusCode === 200) {
          this.$toast.success(message);
          this.$router.push({
            name: "/login",
            params: { username: this.username, password: this.password },
          });
        } else {
          this.$toast.fail(message);
        }
      } else {
        this.$toast.fail("校验失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  float: right;
  margin-right: 20px;
}
</style>
