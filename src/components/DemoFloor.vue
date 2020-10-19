<template>
  <div>
    <demo-floor v-if="parent.parent" :parent="parent.parent"></demo-floor>
    <div class="demo-floor">
      <div class="head">
        <div class="left">
          <span class="floor">{{ floorCount(1, parent) }}楼</span>
          <span>{{ parent.user.nickname }}</span>
        </div>
        <div class="center">{{ parent.create_date }}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">{{ parent.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["parent"],
  methods: {
    floorCount(num, parent) {
      if (parent.parent) {
        return this.floorCount(num + 1, parent.parent);
      } else {
        return num;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.demo-floor {
  border: 1px solid #ccc;
  line-height: 20px;
  margin-top: -1px;
  .head {
    display: flex;
    padding: 5px;
    .left {
      flex: 1;
      .floor {
        margin-right: 5px;
      }
    }

    .center {
      flex: 3;
      color: #999;
    }
    .right {
      width: 30px;
    }
  }
  .content {
    padding: 5px;
  }
}
</style>