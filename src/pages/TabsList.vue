<template>
  <div>
    <demo-header>栏目管理</demo-header>
    <div class="content">
      <div class="title">点击删除一下频道</div>
      <div class="box">
        <div class="outer" v-for="tab in tabsList" :key="tab.id">
          <div class="inner" @click="del(tab.id)">{{ tab.name }}</div>
        </div>
      </div>
      <div class="title">点击添加一下频道</div>
      <div class="box">
        <div class="outer" v-for="tab in nextTabsList" :key="tab.id">
          <div class="inner" @click="add(tab.id)">{{ tab.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsList: [],
      nextTabsList: [],
    };
  },
  created() {
    this.getTabsList();
  },
  methods: {
    async getTabsList() {
      const tabsList = localStorage.getItem("tabsList");
      const nextTabsList = localStorage.getItem("nextTabsList");
      if (tabsList && nextTabsList) {
        this.tabsList = JSON.parse(tabsList);
        this.nextTabsList = JSON.parse(nextTabsList);
        return;
      }
      const res = await this.$axios.get("/category");
      console.log(res);
      if (res.data.statusCode === 200) {
        this.tabsList = res.data.data;
      }
    },
    // 删除频道
    del(id) {
      const tab = this.tabsList.find((item) => item.id === id);
      this.nextTabsList.push(tab);
      this.tabsList = this.tabsList.filter((item) => item.id !== id);
    },
    // 添加频道
    add(id) {
      const tab = this.nextTabsList.find((item) => item.id === id);
      this.tabsList.push(tab);
      this.nextTabsList = this.nextTabsList.filter((item) => item.id !== id);
    },
  },
  watch: {
    tabsList(val) {
      localStorage.setItem("tabsList", JSON.stringify(val));
      localStorage.setItem("nextTabsList", JSON.stringify(this.nextTabsList));
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  .title {
    font-weight: 700;
  }
  .box {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0;
    .outer {
      width: 20%;
      box-sizing: border-box;
      padding: 5px;
      .inner {
        background-color: #ddd;
        height: 24px;
        text-align: center;
        line-height: 24px;
      }
    }
  }
}
</style>