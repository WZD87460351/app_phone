<template>
    <li class="good-item">
        <label class="mint-checklist-label fl">
            <div class="mint-checkbox">
                <input @click="check" type="checkbox" class="mint-checkbox-input" :checked="goodsInfo.selected == 1">
                <span class="mint-checkbox-core"></span>
            </div>
        </label>
        <div @click="goDetail">
            <div class="goods-img fl">
                <img :src="goodsInfo.thumb">
            </div>
            <div class="goods-info fl">
                <h3 class="goods-title lr1">{{goodsInfo.title}}</h3>
                <div class="goods-option">{{goodsInfo.optiontitle}}</div>
                <div class="goods-attr">
                    <span class="goods-price">
                      ¥
                      <span class="goods-intPrice">{{goodsInfo.marketprice}}</span><!-- |getIntNmb -->
                      <span class="goods-folatPrice">{{goodsInfo.marketprice}}</span><!-- |getFloatNmb -->
                    </span>
                    <del>¥{{goodsInfo.productprice}}</del>
                </div>
            </div>
        </div>
        <div class="goods-total fr">
            <div class="goods-del" @click="del">
                <i class="iconfont">&#xe6db;</i>
            </div>
            <div class="dt_sku_numm_m clearfix">
                <span class="dt_subt fl" @click="reduce">-</span>
                <span class="dt_num fl">{{goodsInfo.total}}</span>
                <span class="dt_add" @click="add">+</span>
            </div>
        </div>
    </li>
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
            goodsInfo: {
                type: Object,
                required: true
            },
        },
        methods: {
            add() {//加
                this.$emit('add');
            },
            reduce() {//减
                this.$emit('reduce');
            },
            check() {//单选
                this.$emit('check')
            },
            del(){//删除商品
                this.$emit('del')
            },
            goDetail(){//去商品详情
                this.$emit('goDetail')
            }
        },
    }

</script>
<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .goods-img {
        width: 0.8rem;
        height: 0.8rem;
        margin-right: 0.1rem;
    }

    .goods-img img {
        display: block;
        width: 0.8rem !important;
        height: 0.8rem !important;
    }

    .goods-info {
        width: 1.66rem;
    }

    .goods-title {
        font-size: 0.14rem;
        color: #27272f;
        text-align: left;
    }

    .goods-attr {
        color: @themeColor;
        line-height: 0.2rem;
        position: relative;
        text-align: left;
        padding: 0.05rem 0rem;
        font-size: 0.28rem;
    }

    .goods-price {
        font-size: 0.12rem;
    }

    .goods-intPrice {
        font-size: 0.2rem;
    }

    .goods-folatPrice {
        font-size: 0.12rem;
    }

    .goods-attr del {
        color: #bebebe;
        font-size: 0.12rem;
    }

    .goods-num {
        text-align: left;
        font-size: 0.12rem;
        color: #27272f;
    }

    .goods-num i {
        font-size: 0.14rem
    }

    .goods-info .goods-option {
        font-size: 0.1rem !important;
        text-align: left;
        color: #999;
        height: .19rem;
    }

    .dt_sku_numm_m {
        width: 1rem;
        border: 0.01rem solid #e2e2e2;
        position: absolute;
        bottom: 0rem;
        right: 0rem;
    }

    .dt_sku_numm_m span {
        float: left;
        width: 33.3%;
        height: 0.25rem;
        line-height: 0.25rem;
        text-align: center;
        font-size: 0.2rem;
        color: #6b6b6b;
        overflow: hidden;
    }

    .dt_sku_numm_m .dt_num {
        border: 0.01rem solid #e2e2e2;
        border-bottom: none;
        border-top: none;
        font-size: 0.15rem;
        color: #27272f;
    }

    .goods-del {
        position: absolute;
        top: 0rem;
        right: 0rem;
        font-size: 0.25rem;
    }

    .goods-del i {
        font-size: 0.28rem;
        color: #999;
    }

    .goods-total {
        height: 100%;
        position: relative;
    }

    .mint-checkbox {
        font-size: 0.28rem;
    }

    .mint-checkbox-core {
        width: 0.2rem;
        height: 0.2rem;
        background: #FCFCFC;
        position: relative;
        bottom: .03rem;
    }

    .mint-checkbox-core::after {
        border: 0.02rem solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        top: 0.03rem;
        left: 0.06rem;
        position: absolute;
        width: 0.04rem;
        height: 0.08rem;
    }
    .mint-checklist-label {
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .mint-checklist-label .mint-checkbox {

    }
</style>