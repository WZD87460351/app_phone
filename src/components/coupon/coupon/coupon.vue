<template>
    <div class="main">
        <mt-header id="coupon-header" title="优惠券" fixed>
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <top-bar id="coupon-bar" :list="cates" @change="init"></top-bar>
            <!-- <list-view :loading="loading" @loadMore="loadList">
                <item :item="list"></item>
            </list-view> -->
            <scroll-view :loading="loading" @loadMore="loadList" :scrollHeight="scrollHeight" >
                <item :item="list"></item>
            </scroll-view>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import util from "../../../api/util";
import list from "./../../../assets/mixins/list";
// import topBar from '@/components/common/Tabbar/TopBar'
import topBar from "./topbar";
import listView from "@/components/common/view/listView";
import ScrollView from "@/components/common/view/ScrollView";
import item from "./item";

export default {
  data() {
    return {
      cates: [], //tab
      cate: 0,
      scrollHeight: 0 /* 可滚动高度 */,
      list: [] /* 列表数据 */,
      loading: false
    };
  },
  mixins: [list],
  methods: {
    getCate() {
      let _this = this;
      util.request({
        url: "sale.coupon.getCouponCate",
        data: {},
        method: "get",
        success(res) {
          //   console.log(res)
          res.data.list && (_this.cates = res.data.list);
        }
      });
    },
    loadList() {
      let params = {
        url: "sale.coupon.getlist",
        cate: this.cate
      };
      this.loadMore(params);
    },
    init(status) {
      this.cate = status;
      let params = {
        url: "sale.coupon.getlist",
        opt: {
          cate: this.cate
        }
      };
      this.listInit()
        .then(this.scrollTop(".container"))
        .then(this.getList(params));
    },
    /* 获取可滚动区域的高度 */
    getScrollHeight() {
	    let winHeight = window.innerHeight;
      let headerHeight = document.getElementById("coupon-header").clientHeight;
      let barHeight = document.getElementById("coupon-bar").clientHeight;
      let scrollHeight = winHeight - headerHeight - barHeight || 583;
      this.scrollHeight = scrollHeight;
    }
  },
  components: {
    topBar,
    listView,
    item,
    ScrollView
  },
  mounted() {
    this.getScrollHeight();
    this.getCate();
    this.init(0);
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/index.less";

.main {
  .page-view(100);
  .container {
    .scroll-view(100%);
    .header-height;
  }
}
</style>