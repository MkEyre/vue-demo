<template>
  <div>
    <demo-header>我的关注</demo-header>
    <div class="content">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="date">
            {{ item.create_date | time("YYYY-MM-DD") }}
          </div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    // this.addFollowList();
    this.getFollowList();
  },
  methods: {
    //封装获取关注列表的函数
    async getFollowList() {
      const res = await this.$axios.get("/user_follows");
      // console.log(res);
      this.list = res.data.data;
      // console.log(this.list);
    },
    // 虚拟关注用户
    async addFollowList() {
      const res = await this.$axios.get("user_follows/5");
      // console.log(res);
    },
    //取消关注
    async unfollow(id) {
      await this.$dialog.confirm({
        title: "温馨提示",
        message: "确认要取消关注吗？",
      });
      const res = await this.$axios.get(`/user_unfollow/${id}`);
      this.getFollowList();
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  height: 100px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 20px;
  .left {
    img {
      width: 60px;
      height: 60px;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    height: 50px;
    line-height: 25px;
    .nickname {
      font-size: 14px;
    }
    .date {
      color: #999;
    }
  }
  .right {
    padding: 8px 15px;
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>