<template>
  <div>
    <div class="homeHead">
      <div class="left"><i class="iconfont iconnew"></i></div>
      <div class="center">
        <i class="iconfont iconsearch"></i> <span>搜索新闻</span>
      </div>
      <div class="right">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.homeHead {
  height: 40px;
  background-color: red;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 5px;
  color: #fff;
  .center {
    flex: 1;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    span {
      margin-left: 8px;
    }
  }
  .left {
    width: 40px;
    .iconnew {
      font-size: 40px;
    }
  }
  .right {
    width: 40px;
    .iconwode {
      font-size: 20px;
    }
  }
}
</style>