<template>
  <section>
    <t-title :title="title"></t-title>
    <ul class="goods">
      <block v-for="(i,index) in obj" :key="index" :item="i" jumpTo="homeproduct"></block>
    </ul>
  </section>
</template>

<script>
  import Block from '../../common/list/ColList.vue'
  import tTitle from './top-title.vue'
  export default {
    props: {
      obj: {
        type: Array,
        required: true
      },
      title:{
        type: String
      }
    },
    mounted () {

    },
    components: {
      Block,
      tTitle
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  ul{
    margin: 0;
    padding: 0;
    background: #fff;
  }
</style>
