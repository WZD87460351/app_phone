<template>
    <div class="page" style="background: #f7f7f7;">
        <mt-header title="订单详情" fixed>
            <router-link to="/order" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <t-toplist :order="order"></t-toplist>
            <!--<div>{{res.order.verifytitle}}:{{res.order.verifyinfo}}</div>-->
            <t-location v-if="address" :address="address" :type="res.dispatchtype"></t-location>
            <div class="store" v-if="res.carrier">
                <div class="fui-cell-group flex">
                    <div class="logo">
                        <img src="../../../assets/images/dingwei.png"/>
                        <!--<div class="iconfont"></div>-->
                    </div>
                    <div class="shop-info">
                        <div class="shop-name">{{res.carrier.storename}}</div>
                        <div class="shop-address">{{res.carrier.address}}</div>
                    </div>
                </div>
                <div class='fui-cell-group'>
                    <div class='fui-cell flex'>
                        <div class='fui-cell-label'>姓名</div>
                        <div class='fui-cell-info'>
                            <input placeholder='请输入姓名' type='text' disabled  class='fui-input textl' v-model="res.carrier.carrier_realname"></input>
                        </div>
                    </div>
                    <div class='fui-cell flex'>
                        <div class='fui-cell-label'>电话</div>
                        <div class='fui-cell-info'>
                            <input type='text'  class='fui-input textl' disabled placeholder='请输入电话' v-model="res.carrier.carrier_mobile" ></input>
                        </div>
                    </div>
                </div>
            </div>
            <t-shop :res="res" :shop="shop"></t-shop>
            <t-list :order="order"></t-list>
            <div class="code" v-if="order.verifyinfo">
                <span class="left">{{order.verifytitle}}:{{order.verifyinfo[0].verifycode}}</span>
                <span class="right">{{order.verifyinfo[0].status}}</span>
            </div>
            <t-info :order="order"></t-info>
        </div>
        <mt-popup
                v-model="popupVisible"
                popup-transition="popup-fade">
            <img class="sharelogo" :src="qrimg"/>
        </mt-popup>
        <div class="fix">
            <div v-if="order.cancancel" class="act" @click="cancel(order.id,order.status)">取消订单</div>
            <router-link :to="{name:'pay',query:{id:order.id,type:'order'}}" v-if="order.canpay" tag="div">支付订单
            </router-link>
            <div v-if="order.cancomplete" @click="confirm(order.id)">确认收货</div>
            <div v-if="order.hasexpress" @click="logistic(order.id)">查看物流</div>
            <div v-if="order.candelete" @click="del(order.id,order.status)">删除订单</div>
            <!--<div v-if="order.canrefund" @click="refund(order.id)">申请退款</div>-->
            <router-link :to="{name:'refund',query:{id:order.id}}" v-if="order.canrefund && !order.cancancelrefund" tag="div">申请退款
            </router-link>
            <div v-if="order.canverify" class="btns act" @click="goDetail(order.id)">我要取货</div>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import order from './../../../assets/mixins/order'
    import tToplist from './toplist.vue'
    import tLocation from './location.vue'
    import tShop from './shop.vue'
    import tList from './list.vue'
    import tInfo from './info.vue'

    export default {
        data() {
            return {
                res: {},
                order: {},
                carrier: {},
                shop: {},
                goods: [],
                address: {},
                url: 'order.op',
                qrimg:'',
                popupVisible:false

            }
        },
        mixins: [order],
        methods: {
            getOrderDetail(){
                let that = this;
                util.request({
                    url: 'order.detail',
                    method: 'get',
                    data: {
                        id: that.$route.query.id,
                    },
                    success: function (res) {
                        console.log(res);
                        that.res = res.data;
                        that.order = res.data.order;
                        console.log('order')
                        console.log(that.order)
                        that.goods = res.data.goods;
                        that.carrier = res.data.carrier;
                        that.address = res.data.address;
                        that.shop = res.data.shop;
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
            goDetail(i){
                let _this=this
                util.request({
                    url: 'verify.qrcode',
                    method: 'post',
                    data:{
                        id : i
                    },
                    success(res){
                        console.log('getcode success')
                        console.log(res)
                        _this.qrimg=res.data.url
                        _this.popupVisible=true
                    }
                })
            },
        },
        beforeRouteUpdate(to,form,next){
            if(form.name === 'refund' && form.query.a){
                this.getOrderDetail();
            }
            next()
        },
        mounted () {

            this.getOrderDetail();
        },
        components: {
            tToplist,
            tLocation,
            tShop,
            tList,
            tInfo
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .page {
        .page-view(1);
        .fix {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .4rem;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .act {
                background: #ffffff !important;
                border: 1px solid #EF4F4F !important;
                color: #EF4F4F !important;
            }
            div {
                min-width: .6rem;
                background: #EF4F4F;
                color: #ffffff;
                padding: .04rem .06rem;
                border-radius: .04rem;
                margin-right: .12rem;
            }
        }
        .container {
            .scroll-view(100%);
            background: #f7f7f7;
            .header-height;
            .code {
                padding: 0 .1rem;
                text-align: left;
                line-height: 2;
                margin-top: .1rem;
                display: flex;
                justify-content: space-between;
                .right {
                    color: #EF4F4F;
                }
            }
            .fui-cell-group {
                margin-top:.1rem;
                background-color:#fff;
                line-height:1.7;
                font-size:.16rem;
                overflow:hidden;
                position:relative;
                text-align: left;
                padding: 0 .1rem;
                box-sizing: border-box;
                .fui-cell {
                    position:relative;
                    padding: 0 .125rem;
                    display:-webkit-flex;
                    display:flex;
                    -webkit-align-items:center;
                    align-items:center;
                    -moz-transition-duration:300ms;
                    transition-duration:300ms;
                    transition-property:background-color;
                    .fui-cell-label {
                        font-size: .14rem;
                        margin-right: .1rem;
                    }
                    .fui-cell-info {
                        /*font-size: .12rem;*/
                        /*color: #666;*/
                        flex: 1;
                        input {
                            font-size: .12rem;
                            color: #666;
                            display: block;
                            width: 100%;
                        }
                    }
                }
                .logo {
                    width: .5rem;
                    margin-right: .1rem;
                    vertical-align: middle;
                    img {
                        width: .3rem;
                        height: .3rem;
                        display: block;
                        margin-left: .1rem;
                        margin-top: .08rem;

                    }
                }
                .shop-info {
                    flex:1;
                    font-size: .14rem;
                    color: #666;
                    .shop-name {
                        font-size: .14rem;
                    }
                    .shop-address {
                        font-size: .14rem;
                        .text-overflow(2)
                    }
                }
            }
            .flex {
                display: flex;
            }
        }
    }
</style>