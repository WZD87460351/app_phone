<!--优惠券详情-->
<template>
    <div class="main">
        <mt-header title="优惠券" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <div class="top">
                <div class="top-first">
                    <div>{{detail.name}}</div>
                    <div>有效期: {{detail.usestr}} {{detail.merchstr}}</div>
                </div>
                <div class="top-btn">
                    <div class="btn-text">{{detail.title2}}{{detail.title3}}</div>
                    <!--<div class="btns"><div>{{buying?"操作中...":detail.getstr}}</div></div>-->
                    <div class="btns" @click="postConfirm"><div>{{detail.getstr}}</div></div>
                </div>
                <div class="top-bottom">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
        </div>
            <div class="box">
                <div class="box-content">
                    <div class="list" v-if='detail.money > 0 || detail.credit > 0'>
                        <div>购买价格</div>
                        <div>{{detail.money}}元{{detail.money > 0 && detail.credit > 0?"+":""}}{{detail.credit}}积分</div>
                    </div>
                    <div class="list">
                        <div>领取限制</div>
                        <div v-if="detail.islimitlevel == 1">
                            <div>用户必须达到以下条件之一:</div>
                            <div v-if='detail.limitmemberlevels'>{{detail.limitmemberlevels}}</div>
                            <div class='text' v-if="detail.limitagentlevels">{{detail.limitagentlevels}}</div>
                            <div class='text' v-if="detail.limitpartnerlevels">{{detail.limitpartnerlevels}}</div>
                            <div class='text' v-if="detail.limitaagentlevels">{{detail.limitaagentlevels}}</div>
                        </div>
                        <div class='text' v-else>无</div>
                    </div>
                    <div class="list">
                        <div>有效期限</div>
                        <div>{{detail.usestr}} {{detail.merchstr}}</div>
                    </div>
                    <div class="list">
                        <div>使用说明</div>
                        <div class='text wxParse' v-if="detail.desc != ''">暂无</div>
                        <div class='text' v-else>无</div>
                    </div>
                    <div class="list">
                        <div class='title'>使用限制</div>
                        <div class='text' v-if="detail.coupontype == 2">本优惠卷只能在收银台中使用</div>
                        <div class='text' v-if="detail.limitdiscounttype == 1">不允许与促销优惠同时使用</div>
                        <div class='text' v-if="detail.limitdiscounttype == 2">不允许与会员折扣同时使用</div>
                        <div class='text' v-if="detail.limitdiscounttype == 3">不允许与促销优惠和会员折扣同时使用</div>
                        <div class='text' v-if="detail.limitgoodtype == 1">
                            <div class='text'>允许以下商品使用:</div>
                            <div class='text' v-for="(v,i) in limitgoods" :key="v.title">{{v.title}}</div>
                        </div>
                        <div class='text' v-if="detail.limitgoodcatetype == 1">
                            <div class='text'>允许以下商品分类使用:</div>
                            <div class='text' v-for="(v,i) in limitcates" :key="i">{{v.name}}</div>
                        </div>
                        <div v-if="detail.limitgoodtype == 0 && detail.limitgoodcatetype == 0 && detail.limitdiscounttype == 0 && detail.coupontype != 2">无</div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import util from "../../../api/util";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      detail: [],
      logid: 0,
      dataid: 0,
      limitgoods: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getDetail() {
      let that = this;
      util.request({
        url: "sale.coupon.getdetail",
        method: "get",
        data: {
          id: that.$route.query.id
        },
        success: function(res) {
          0 === res.data.error &&
            ((that.detail = res.data.detail),
            (that.limitgoods = res.data.detail.limitgoods),
            (that.limitcates = res.data.detail.limitcates));
        }
      });
    },

    postConfirm() {
      let that = this;
      util.request({
        url: "sale.coupon.pay",
        method: "post",
        data: {
          id: that.$route.query.id
        },
        success: function(res) {
          that.logid = res.data.logid;
          that.getLogid(res.data.logid);
        },
        error: function(error) {
          Toast({
            message: error.message,
            position: "middle",
            duration: 2000
          });
        },
        complete: function() {}
      });
    },
    getLogid(logid) {
      let that = this;
      util.request({
        url: "sale.coupon.payresult",
        method: "get",
        data: {
          id: that.$route.query.id,
          logid
        },
        success: res => {
          that.dataid = res.data.dataid;
          this.$router.push({
            name: "exchange",
            query: { id: res.data.dataid }
          });
        },
        error: function(error) {
          console.log(error);
        },
        complete: function() {}
      });
    }
  },
  components: {},
  mounted() {
    this.getDetail();
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/common.less";
.main {
  .page-view(100);
  .container {
    .scroll-view(100%);
    .header-height;
    .top {
      background: #ff6c00;
      text-align: center;
      color: #fff;
      padding: 0.2rem 0;
      padding-bottom: 0;
      .top-first {
        padding-bottom: 0.2rem;
        border-bottom: 1px dashed #fff;
        div:first-child {
          font-weight: 600;
          font-size: 0.18rem;
        }
        div:last-child {
          font-size: 0.14rem;
        }
      }
      .top-btn {
        padding: 0.2rem;
        .btn-text {
          font-size: 0.2rem;
          font-weight: 600;
        }
        .btns {
          margin-top: 0.04rem;
          text-align: center;
          div {
            display: inline-block;
            padding: 0.05rem 0.4rem;
            border: 0.04rem solid #7f3600;
            border-radius: 0.4rem;
            background: #fff;
            color: #ff6c00;
          }
        }
      }
      .top-bottom {
        height: 0.15rem;
        position: relative;
        display: flex;
        overflow: hidden;
        span {
          width: 0.15rem;
          height: 0.15rem;
          background: #ffffff;
          border-radius: 0.15rem;
          margin-left: 0.065rem;
          position: relative;
          top: 0.08rem;
        }
      }
    }
    .box {
      padding: 0.2rem;
      .box-content {
        border: 1px solid #dcdcdc;
        border-radius: 0.06rem;
        > .list:last-child {
          border-bottom: none !important;
        }
        .list {
          padding: 0.2rem;
          text-align: left;
          border-bottom: 1px dashed #dfdfdf;
          > div:first-child {
            font-weight: 600;
            color: #000;
            font-size: 0.14rem;
            margin-bottom: 0.04rem;
          }
          > div:last-child {
            font-size: 0.14rem;
            color: #8f8f8f;
            > div:first-child {
              color: #000;
            }
            > div {
              font-size: 0.14rem;
            }
          }
        }
      }
    }
  }
}
</style>