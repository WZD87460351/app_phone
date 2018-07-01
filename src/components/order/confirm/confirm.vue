<template>
    <div class="page">
        <mt-header title="确认订单 " fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <top-bar :list="nav" v-if="info.showTab" @change="changedispatch"></top-bar>
            <address-info v-if="info.showAddress && dispatchtype === 1" :info="info.address"
                          @tap="addressList"></address-info>
            <!--<store v-if="info.showAddress"></store>-->
            <div class="store" v-if="dispatchtype === 0">
                <div class="fui-cell-group flex" v-if="(info.showTab || info.showAddress) && info.carrierInfo"
                     @click="storelist">
                    <div class="logo">
                        <img src="../../../assets/images/dingwei.png"/>
                        <!--<div class="iconfont"></div>-->
                    </div>
                    <div class="shop-info">
                        <div class="shop-name">{{info.carrierInfo.storename}}</div>
                        <div class="shop-address">{{info.carrierInfo.address}}</div>
                    </div>
                </div>
                <div class='fui-cell-group'>
                    <div class='fui-cell flex'>
                        <div class='fui-cell-label'>姓名</div>
                        <div class='fui-cell-info'>
                            <input placeholder='请输入姓名' type='text' class='fui-input textl'
                                   v-model="info.member.realname" />
                        </div>
                    </div>
                    <div class='fui-cell flex'>
                        <div class='fui-cell-label'>电话</div>
                        <div class='fui-cell-info'>
                            <input type='text' class='fui-input textl' placeholder='请输入电话'
                                   v-model="info.member.mobile" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="goods" v-for="(i,index) in info.goods">
                <div class="goodstip">
                    <i class="iconfont">&#xe74b;</i>{{i.shopname}}
                </div>
                <shop-list :list="i['goods']"></shop-list>
            </div>
            <div class="deliveryMode deflist ">
                <div class="deliveryMode-lf">
                    给卖家留言:
                </div>
                <div class="deliveryMode-lr message">
                    <input type="text" name="" v-model="remark" placeholder="选填:对本次交易的说明">
                </div>
            </div>
            <div class="goods-total">
      				<span class="goods-total-lf">
      					共 {{info.total}} 件, 合计：
      				</span>
                <span class="mygoods-price">
                        ¥
                        <span class="goods-intPrice">{{info.goodsprice | calculatePrice1}}.</span>
                        <span class="goods-folatPrice">{{info.goodsprice | calculatePrice2}}</span>
                    </span>
            </div>
            <ul class="exhibition">
                <li class="exhibition-cell" @click="choseCoupon">
                    <div class="exhibition-lf">
                        <!--选择优惠券-->
                        优惠券
                    </div>
                    <span class="mygoods-price" v-if="coupons.backmoney>0">
                    -￥{{coupons.backmoney}}
                    </span>
                </li>
                <li class="exhibition-cell">
                    <div class="exhibition-lf">
                        商品金额
                    </div>
                    <span class="mygoods-price">
                      ¥
                      <span class="goods-intPrice">{{info.goodsprice | calculatePrice1}}.</span>
                      <span class="goods-folatPrice">{{info.goodsprice | calculatePrice2}}</span>
                    </span>
                </li>
                <li class="exhibition-cell">
                    <div class="exhibition-lf">
                        <!--商户单笔满{{info.enoughmoney}}元立减-->
                        <!--商户单笔满{{info.merch_enoughmoney}}元立减-->
                        满{{info.merch_enoughmoney}}元立减
                    </div>
                    <span class="mygoods-price">
                      -¥
                        <!--<span class="goods-intPrice">{{info.enoughdeduct}}</span>-->
                      <span class="goods-intPrice">{{info.merch_enoughdeduct}}</span>
                        <!--<span class="goods-folatPrice">{{info.merch_enoughdeduct | calculatePrice2}}</span>-->
                    </span>
                </li>
                <li class="exhibition-cell" v-if="info.dispatch_price>0">
                    <div class="exhibition-lf">
                        +运费
                    </div>
                    <span class="mygoods-price">
                      +¥
                      <span class="goods-intPrice">{{info.dispatch_price | calculatePrice1}}.</span>
                      <span class="goods-folatPrice">{{info.dispatch_price | calculatePrice2}}</span>
                    </span>
                </li>
                <li class="exhibition-cell" v-if="info.discountprice>0">
                    <div class="exhibition-lf">
                        会员优惠
                    </div>
                    <span class="mygoods-price">
                      -¥
                      <span class="goods-intPrice">{{info.discountprice}}</span>
                        <!--<span class="goods-folatPrice">00</span>-->
                    </span>
                </li>
            </ul>
        </div>
        <footer>
            <div class="info">
                需付：<i>{{totalPrice}}</i>元
            </div>
            <div class="submit" @click="submit">立即支付</div>
        </footer>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import addressInfo from './addressInfo'
    import shopList from '../../common/view/shopList.vue'
    import price from '../../../assets/mixins/price'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import {Toast} from 'mint-ui'
    import TopBar from '../../common/Tabbar/TopBar.vue'
    import store from './store'

    export default {
        mixins: [price],
        data() {
            return {
                remark: '',
                info: {},
                dispatchtype: 1,
                coupons: {
                    backmoney: ''
                },
                nav: [
                    {
                        title: '快递配送',
                        status: 1
                    },
                    {
                        title: '上门自提',
                        status: 0
                    }
                ],
                fromcart: '',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            init() {
                let _this = this;
                _this.fromcart = _this.$route.query.fromcart;
                util.request({
                    url: 'order.create',
                    method: 'get',
                    data: {
                        id: _this.$route.query.id,
                        total: _this.$route.query.total,
                        optionid: _this.$route.query.optionid,
                    },
                    success(res) {
                        _this.info = res.data
                        _this.storeInfo = res.data.carrierInfo
                        console.log('_this.info')
                        console.log(_this.info)
                        // if (!res.data.showTab && !res.data.info.showAddress) {
                        if (!res.data.showTab && !_this.info.showAddress) {
                            console.log('_this.dispatchtype=0')
                            _this.dispatchtype = 0
                        }
                        _this.coupons = {}
                    },
                    error: function () {

                    },
                    complete: function () {

                    }
                })
            },
            addressList() {
                this.$router.push({name: 'addList'})
            },
            changedispatch(i) {
                let _this = this;
                _this.dispatchtype = i;
                let t = this.info
                let params = {
                    diydata: false,
                    submit: true,
                    dflag: _this.dispatchtype? 0: 1,
                    addressid: _this.info.address ? _this.info.address.id : 0,    //地址ID
                    couponid: _this.coupons.id || '',     //优惠券ID
//                    dispatchtype:_this.info.dispatchtype, //配送方式
                    dispatchtype: Number(!_this.dispatchtype), //配送方式
                    carrierid: _this.info.carrierInfo.id,  //门店ID
                    fromcart: _this.info.fromcart, //来自购物车
                    carriers: 1 !== _this.dispatchtype || t.isvirtual || t.isverify ? {
                        carrier_realname: t.member.realname,
                        carrier_mobile: t.member.mobile,
                        realname: t.carrierInfo.realname,
                        mobile: t.carrierInfo.mobile,
                        storename: t.carrierInfo.storename,
                        address: t.carrierInfo.address
                    } : '',
                };
//              for (let i of _this.info.goods) {
//                  for (let s of i.goods) {
//                      for (let v in s) {
//                          params[`goods[${s.id}][${v}]`] = s[v]
//                      }
//                  }
//              }
                if (_this.info.fromcart !==1) {
                    for (let i of _this.info.goods) {
                        for (let s of i.goods) {
                            for (let v in s) {
                                params[`goods[${s.id}][${v}]`] = s[v]
                            }
                        }
                    }
                }
                else {
                    var m = 0;
                    for (let i of _this.info.goods) {
                        i.goods.forEach((s,idx) =>{
                            for (let v in s) {
                                params[`goods[${m}][${v}]`] = s[v]
                            }
                            m++
                        })
                    }
                }
                util.request({
                    url: 'order.create.caculate',
                    method: 'post',
                    data: params,
                    success: function (res) {
                    	_this.info.realprice = res.data.realprice;
                        _this.info.dispatch_price = res.data.price;
                    },
                    error: function (res) {
                        Toast({
                            message: `${res.message}`,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })
            },
            submit() {
                let _this = this;
                let t = this.info
                let params = {
                    diydata: false,
                    submit: true,
                    addressid: _this.info.address ? _this.info.address.id : 0,    //地址ID
                    couponid: _this.coupons.id || '',     //优惠券ID
//                    dispatchtype:_this.info.dispatchtype, //配送方式
                    dispatchtype: Number(!_this.dispatchtype), //配送方式
                    carrierid: _this.info.carrierInfo.id,  //门店ID
                    fromcart: _this.info.fromcart, //来自购物车
                    carriers: 1 !== _this.dispatchtype || t.isvirtual || t.isverify ? {
                        carrier_realname: t.member.realname,
                        carrier_mobile: t.member.mobile,
                        realname: t.carrierInfo.realname,
                        mobile: t.carrierInfo.mobile,
                        storename: t.carrierInfo.storename,
                        address: t.carrierInfo.address
                    } : '',
                };
//              for (let i of _this.info.goods) {
//                  for (let s of i.goods) {
//                      for (let v in s) {
//                          params[`goods[${s.id}][${v}]`] = s[v]
//                      }
//                  }
//              }
				if (_this.info.fromcart !==1) {
                    for (let i of _this.info.goods) {
                        for (let s of i.goods) {
                            for (let v in s) {
                                params[`goods[${s.id}][${v}]`] = s[v]
                            }
                        }
                    }
                }
                else {
                    var m = 0;
                    for (let i of _this.info.goods) {
                        i.goods.forEach((s,idx) =>{
                            for (let v in s) {
                                params[`goods[${m}][${v}]`] = s[v]
                            }
                            m++
                        })
                    }

                }
                if (!params.carrierid && !params.addressid && !params.carriers) {
                    Toast({
                        message: `请选择收货地址`,
                        position: 'middle',
                        duration: 2000
                    });
                    return
                }
                console.log(params);
                util.request({
                    url: 'order.create.submit',
                    method: 'post',
                    data: params,
                    success: function (res) {
                        _this.$router.push({name: 'pay', query: {id: res.data.orderid, type: 'order'}})
                    },
                    error: function (res) {
                        Toast({
                            message: `${res.message}`,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })
            },
            choseCoupon() {
                let _this = this
                let promise = new Promise((resolve, reject) => {
                    let params = {
                        type: 0,
                        money: 0
                    }
                    for (let i of _this.info.goods) {
                        for (let s of i.goods) {
                            for (let v in s) {
                                params[`goods[${s.id}][${v}]`] = s[v]
                            }
                        }
                    }
                    for (let s in _this.info.merchs) {
                        for (let v in _this.info.merchs[s]) {
                            params[`merchs[${s}][${v}]`] = _this.info.merchs[s][v]
                        }
                    }
                    console.log('params')
                    console.log(params)
                    _this.COUPONLIST(params)
                    resolve()
                })
                promise.then(() => {
                    this.$router.push({name: 'choseCoupon'})
                })
            },
            storelist() {
                this.$router.push({name: 'store'})
            },
            ...mapMutations([
                'COUPONLIST'
            ]),
        },
        beforeRouteUpdate(to, from, next) {
            let _this = this
            if (from.name === 'addList') {
                if (from.query.type !== 1) {
                    _this.info.address = _this.userAddress
                }
            }
            if (from.name === 'choseCoupon' && from.query.coupon === 1) {
                //console.log('选择优惠券')
                _this.coupons = _this.coupon
            }
            if (from.name === 'store' && from.query.store === 1) {
                let obj = _this.store
                console.log('obj')
                console.log(obj)
                _this.$set(_this.info, 'carrierInfo', _this.store)
//                _this.info=Object.assign({}, _this.info,{'member':_this.store})
                console.log('_this.info.member')
                console.log(_this.info.member)
            }
            next()
        },
        components: {
            addressInfo,
            shopList,
            TopBar,
            store
        },
        computed: {
            ...mapState([
                'userAddress',
                'coupon',
                'store'
            ]),
            totalPrice() {
                let num = this.coupons.backmoney || 0
                let realPrice = this.info.realprice - num
                if (realPrice < 0) {
                    return 0
                } else {
                    return realPrice
                }

//                return this.info.realprice-num
            }
        },
        mounted() {
            this.init()
        },
        activated() {
            this.init()
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .page {
        .page-view(1);
        .container {
            .scroll-view(100%);
            margin-top: .4rem;
            margin-bottom: .5rem;
            padding-bottom: .5rem;
            .fui-cell-group {
                margin-top: .1rem;
                background-color: #fff;
                line-height: 1.7;
                font-size: .16rem;
                overflow: hidden;
                position: relative;
                text-align: left;
                padding: 0 .1rem;
                box-sizing: border-box;
                .fui-cell {
                    position: relative;
                    padding: 0 .125rem;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-align-items: center;
                    align-items: center;
                    -moz-transition-duration: 300ms;
                    transition-duration: 300ms;
                    transition-property: background-color;
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
                    flex: 1;
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
            .goods {
                margin-top: .1rem;
                width: 100%;
                .goodstip {
                    padding: 0.15rem 0.1rem;
                    font-size: 0.14rem;
                    text-align: left;
                    color: #666;
                }
            }
            .deliveryMode {
                width: 95.2%;
                margin: 0 auto;
                border-bottom: 0.01rem solid #E5E5E5;
                display: flex;
                height: .46rem;
                .deliveryMode-lf {
                    line-height: .46rem;
                    font-size: 0.14rem;
                    color: #666;
                }
                .deliveryMode-lr {
                    flex: 1;
                    margin-left: .1rem;
                }
                .message {
                    padding: .1rem 0;
                    input {
                        width: 100%;
                        line-height: .26rem;
                        font-size: 0.14rem;
                        color: #333;
                    }
                }
            }
            .goods-total {
                height: 0.46rem;
                line-height: 0.46rem;
                text-align: right;
                font-size: 0.12rem;
                padding: 0rem 0.1rem;
                .goods-total-lf {
                    font-size: 0.14rem;
                    color: #666;
                    font-weight: bolder;
                }
                .mygoods-price {
                    text-align: right;
                    font-size: 0.12rem;
                    color: #EC5151;
                    .goods-intPrice {
                        font-size: 0.2rem;
                    }
                    .goods-folatPrice {
                        font-size: .12rem;
                    }
                }
            }
            .exhibition {
                margin: 0.1rem 0rem 0.6rem 0rem;
                background: #fff;
                .exhibition-cell {
                    display: flex;
                    height: 0.46rem;
                    line-height: .46rem;
                    width: 100%;
                    font-size: 0.14rem;
                    color: #666;
                    padding: 0rem 0.1rem;
                    .exhibition-lf {
                        font-size: .16rem;
                        color: #666;
                    }
                    .mygoods-price {
                        text-align: right;
                        /*display: block;*/
                        flex: 1;
                        color: red;
                        .goods-intPrice {
                            font-size: .16rem;
                        }
                        .goods-folatPrice {
                            font-size: .12rem;
                        }
                    }
                }
            }
        }
        footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .5rem;
            display: flex;
            line-height: .5rem;
            background: #fff;
            border-top: @border;
            .info {
                flex: 1;
                text-align: right;
                padding-right: .05rem;
                i {
                    color: #ef4f4f;
                }
            }
            .submit {
                width: 1.22rem;
                color: #fff;
                background-color: @danger;
            }
        }
    }
</style>
