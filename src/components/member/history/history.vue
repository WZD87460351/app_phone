<template>
    <div class="main">
        <mt-header id="history-header" title="我的足迹">
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <scroll-view :scrollHeight="scrollHeight" :loading="loading" @loadMore="loadList">
                <list-block v-for="(v,i) in list" :key="i" :item="v" :checkShow="checkShow" jumpTo="product" @chooseCheck="chooseCheck(v,i)" ></list-block>
            </scroll-view>
            <div id="history-btm-action" class="btm-action">
                <label class="mint-checklist-label fl" v-if="checkShow">
                    <span class="mint-checkbox fl">
                        <input type="checkbox" class="mint-checkbox-input" value="当前值" :checked="isTrue" @click="allCheckBox">
                        <span class="mint-checkbox-core"></span>
                    </span>
                    <span class="mint-checkbox-label">全选</span>
                </label>
                <div></div>
                <div class="btn">
                    <span v-if="checkShow" @click="dele">删除</span>
                    <span v-if="checkShow" class="finish" @click="showBtn">完成</span>
                    <span v-if="!checkShow" @click="showBtn">编辑</span>
                </div>
            </div>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { Checklist, MessageBox, Toast } from "mint-ui";
import util from "../../../api/util";
import list from "./../../../assets/mixins/list";
import listBlock from "../favorite/listBlock";
import ScrollView from "../../common/view/ScrollView.vue";

import Vue from "vue";
export default {
  data() {
    return {
      isTrue: false, //全选状态
      checkShow: false, //是否显示单选按钮
      scrollHeight: 400 /* 可滚动区域 */,
      loading: false /* 是否能继续加载 false：能，true：不能*/
    };
  },
  mixins: [list],
  methods: {
    init() {
      let params = {
        url: "member.history.get_list",
        opt: {
          pszie: 5
        }
      };
      this.listInit().then(
        this.getList(params).then(() => {
          this.list.forEach((i, index) => {
            this.$set(this.list[index], "checked", false);
          });
        })
      );
    },
    loadList() {
      let params = {
        url: "member.history.get_list",
        opt: {
          pszie: 5
        }
      };
      this.loadMore(params).then(res => {
        this.list.map((i, index) => {
          if (!i.checked) {
            this.$set(this.list[index], "checked", false);
          }
        });
      });
    },
    allCheckBox() {
      // let _this = this;
      this.isTrue = !this.isTrue;
      this.list.map((v, i, arr) => {
        v.checked = this.isTrue;
        Vue.set(this.list[i], i, arr[i]);
      });
    },
    showBtn() {
      this.checkShow = !this.checkShow;
      if (this.checkShow == false) {
        this.isTrue = false;
        this.list.map((v, i, arr) => {
          v.checked = false;
        });
      }
    },
    chooseCheck(v, i) {
      //单选
      let b = this.list[i].checked;
      let obj = this.list[i];
      obj.checked = !b;
      this.$set(this.list, i, obj);
      let all = this.list.every((item, index, arr) => {
        if (arr[index].checked === true) {
          return true;
        } else {
          return false;
        }
      });
      if (all == true) {
        this.isTrue = true;
      } else {
        this.isTrue = false;
      }
    },
    dele() {
      let ids = [];
      this.list.map((v, i, arr) => {
        if (arr[i].checked) ids.push(v.id);
      });
      if (ids.length > 0) {
        MessageBox({
          title: "确认要删除此商品吗?",
          message: "点击确认删除",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            //表示点击了确定
            let _this = this;
            util.request({
              url: "member.history.remove",
              data: {
                ids: ids
              },
              method: "post",
              success(res) {
                Toast({
                  message: "删除成功",
                  position: "middle",
                  duration: 2000
                });
                _this.isTrue = false;
                _this.init();
              }
            });
          } else if (action == "cancel") {
            //表示点击了取消
            console.log("点击了取消");
          }
        });
      } else {
        Toast({
          message: "请先选择足迹哦",
          position: "middle",
          duration: 2000
        });
        return false;
      }
    },
    goLink(opt) {
      let params = {
        id: opt.id
      };
      !this.checkShow &&
        this.$router.push({ path: "/history/product", query: params });
    },
    /* 获取当前课滚动区域 */
    getScrollHeight() {
      let winHeight = window.innerHeight;
      let headerHeight = document.getElementById("history-header").clientHeight;
      let btmHeight = document.getElementById("history-btm-action")
        .clientHeight;
      let scrollHeight = winHeight - headerHeight - btmHeight;
      this.scrollHeight = scrollHeight || 579;
    }
  },
  components: {
    listBlock,
    // listView,
    ScrollView
  },
  mounted() {
    this.getScrollHeight();
    this.init();
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
    .btm-action {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: @border;
      background: #fff;
      .btn {
        span {
          height: 0.28rem;
          line-height: 0.28rem;
          border: #999 solid 1px;
          border-radius: 0.06rem;
          color: #999;
          font-size: 0.14rem;
          padding: 0.03rem 0.12rem;
          margin-right: 0.05rem;
        }
        .finish {
          border: @themeColor solid 1px;
          color: #fff;
          background: @themeColor;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>