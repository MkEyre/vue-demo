<template>
  <div>
    <!-- 视频部分 -->
    <div class="vedio-img" v-if="post.type === 2">
      <div class="title line2">{{ post.title }}</div>
      <div class="img">
        <img :src="checkUrl(post.cover[0].url)" alt="" />
        <div class="mask">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="comment">
        <span>{{ post.user.nickname }}</span>
        <span class="comment-count"
          >{{
            post.comments ? post.comments.length : post.comment_length
          }}跟帖</span
        >
      </div>
    </div>
    <!-- 单张图 -->
    <div class="single-img" v-else-if="post.cover.length < 3">
      <div class="left">
        <div class="title line2">{{ post.title }}</div>
        <div class="comment">
          <span>{{ post.user.nickname }}</span>
          <span class="comment-count"
            >{{
              post.comments ? post.comments.length : post.comment_length
            }}跟帖</span
          >
        </div>
      </div>
      <div class="img">
        <img :src="checkUrl(post.cover[0].url)" alt="" />
      </div>
    </div>
    <!-- 多张图部分 -->
    <div class="multi-img" v-else>
      <div class="title line2">{{ post.title }}</div>
      <div class="img">
        <img :src="checkUrl(post.cover[0].url)" alt="" />
        <img :src="checkUrl(post.cover[1].url)" alt="" />
        <img :src="checkUrl(post.cover[2].url)" alt="" />
      </div>
      <div class="comment">
        <span>{{ post.user.nickname }}</span>
        <span class="comment-count"
          >{{
            post.comments ? post.comments.length : post.comment_length
          }}跟帖</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    checkUrl(url) {
      if (url.startsWith("http")) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.single-img,
.vedio-img,
.multi-img {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
.comment {
  color: #999;
  &-count {
    margin-left: 10px;
  }
}
//单张图片部分样式
.single-img {
  display: flex;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img {
    img {
      width: 80px;
      height: 60px;
      object-fit: cover;
    }
  }
}
//视频图片部分样式
.vedio-img {
  .img {
    padding: 5px;
    position: relative;
    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
    }
    .mask {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.4);
      text-align: center;
      line-height: 60px;
      .iconfont {
        color: #fff;
        font-size: 40px;
      }
    }
  }
}
// 多张图片部分样式
.multi-img {
  .img {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    img {
      width: 110px;
      height: 80px;
      object-fit: cover;
    }
  }
}
</style>