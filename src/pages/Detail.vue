<template>
  <div>
    <div class="deatilHeader">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center"><i class="iconfont iconnew"></i></div>
      <div class="right">
        <div
          class="follow"
          v-if="postDetail.has_follow"
          @click="unUserFollows(postDetail.user.id)"
        >
          已关注
        </div>
        <div class="unfollow" v-else @click="userFollows(postDetail.user.id)">
          关注
        </div>
      </div>
    </div>
    <div class="detail">
      <!-- 标题部分 -->
      <div class="title">{{ postDetail.title }}</div>
      <!--用户信息部分  -->
      <div class="user">
        <span> {{ postDetail.user.nickname }}</span>
        <span class="date">{{
          postDetail.user.create_date | time("YYYY-MM-DD")
        }}</span>
      </div>
      <video
        :src="postDetail.content"
        v-if="postDetail.type === 2"
        controls
      ></video>

      <!-- 文章内容部分 -->
      <div class="content" v-else v-html="postDetail.content"></div>
      <!-- 点赞部分 -->
      <div class="likePart">
        <div
          class="like"
          :class="{ active: postDetail.has_like }"
          @click="like(postDetail.id)"
        >
          <i class="iconfont icondianzan"></i><span>1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postDetail: {
        user: {},
      },
    };
  },
  created() {
    // console.log(this.$route.params.id);
    this.getPostDetail();
  },
  methods: {
    //获取文章详情
    async getPostDetail() {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`);
      // console.log(res);
      if (res.data.statusCode === 200) {
        this.postDetail = res.data.data;
      }
    },
    // 取消关注
    async unUserFollows(id) {
      // 判断有没有登录
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({
          name: "/login",
          params: {
            back: true,
          },
        });
        return;
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`);
      // console.log(res);
      this.$toast.success(res.data.message);
      this.getPostDetail();
    },
    // 关注用户
    async userFollows(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({
          name: "/login",
          params: {
            back: true,
          },
        });
        return;
      }
      const res = await this.$axios.get(`/user_follows/${id}`);
      // console.log(res);
      this.$toast.success(res.data.message);
      this.getPostDetail();
    },
    //点赞部分
    async like(id) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({
          name: "/login",
          params: {
            back: true,
          },
        });
        return;
      }
      const res = await this.$axios.get(`/post_like/${id}`);
      console.log(res);
      this.$toast.success(res.data.message);
      this.getPostDetail();
    },
  },
};
</script>

<style lang="less" scoped>
.deatilHeader {
  height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .left {
    width: 30px;
    text-align: center;
  }
  .center {
    flex: 1;

    .iconfont {
      font-size: 50px;
    }
  }
  .right {
    width: 80px;
    .follow,
    .unfollow {
      width: 60px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
  }
}
.detail {
  padding: 10px;
  .title {
    font-weight: 700;
    margin: 10px 0 20px;
  }
  .user {
    color: #999;
    padding: 10px 0;
    .date {
      margin-left: 10px;
    }
  }
  video {
    width: 100%;
  }
  .likePart {
    display: flex;
    justify-content: flex-end;
    .like {
      margin: 10px 0;
      width: 50px;
      height: 20px;
      border: 1px solid #999;
      border-radius: 13px;
      text-align: center;
      span {
        margin-left: 5px;
      }
    }
    .like.active {
      .iconfont {
        color: #f00;
      }
    }
  }
}
</style>