<template>
  <div class="demo-comment">
    <div class="head">
      <div class="left">
        <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="" />
      </div>
      <div class="center">
        <p>{{ comment.user.nickname }}</p>
        <p class="date">{{ comment.create_date }}</p>
      </div>
      <div class="right">回复</div>
    </div>
    <demo-floor v-if="comment.parent" :parent="comment.parent"></demo-floor>
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
};
</script>

<style lang="less" scoped>
.demo-comment {
  border-bottom: 1px solid #ccc;
  padding: 15px;

  .head {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .left {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
    .center {
      flex: 1;
      height: 50px;
      line-height: 25px;
      padding-left: 20px;
      .date {
        color: #999;
      }
    }
    .right {
      width: 40px;
      color: #999;
    }
  }
  .content {
    padding-top: 10px;
  }
}
</style>