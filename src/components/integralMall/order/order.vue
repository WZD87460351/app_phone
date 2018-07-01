<template>
  <div class="main">
    <mt-header id="order-header" title="订单列表">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container">
      <!--tab导航栏-->
      <v-tab id="order-tab" @change="tab" :select="select"></v-tab>
      <!--tab列表-->
      <scroll-view @loadMore="loadList" :scrollHeight="scrollHeight" :loading="loading" ref="selectfun">
        <Tab-item v-for="item in list" :key="item.id" :item ="item" @itemTap="itemHandle(item.id)"></Tab-item>
      </scroll-view>
      <!-- <v-tablist :list="list" :loading="loading" @loadmore="loadList"></v-tablist> -->
    </div>
    <v-tabbar id="order-tabbar"></v-tabbar>
    <transition name="slide">
      <router-view ></router-view>
    </transition>
  </div>
</template>
<script>
import util from "../../../api/util";
import list from "./../../../assets/mixins/list";
import vTabbar from "../../common/Tabbar/IntergalBar.vue";
import ScrollView from "../../common/view/ScrollView";
import vTab from "./tab";
import TabItem from "./tabitem";
import vTablist from "./tablist";
export default {
  data() {
    return {
      select: 0,
      list: [],
      loading: false /*是否能禁用更多加载功能 false：不禁用 ，true：禁用*/,
      scrollHeight: 400, /* 可滚动区域 */
    };
  },
  props: {},
  mixins: [list],
  methods: {
    tab(i) {
      this.select = i;
      this.loading = false
      this.getOrder();
    },
    getOrder() {
      let params = {
        url: "creditshop.log",
        opt: {
          status: this.select
        }
      };
      this.listInit().then(this.getList(params));
    },
    loadList() {
      let params = {
        url: "creditshop.log",
        opt: {
          status: this.select
        }
      };
      this.loadMore(params);
    },
    /* 获取可滚动区域的高度 */
    getScrollHeight() {
      let winHeight = window.innerHeight;
      let headerHeight = document.getElementById("order-header").clientHeight;
      let tabHeight = document.getElementById("order-tab").clientHeight;
      let orderTabbar = document.querySelector("#order-tabbar .mint-tabbar")
        .clientHeight;
      let scrollHeight =
        winHeight - headerHeight - tabHeight - orderTabbar||
        534;
        // console.log(scrollHeight)
      this.scrollHeight = scrollHeight;
    },
      itemHandle(id){
        this.$router.push({name:'integralDetail',query:{id:id}})
      }
  },
  mounted() {
    this.getScrollHeight();
    this.getOrder();
  },
  components: {
    vTabbar,
    vTab,
    vTablist,
    ScrollView,
    TabItem
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/index.less";
.main {
  .page-view(1);
  .container {
    .scroll-view(100%);
  }
}
</style>