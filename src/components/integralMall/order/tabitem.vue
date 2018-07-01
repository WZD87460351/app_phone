<template>
<li class="list" @click="itemHandle">
    <!-- <router-link :to="{name:'integralDetail',query:{id:v.id}}" class="list" v-for="(v,i) in list" :key="i"  tag="div"> -->
  <div class="top">
    <div class="order-id">订单号：{{item.logno}}</div>
    <div class="order-status">{{item.status_name}}</div>
  </div>
  <div class="good-box">
    <img :src="item.thumb" alt="">
    <div class="good-title">
      <span :class="[{lucky : item.type_name == '抽奖'},{acts : item.type_name == '兑换'}]">{{item.goodstype_name}}</span>
      {{item.title}}
    </div>
    <div class="inter">{{item.credit}}积分</div>
  </div>
    <!-- </router-link> -->
</li>
</template>

<script>
export default {
  data() {
    return {
      scrollHeight: ""
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    // loading: {
    //   type: Boolean,
    //   required: true
    // }
  },
  mounted() {
  },
  methods: {
    loadMore() {
      this.$emit("loadmore");
    },
    itemHandle() {
      this.$emit("itemTap");
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/index.less";
// .list-box {
//   padding-bottom: 0.5rem;
//   margin-top: 0.85rem;
  .list {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    border-top: 0.1rem solid #f7f7f7;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem;
      border-bottom: @border;
      .order-id {
        font-size: 13px;
      }
      .order-status {
        font-size: 13px;
        color: #ff8000;
      }
    }
    .good-box {
      padding: 0.1rem;
      display: flex;
      align-items: center;
      > img {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.1rem;
      }
      .good-title {
        flex: 1;
        text-align: left;
        font-size: 14px;
        span {
          font-size: 10px;
          background: @themeColor;
          padding: 0.01rem 0.03rem;
          margin-right: 0.03rem;
          color: #fff;
        }
        .lucky {
          background: #ff8000;
        }
        .acts {
          background: #0290be;
        }
      }
      .inter {
        font-size: 14px;
        color: @themeColor;
      }
    }
  }
// }
</style>
