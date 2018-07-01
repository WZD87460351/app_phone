<template>
  <mt-swipe class="banner" style="height:1.6rem;" :auto="2000" :show-indicators="true">
    <mt-swipe-item v-for="(i, x) in slider" :key="x" >
      <img class="silder" :src="i.thumb" @click="link(i.link_app)">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
  export default {
    props: {
      slider: {
        type: Array,
        required: true
      }
    },
    mounted () {

    },
    methods:{
        link(i){
            if(i) {
                this.$router.push(i)
            } else {

            }
        }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  .silder{
    width: 100%;
    height: 100%;
  }
</style>
