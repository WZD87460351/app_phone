<template>
    <div class="main">
        <mt-header id="couponList-header" title="我的优惠券">
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <top-bar id="couponList-bar" :list="nav" @change="init"></top-bar>
            <router-link id="couponList-title" :to="{path:'coupon'}" tag="div" class="title"><span class="iconfont">&#xe6ce;</span><span>赶紧去领券中心看看更多优惠券~</span></router-link>
            <!-- <list-view :loading="loading" @loadMore="loadList">
                <item :item="v" v-for="(v,i) in list" :key="i"></item>
            </list-view> -->
            <scroll-view :loading="loading" @loadMore="loadList" :scrollHeight="scrollHeight" >
                <item :item="v" v-for="(v,i) in list" :key="i"></item>
            </scroll-view>
        </div>
    </div>
</template>

<script>
import util from "../../../api/util";
import list from "./../../../assets/mixins/list";
import topBar from "@/components/common/Tabbar/TopBar";
// import listView from "@/components/common/view/listView";
import ScrollView from "@/components/common/view/ScrollView";
import item from "./item";

export default {
  data() {
    return {
      nav: [
        {
          title: "未使用",
          status: "",
          cate: ""
        },
        {
          title: "已使用",
          status: 0,
          cate: "used"
        },
        {
          title: "已过期",
          status: 1,
          cate: "past"
        }
      ],
      cate: "",
      info: [],
      scrollHeight: 0,
      loading: false
    };
  },
  mixins: [list],
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loadList() {
      let params = {
        url: "sale.coupon.my.getlist",
        cate: this.cate
      };
      this.loadMore(params);
    },
    init(status) {
      this.cate = "";
      if (status == "") {
        this.cate = "";
      }
      if (status === 0) {
        this.cate = "used";
      }
      if (status === 1) {
        this.cate = "past";
      }
    //   console.log("cate", this.cate);
      let params = {
        url: "sale.coupon.my.getlist",
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
      let headerHeight = document.getElementById("couponList-header").clientHeight;
      let barHeight = document.getElementById("couponList-bar").clientHeight;
      let titleHeight = document.getElementById("couponList-title").clientHeight;
      let scrollHeight = winHeight - headerHeight - barHeight - titleHeight || 546;
      this.scrollHeight = scrollHeight;
    }
  },
  components: {
    topBar,
    // listView,
    item,
    ScrollView
  },
  mounted() {
    this.getScrollHeight()
    this.init("");
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
    .title {
      border: #333 solid 1px;
      margin: 0.1rem;
      padding: 0.08rem;
      border-radius: 0.05rem;
      span {
        font-size: 0.15rem;
      }
      .iconfont {
        color: #999;
        margin-right: 0.03rem;
      }
    }
  }
}
</style>