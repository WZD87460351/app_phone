<template>
    <div class="btn" v-if="logObj.action == 1 || logObj.action == 2">
        <div v-if="logObj.action == 1" @click="payStu">支付运费</div>
        <div v-if="logObj.action == 2" @click="exchange">确认兑换</div>
        <!--<div v-if="logObj.action == 3" @click="goodRec">确认收货</div>-->
    </div>
    <div class="btn1" v-else-if="logObj.action == 3">
        <div @click="goodLog">查看物流</div>
        <div @click="goodRec">确认收货</div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
 
            }
        },
        props:{
            goodObj:{
                type: Object,
                required: true
            },
            logObj:{
                type:Object,
                required: true
            }
        },
        methods: {
            payStu(){
                this.$emit('payStu')
            },
            goodRec(){
            	this.$emit('goodRec')
            },
            exchange(){
            	this.$emit('exchange')
            },
            goodLog(){
                this.$emit('logistic')
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/index.less';
  .btn{
        position:fixed;
        bottom:0;
        width:100%;
        height:.35rem;
        line-height:.35rem;
        color:#fff;
        text-align:center;
        background:#FF9227;
        > div{
            font-size: 12px;
        }
  }
    .btn1{
        position:fixed;
        bottom:0;
        width:100%;
        height:.35rem;
        line-height:.35rem;
        color:#fff;
        text-align:center;
        background:#FF9227;
        display:flex;
        > div{
            width:50%;
            font-size: 12px;
        }
        >div:first-child{
            border-right:1px solid #fff;
        }
    }

</style>