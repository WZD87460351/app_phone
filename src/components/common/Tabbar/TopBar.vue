<template>
    <div class="title-tab">
        <div v-for="(i,index) in list" :class="['cell',{'active':index == select}]"  :key="i.title" :mode="select" @click="tab(index,i.status)">{{i.title}}</div>
    </div>
</template>

<script>
import util from "../../../api/util";
export default {
  data() {
    return {
      select: 0
    };
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    status: {
      //   default() {
      //     return "";
      //   }
    }
  },
  methods: {
    tab(i, index) {
      this.select = i;
      this.$emit("change", index);
    },
    // getIntTar(status) {
    // //   this.select = status;
    // //   console.log(this.select);
    // }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.title-tab {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 0.01rem solid rgba(223, 223, 223, 0.43);
  height: 0.46rem;
  line-height: 0.46rem;
  .cell {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 0.46rem;
    font-size: 0.14rem;
  }
  .active {
    color: #ef4f4f;
    border-bottom: 2px solid #ef4f4f;
  }
}
</style>