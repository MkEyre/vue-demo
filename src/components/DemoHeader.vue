<template>
  <div class="demo-header">
    <div class="left" @click="$router.back()">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="center"><slot></slot></div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.demo-header {
  height: 40px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  .left,
  .right {
    width: 40px;
  }
  .center {
    flex: 1;
    text-align: center;
    color: red;
  }
}
</style>
