<template>
  <div>
    <demo-header>编辑资料</demo-header>
    <div class="head_img">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <van-cell-group>
      <!-- 昵称部分 -->
      <van-cell title="昵称" @click="nicknameDialog" :value="info.nickname" />
      <!-- <van-cell title="密码" value="****" /> -->
      <van-field
        v-model="info.password"
        input-align="right"
        type="password"
        label="密码"
      />
      <!-- 性别部分 -->
      <van-cell
        title="性别"
        @click="genderDialog"
        :value="info.gender === 1 ? '男' : '女'"
      />
    </van-cell-group>

    <!-- 修改昵称弹窗 -->
    <van-dialog
      v-model="nicknameDialogShow"
      title="修改昵称"
      @confirm="changeNickname"
      show-cancel-button
    >
      <van-field v-model="nickname" />
    </van-dialog>
    <!-- 修改性别弹窗 -->
    <van-dialog
      v-model="genderDialogShow"
      title="修改性别"
      @confirm="changeGender"
      show-cancel-button
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 2">
            <template #right-icon>
              <van-radio :name="2" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
      nicknameDialogShow: false,
      nickname: "",
      genderDialogShow: false,
      gender: 0,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    //获取用户信息请求
    async getUserInfo() {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios.get(`/user/${user_id}`);
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.info = data;
      }
    },
    nicknameDialog() {
      this.nicknameDialogShow = true;
      this.nickname = this.info.nickname;
    },
    changeNickname() {
      if (this.nickname === this.info.nickname) {
        return;
      }
      this.editInfo({ nickname: this.nickname });
    },
    genderDialog() {
      this.genderDialogShow = true;
      this.gender = this.info.gender;
    },
    changeGender() {
      if (this.gender === this.info.gender) {
        return;
      }
      this.editInfo({ gender: this.gender });
    },
    //封装的发送编辑请求的函数
    async editInfo(data) {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios.post(`/user_update/${user_id}`, data);
      const { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.getUserInfo();
        this.$toast.success(message);
      }
    },
    //文件上传之后触发的函数
    async afterRead(file) {
      // console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await this.$axios.post("/upload", formData);
      // console.log(res);
      const { statusCode, message, data } = res.data;
      if (statusCode === 200) {
        this.editInfo({ head_img: data.url });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.head_img {
  position: relative;
  height: 100px;
  text-align: center;
  padding-top: 20px;
  img {
    widows: 80px;
    height: 80px;
    object-fit: cover;
  }
  .uploader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>