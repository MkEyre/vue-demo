<template>
  <div>
    <demo-header>我的跟帖</demo-header>
    <van-list
      v-model="loading"
      @load="onLoad"
      :immediate-check="false"
      :finished="finished"
      :offset="30"
      finished-text="数据已加载完毕"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <div class="date">{{ item.create_date | time("YYYY-MM-DD") }}</div>
        <div class="comment" v-if="item.parent">
          <div class="comment-user">回复: {{ item.parent.user.nickname }}</div>
          <div class="comment-content">{{ item.parent.content }}</div>
        </div>
        <div class="mycomment">{{ item.content }}</div>
        <div class="comment-article">
          <div class="article line1">
            {{ item.post.title }}
          </div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      pageIndex: 1,
      finished: false,
    };
  },
  created() {
    this.getCommentsList();
  },
  methods: {
    // 获取用户评论列表
    async getCommentsList() {
      const res = await this.$axios.get("/user_comments", {
        params: { pageIndex: this.pageIndex, pageSize: 3 },
      });
      // console.log(res);
      this.list = [...this.list, ...res.data.data];
      this.loading = false;
      // this.list = [...this.list, ...res.data.data];
      // this.loading = false;
      if (res.data.data.length < 3) {
        this.finished = true;
      }
    },
    onLoad() {
      // console.log("触底了");
      this.pageIndex++;
      this.getCommentsList();
    },
  },
  //onload事件
};
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  line-height: 30px;
  .date {
    color: #999;
  }
  .comment {
    background-color: #ddd;
    color: #999;
    height: 50px;
    line-height: 25px;
    padding: 10px;
    &-user {
      font-size: 12px;
    }
    &-content {
      font-size: 14px;
    }
  }
  .mycomment {
    font-size: 16px;
    padding-bottom: 5px;
  }
  .comment-article {
    display: flex;
    .article {
      flex: 1;
    }
    .iconfont {
      width: 30px;
      text-align: center;
    }
  }
}
</style>