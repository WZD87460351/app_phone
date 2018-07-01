<!--兑换成功-->
<template>
    <div class="main">
        <mt-header title="优惠券" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <div class="head-back">
                <div class="top-layer"></div>
                <div class="line-layer"></div>
                <div class="bottom-layer"></div>
                <div class="gold"></div>
                <div class="header-text" >请至【我的优惠券】查看</div>
                <div class="paper">
                    <div class="title">恭喜获得</div>
                    <div class='text'>
                        <i class='d1'></i>
                        <i class='d2'></i>
                        <p class='t1'>{{detail.couponname}}</p>
                    </div>
                    <i class='line'></i>
                    <i class='dot-top'></i>
                    <i class='dot-left'></i>
                    <i class='dot-right'></i>
                    <i class='dot-1'></i>
                    <i class='dot-2'></i>
                    <i class='dot-3'></i>
                    <i class='dot-4'></i>
                    <i class='dot-5'></i>
                    <i class='dot-6'></i>
                </div>
            </div>
            <div class="content">
                <div class="content-box">
                    <div class="content-top">
                        <div class="top-left">
                            <div class="top-left-left" v-if="detail.deduct > 0">
                                <div>￥</div>
                                <div>{{detail.deduct}}</div>
                            </div>
                            <div class="top-left-left" v-else>
                                <!--<div>{{detail.money}}</div>-->
                            </div>

                            <div class="top-left-right">
                                <div>{{detail.couponname}}</div>
                                <div>{{detail.title2}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="contents">
                      <div class="boxs">
                        <div class="shop-list" v-for="(v,i) in goods" :key="v.id" @click="kipDetail(v.id)">
                            <img :src="v.thumb" alt="" >
                            <div class="list-title">{{v.title}}</div>
                            <div class="list-price">￥{{v.minprice}}</div>
                            <div class="list-money"><span>￥{{v.couponprice}}</span><span>用券价</span></div>
                        </div>
                          
                        <div class="more" @click="kipDetailall">查看更多>></div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="bottom-btn">
                <!--<div>继续领取优惠券</div>-->
                <!--<div>查看我的优惠券</div>-->
                <router-link tag="div" :to="{name:'coupon'}">继续领取优惠券</router-link>
                <router-link tag="div" :to="{name:'couponList'}">查看我的优惠券</router-link>
            </div>
        </div>
        <transition name="slide">
          <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import util from "../../../api/util";
export default {
  data() {
    return {
      detail: [],
      goods: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    kipDetailall() {
      this.$router.push({ path: "/category/list" });
    },
    kipDetail(opt) {
      this.$router.push({ path: "/exchange/product", query: { id: opt } });
    },
    getDetail() {
      let that = this;
      //   console.log(that.$route.query)
      util.request({
        url: "sale.coupon.my.showcoupon2",
        method: "get",
        data: {
          id: that.$route.query.id
        },
        success: function(res) {
          // console.log(res);
          that.detail = res.data.detail;
          that.goods = res.data.goods;
        },
        error: function(error) {
          console.log(error);
        },
        complete: function() {}
      });
    },

  },
  components: {},
  mounted() {
    this.getDetail();
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
    .head-back {
      position: relative;
      height: 2.4rem;
      background: #fe5d5c;
      overflow: hidden;
      .top-layer {
        width: 0;
        height: 1.6rem;
        border-left: 4rem solid #f74a4a;
        border-right: 4rem solid #f74a4a;
        border-bottom: 0.5rem solid transparent;
        position: absolute;
        left: 50%;
        margin-left: -4rem;
        top: 0;
        z-index: 1;
      }
      .line-layer {
        width: 0;
        height: 1rem;
        border-left: 4rem solid #ffcf6f;
        border-right: 4rem solid #ffcf6f;
        border-top: 0.5rem solid transparent;
        position: absolute;
        left: 50%;
        margin-left: -4rem;
        bottom: 0;
        z-index: 3;
      }
      .bottom-layer {
        width: 0;
        height: 0.95rem;
        border-left: 4rem solid #fe5d5c;
        border-right: 4rem solid #fe5d5c;
        border-top: 0.5rem solid transparent;
        position: absolute;
        left: 50%;
        margin-left: -4rem;
        bottom: -0.01rem;
        z-index: 4;
      }
      .gold {
        height: 0.5rem;
        width: 0.5rem;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
        position: absolute;
        left: 50%;
        margin-left: -0.24rem;
        bottom: 0.25rem;
        z-index: 5;
      }
      .header-text {
        position: absolute;
        bottom: 0.79rem;
        left: 49%;
        z-index: 6;
        width: 1.8rem;
        text-align: center;
        font-size: 0.12rem;
        line-height: 0.02rem;
        color: #e47c48;
        margin-left: -0.9rem;
      }
      .paper {
        height: 1.6rem;
        width: 1.6rem;
        background: #fff;
        position: absolute;
        top: 0.4rem;
        left: 52%;
        margin-left: -0.9rem;
        z-index: 2;
        .title {
          line-height: 0.72rem;
          text-align: center;
          display: block;
          font-size: 0.24rem;
          color: #f74a4a;
        }
        .text {
          height: 0.8rem;
          left: 0.1rem;
          right: 0.1rem;
          top: 0.71rem;
          position: absolute;
          border: 1px solid #fad64f;
          text-align: center;
          display: block;
          .d1 {
            height: 0.14rem;
            width: 0.14rem;
            border-radius: 0.14rem;
            border-style: solid;
            border-color: #fad64f transparent transparent transparent;
            border-width: 1px;
            background: #fff;
            position: absolute;
            top: -0.08rem;
            left: -0.08rem;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
          }
          .d2 {
            height: 0.14rem;
            width: 0.14rem;
            border-radius: 0.14rem;
            border-style: solid;
            border-color: #fad64f transparent transparent transparent;
            border-width: 1px;
            background: #fff;
            position: absolute;
            top: -0.08rem;
            right: -0.08rem;
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
          }
          .t1 {
            font-size: 0.18rem;
            color: #eb3d3f;
            line-height: 0.29rem;
            padding-top: 0.08rem;
          }
        }
        .line {
          height: 0;
          position: absolute;
          top: 0.6rem;
          left: 0.1rem;
          right: 0.1rem;
          border-bottom: 1px dashed #d5d5d5;
        }
        .dot-top {
          height: 0.4rem;
          width: 0.4rem;
          border-radius: 0.4rem;
          position: absolute;
          top: -0.3rem;
          left: 50%;
          margin-left: -0.2rem;
          background: #f74a4a;
        }
        .dot-left {
          height: 0.14rem;
          width: 0.14rem;
          border-radius: 0.14rem;
          background: #f74a4a;
          position: absolute;
          top: 0.54rem;
          left: -0.07rem;
        }
        .dot-right {
          height: 0.14rem;
          width: 0.14rem;
          border-radius: 0.14rem;
          background: #f74a4a;
          position: absolute;
          top: 0.54rem;
          left: auto;
          right: -0.07rem;
        }
        .dot-1 {
          height: 0.12rem;
          width: 0.12rem;
          border-radius: 0.12rem;
          background: #f74a4a;
          position: absolute;
          top: -0.07rem;
          left: 0.06rem;
        }
        .dot-2 {
          height: 0.12rem;
          width: 0.12rem;
          border-radius: 0.12rem;
          background: #f74a4a;
          position: absolute;
          top: -0.07rem;
          left: 0.24rem;
        }
        .dot-3 {
          height: 0.12rem;
          width: 0.12rem;
          border-radius: 0.12rem;
          background: #f74a4a;
          position: absolute;
          top: -0.07rem;
          left: 0.42rem;
        }
        .dot-4 {
          height: 0.12rem;
          width: 0.12rem;
          border-radius: 0.12rem;
          background: #f74a4a;
          position: absolute;
          top: -0.07rem;
          left: auto;
          right: 0.42rem;
        }
        .dot-5 {
          height: 0.12rem;
          width: 0.12rem;
          border-radius: 0.12rem;
          background: #f74a4a;
          position: absolute;
          top: -0.07rem;
          left: auto;
          right: 0.24rem;
        }
        .dot-6 {
          height: 0.12rem;
          width: 0.12rem;
          border-radius: 0.12rem;
          background: #f74a4a;
          position: absolute;
          top: -0.07rem;
          left: auto;
          right: 0.06rem;
        }
      }
    }
    .bottom-btn {
      margin-top: 0.12rem;
      text-align: center;
      div {
        width: 90%;
        height: 0.4rem;
        line-height: 0.4rem;
        color: #ffffff;
        font-size: 0.14rem;
        text-align: center;
        border-radius: 0.06rem;
        margin-left: 5%;
      }
      div:first-child {
        background: #ef4f4f;
        margin-bottom: 0.08rem;
        box-sizing: border-box;
        border: 1px solid #ef4f4f;
      }
      div:last-child {
        background: #f7f7f7;
        color: #000;
        box-sizing: border-box;
        border: 1px solid #dfdfdf;
      }
    }
    .content {
      padding: 0.1rem;
      text-align: left;
      .content-box {
        height: auto;
        overflow: hidden;
        background: #fff;
        border-radius: 0.06rem;
        border: 1.5px solid #dcdcdc;
        padding: 0.1rem;
        .content-top {
          float: left;
          width: 100%;
          height: auto;
          border-bottom: 1px dashed #d5d5d5;
          padding-bottom: 0.1rem;
          .top-left {
            float: left;
            background: #ef4f4f;
            border-radius: 0.04rem;
            color: #ffffff;
            padding: 0.04rem;
            .top-left-left {
              float: left;
              div {
                float: left;
              }
              div:first-child {
                font-size: 0.12rem;
                position: relative;
                top: 0.18rem;
              }
              div:last-child {
                font-size: 0.3rem;
              }
            }
            .top-left-right {
              float: left;
              margin-left: 0.06rem;
              div:first-child {
                font-size: 0.16rem;
              }
              div:last-child {
                font-size: 0.1rem;
              }
            }
          }
        }
        .contents {
          float: left;
          margin-top: 0.1rem;
          overflow: hidden;
          overflow-x: scroll;
          height: 2.02rem;
          width: 100%;
          .boxs {
            float: left;
            width: 7.7rem;
            .shop-list:first-child {
              margin-left: 0 !important;
            }
            .shop-list {
              float: left;
              display: inline-block;
              width: 1.2rem;
              margin-left: 0.1rem;
              img {
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 0.06rem;
              }
              .list-title {
                font-size: 0.14rem;
                height: 0.38rem;
                overflow: hidden;
              }
              .list-price {
                font-size: 0.14rem;
                text-decoration: line-through;
                color: #d0d0d0;
              }
              .list-money {
                span:first-child {
                  font-size: 0.16rem;
                }
                span:last-child {
                  font-size: 0.14rem;
                  color: #ffffff;
                  background: #ef4f4f;
                  border-radius: 0.04rem;
                  padding: 0 0.04rem;
                }
              }
            }
            .more {
              border: 1px solid #d0d0d0;
              border-radius: 0.04rem;
              margin-left: 0.1rem;
              float: left;
              width: 1.2rem;
              height: 1.2rem;
              line-height: 1.2rem;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>