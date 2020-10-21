<template>
  <div>
    <div class="homeHead">
      <div class="left"><i class="iconfont iconnew"></i></div>
      <div class="center">
        <i class="iconfont iconsearch"></i> <span>搜索新闻</span>
      </div>
      <div class="right" @click="hasLogin">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- tab栏右侧小三角部分 -->
    <van-sticky z-index="999">
      <div class="trigle" @click="$router.push('/tabsList')">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky>

    <!-- tab栏部分 -->
    <van-tabs v-model="active" sticky>
      <van-tab :title="tab.name" v-for="tab in tabsList" :key="tab.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 分页 -->
          <van-list
            v-model="loading"
            @load="onload"
            :immediate-check="false"
            :finished="finished"
            finished-text="加载完了……"
            offset="10"
          >
            <!-- demo-post组件 -->
            <demo-post
              v-for="post in postsList"
              :key="post.id"
              :post="post"
              @click.native="$router.push(`/detail/${post.id}`)"
            ></demo-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      active: 1,
      tabsList: [],
      postsList: [],
      loading: false,
      pageIndex: 1,
      pageSize: 5,
      finished: false,
      isLoading: false,
    };
  },
  created() {
    this.getTabsList();
  },
  methods: {
    //获取tab栏列表
    async getTabsList() {
      const res = await this.$axios.get("/category");
      console.log(res);
      if (res.data.statusCode === 200) {
        this.tabsList = res.data.data;
        this.getPostsList(this.tabsList[this.active].id);
      }
    },
    // 获取文章列表
    async getPostsList(id) {
      const res = await this.$axios.get("/post", {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      });

      if (res.data.statusCode === 200) {
        this.loading = false;
        this.isLoading = false;
        this.postsList = [...this.postsList, ...res.data.data];
        if (res.data.data.length < this.pageSize) {
          this.finished = true;
        }
      }
    },
    // 触底事件
    onload() {
      this.pageIndex++;
      this.getPostsList(this.tabsList[this.active].id);
    },
    //下拉刷新事件
    onRefresh() {
      // console.log(111);
      this.finished = false;
      this.loading = true;
      this.postsList = [];
      this.pageIndex = 1;
      this.getPostsList(this.tabsList[this.active].id);
    },
    // 点击我的触发的事件
    hasLogin() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      } else {
        this.$router.push("/user");
      }
    },
  },

  // 监听active
  watch: {
    active(newVal) {
      this.postsList = [];
      this.pageIndex = 1;
      this.finished = false;
      this.loading = true;
      this.getPostsList(this.tabsList[newVal].id);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-tabs__nav {
  background-color: #eee;
  margin-right: 40px;
}
// 右侧小三角部分
.trigle {
  position: absolute;
  right: 0;
  background-color: #eee;
  width: 40px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  z-index: 999;
}
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