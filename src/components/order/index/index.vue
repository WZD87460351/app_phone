<template xmlns="">
    <div class="page">
        <mt-header id="Order-header" title="订单列表">
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--tab导航栏-->
        <top-bar id="Order-bar" ref="bar" :list="nav" :status="select" @change="getInitOrder" ></top-bar>
        <!-- <div class="container"> -->
        <!--tab列表-->
        <scroll-view id="Order-scroll" @loadMore="loadorder" :scrollHeight="scrollHeight" :loading="loading">
            <order-item v-for="(i,index) in list" :item="i" :key="index" @cancel="cancel" @confirm="confirm"
                        @remind="remind" @del="del" @logistic="logistic(i.id)" @router="goDetail"></order-item>
        </scroll-view>
        <mt-popup
                v-model="popupVisible"
                popup-transition="popup-fade">
            <img class="sharelogo" :src="qrimg"/>
        </mt-popup>
        <!-- </div> -->
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from "../../../api/util";
    import list from "./../../../assets/mixins/list";
    import order from "./../../../assets/mixins/order";
    // import listView from "@/components/common/view/listView";
    import ScrollView from "@/components/common/view/ScrollView";
    import orderItem from "./order.vue";
    import TopBar from "@/components/common/Tabbar/TopBar";
    import { MessageBox, Toast,Popup } from "mint-ui";

export default {
  data() {
    return {
      select: "",
      url: "order.op",
      scrollHeight: 400 /* 可滚动区域 */,
      loading: false /*是否能禁用更多加载功能 false：不禁用 ，true：禁用*/,
      nav: [
        {
          title: "全部",
          status: ""
        },
        {
          title: "待付款",
          status: "0"
        },
        {
          title: "待发货",
          status: "1"
        },
        {
          title: "待收货",
          status: "2"
        },
        {
          title: "已完成",
          status: "3"
        },
        {
          title: "退换货",
          status: "4"
        }
      ],
        popupVisible:false,
        qrimg:'',
    };
  },
  mixins: [list, order],
  methods: {
    getInitOrder(s) {
      // this.select = s;
      let params = {
        url: "order.get_list",
        opt: {
          status: s
        }
			};
			// this.getBarstatus(s)
      this.scrollTop("#Order-scroll")
        .then(this.listInit())
        .then(this.getList(params));
    },
    loadorder() {
      let _this = this;
      let params = {
        url: "order.get_list",
        opt: {
          status: _this.select
        }
      };
      this.loadMore(params);
    },
    logistic(id) {
      this.$router.push({ name: "logistics", query: { id: id ,name:0} });
    },
      goDetail(i){
          let _this=this
          util.request({
              url: 'verify.qrcode',
              method: 'post',
              data:{
                  id : i
              },
              success(res){
                  console.log('getcode success')
                  console.log(res)
                  _this.qrimg=res.data.url
                  _this.popupVisible=true
              }
          })
      },
    /* 获取可滚动区域的高度 */
    getScrollHeight() {
      let winHeight = document.body.clientHeight;
      let headerHeight = document.getElementById("Order-header").clientHeight;
      let barHeight = document.getElementById("Order-bar").clientHeight;
      let scrollHeight = winHeight - headerHeight - barHeight || 583;
      this.scrollHeight = scrollHeight;
		},
  },
  beforeRouteUpdate(to, from, next) {
    let _this = this;
    if (from.query.stal === 0) {
      this.getInitOrder(from.query.a);
    }
    next();
  },
  mounted() {
    this.getScrollHeight();
    this.getInitOrder(this.$route.query.status);
    if (this.$route.query.status === "") {
      this.$refs.bar.select = 0;
    } else {
      this.$refs.bar.select = this.$route.query.status/1 + 1;
    }
  },
  activated() {
    if (this.$route.query.status === "") {
      this.$refs.bar.select = 0;
    } else {
      this.$refs.bar.select = this.$route.query.status/1 + 1;
    }
    this.getInitOrder(this.$route.query.status);
  },

  components: {
    // listView,
    orderItem,
    TopBar,
    ScrollView
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/index.less";

.page {
  text-align: center;
  .page-view(1);
  .scroll-view(100%);
  background: #f7f7f7;
  .list {
    padding-bottom: 0.8rem;
  }
  .list .tab-list:last-child{
  	margin-bottom: 0.1rem;
  }
}
</style>