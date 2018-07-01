<!--列表 -->
<template>
  <div class="scroll-wapper"  :style="{height: scrollHeight + 'px'}" id="scroll-ul">
    <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
		  <slot>
        <div class="tip">
            <div class="logo">
                <img v-if="tip.img" :src="tip.img"/>
                <span v-if="tip.icon" class="iconfont" v-html="tip.icon"></span>
            </div>
            <p>{{tip.title}}</p>
            <button v-if="tip.btn" @click="go">{{tip.btn}}</button>
        </div>
			</slot>
	  </ul>
  </div>
</template>

<script>
import { InfiniteScroll, Indicator } from "mint-ui";
import defaultImg from "../../../assets/images/good-tip.png";

export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    loadMore() {
      this.loadingHandle();
      this.$emit("loadMore");
    },
    loadingHandle() {
      Indicator.open({
        text: "加载中",
        spinnerType: "fading-circle"
      });
    },
    // scrollTop() {
    //   // console.log(this.$el.querySelector(".scroll-wapper"))
    // }
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    },
    tip: {
      type: Object,
      default() {
        return {
          img: defaultImg,
          title: "暂时没有哦！",
          btn: ""
        };
      }
    },
    scrollHeight: {
      type: Number,
      default() {
        return 500;
      }
    }
  }
};
</script>

<style lang="less" scoped="">
@import "../../../assets/less/index.less";
.scroll-wapper {
  overflow: scroll;
  margin-top: -1px;
}

.list {
  width: 100%;
  .tip {
    margin: 0 auto;
    .logo {
      width: 1.6rem;
      /* height: .76rem; */
      margin: 0.5rem auto 0.1rem;
      img {
        width: 100%;
        height: 100%;
      }
      .iconfont {
        display: block;
        width: 100%;
        height: 100%;
        /*font-size: 1rem;*/
        font-size: 0.15rem;
      }
    }
    p {
      font-size: 0.16rem;
      width: 100%;
      color: #bbbbbb;
    }
    button {
      width: 0.7rem;
      height: 0.35rem;
      border-radius: 0.03rem;
      margin-top: 0.15rem;
      background: #ff4f4f;
      outline: none;
      color: #ddd;
    }
  }
}
</style>
