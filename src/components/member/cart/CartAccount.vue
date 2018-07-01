<template>
    <div class="total_area clearfix" >
        <label class="mint-checklist-label fl">
        <span class="mint-checkbox fl">
          <input type="checkbox" class="mint-checkbox-input" value="当前值" :checked="isTruea"  @click="checkBox">
          <span class="mint-checkbox-core"></span>
        </span>
            <span class="mint-checkbox-label">全选</span>
        </label>
        <div class="payment fr clearfix">
            <div class="payment-lf fl">
                <div>
                    <h3>
                        合计:
                        <span class="goods-price">
                ¥
                <span class="goods-intPrice">{{defPricea}}</span>
                <span class="goods-folatPrice"></span>
              </span>
                    </h3>
                    <h4>
                        不含运费
                    </h4>
                </div>
            </div>
            <div class="payment-lr fl lr1" @click="confirmOrder">
                结算({{defTotala}})
            </div>
        </div>
    </div>
</template>
<script>
    import util from '../../../api/util'
    import { Header, Checklist, MessageBox, Toast } from 'mint-ui';
    import { mapMutations, mapGetters } from 'Vuex';

    export default {
        data() {
            return {

            }
        },
        props: {
            cartData: {
                type: Array,
                required: false
            },
            defPricea:{
                type:Number,
                required:true,
            },
            defTotala:{
                type:Number,
                required:true,
            },
            isTruea:{
                type:Boolean,
                required:true,
            }
        },
        methods: {
            checkBox() {//全选
                this.$emit('checkBox');
            },
            confirmOrder(){//确认订单
                this.$emit('confirmOrder')
            }
        },
        mounted () {

        },
        components:{

        }
    }
</script>
<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .total_area {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0.5rem;
        height: 0.50rem;
        padding: 0rem 0rem 0rem 0.1rem;
        border-top: 1px solid #e7e7e7;
        background: #fff;
    }

    .total_area .mint-checklist-label {
        padding: 0rem;
        display: block;
        width: .6rem;
        height: 0.50rem;
        line-height: 0.50rem;
        text-align: left;
        font-size: 0.28rem
    }

    .mint-checkbox-label {
        font-size: 0.14rem;
        color: #051b28;
        position: relative;
        bottom: .02rem;
    }

    .payment-lf {
        height: 0.50rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .payment-lf h3 {
        font-size: 0.14rem;
        margin-right: 0.1rem;
    }

    .payment-lf h4 {
        font-size: 0.12rem;
        margin-right: 0.1rem;
        text-align: right;
    }

    .payment-lr {
        width: 1.10rem;
        height: 0.50rem;
        line-height: 0.50rem;
        font-size: 0.16rem;
        background: @themeColor;
        color: #fff;
        text-align: center;
    }

    .mint-checkbox-input:checked+.mint-checkbox-core {
        background-color: @themeColor;
        border-color: @themeColor;
    }

    .mint-msgbox-confirm {
        color: @themeColor !important;
    }

</style>