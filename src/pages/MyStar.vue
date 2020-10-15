<template>
  <div>
    <demo-header>我的收藏</demo-header>
    <demo-post v-for="post in starList" :key="post.id" :post="post"></demo-post>
  </div>
</template>

<script>
export default {
  data() {
    return {
      starList: [],
    };
  },
  async created() {
    const res = await this.$axios.get("/user_star");
    console.log(res);
    if (res.data.statusCode === 200) {
      this.starList = res.data.data;
    }
  },
};
</script>

<style>
</style>