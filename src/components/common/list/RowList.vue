<template>
  <div class="ul">
    <li class="item" @click="tap(v.id)" v-for="(v,i) in item" :key="i">
      <img :src="v.thumb"/>
      <div class="dec">
        <div class="title">{{v.title}}</div>
        <div class="price">￥{{v.minprice}}</div>
      </div>
      <img :src="noTotal" class="nototal" v-if="v.total==0"/>
    </li>
  </div>
</template>

<script>
  import defaultAvatar from '@/assets/images/test.png'
  import noTotal from '@/assets/images/no-total.png'
  export default {
    data () {
        return {
            test: defaultAvatar,
            noTotal:noTotal
        }
    },
    props: {
      item: {
        type: Array,
        required: true
      },
      jumpTo: {
        type: String,
        required: true
      },
      jumpQuery: {
        type: Object
      }
    },
    methods: {
      tap (id) {
//        this.$router.push({name: 'product',query:{id:id}})
        this.$router.push({name: this.jumpTo,query:{id:id}})
      }
    },
    mounted(){
      
    }
  }
</script>

<style lang="less" scoped="">
  @import '../../../assets/less/index.less';
  .ul{
      display: flex;
      margin: 0;
      padding: 0;
      background: #fff;
      flex-wrap: wrap;
  }
  .item{
    display: flex;
    flex-direction: column;
    padding: .1rem;
    width: 50%;
    position:relative;
    img{
      width: 1.6rem;
      height: 1.6rem;
      margin-bottom: .05rem;
    }
    .dec{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      .title{
        font-size: 14px;
        .text-overflow(2);
        margin-bottom: .1rem;
      }
      .price{
        color: @themeColor;
        font-size: 16px;
      }
    }
    .nototal{
      width:1rem;
      height:1rem;
      position:absolute;
      bottom:.4rem;
      right:.1rem;
      margin-bottom:0;
    }
  }
</style>
