<template>
    <div class="main" style="background: #f7f7f7;">
        <mt-header title="确认订单" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <!--<address-info style="margin-top: .4rem;" :info="info.address" @tap="addressList"></address-info>-->
            <address-info v-if="goods.type==0&&goods.isverify==0&&goods.goodstype==0" style="margin-top: .4rem;"  :info="info.address" @tap="addressList"></address-info>

            <div class="shop">
                <div class="shop-title"><span class="icon-shop">&#xe6a8;</span> {{set.shopname}}</div>
                <div class="list-main">
                    <div class="main-left">
                        <img :src="goods.thumb" alt="">
                        <div>
                            <span>{{goods.title}}</span>
                            <div>规格：{{goods.optiontitle}}</div>
                        </div>
                    </div>
                    <div class="main-right">
                        <div>{{goods.credit}}{{set.creditname}}</div>
                        <div v-if="goods.money>0">￥{{goods.money}}</div>
                        <div>x1</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div>商品小计</div>
                    <div>{{goods.credit}}{{set.creditname}}+￥{{money}}</div>
                </div>
                <div class="list-item" v-if='goods.goodstype == 0 && goods.type == 0 && goods.isverify == 0'>
                    <div>运费</div>
                    <div>{{dispatch}}</div>
                </div>
            </div>
            <div class="btns">
                <div>需付：
                    <span v-if='goods.goodstype == 0 && goods.type == 0 && goods.isverify == 0 && goods.dispatch == 0'>(含运费)</span>
                    {{goods.credit}}{{set.creditname}}
                    <span v-if='goods.dispatch >0 || goods.money >0'>+￥{{ dispatch + money}}</span>
                </div>
                <div @click="pays">立即支付</div>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" modal=true>
        	<!--支付模块 -->
	        <ul class="payment">
	            <li class="center-cell"  @click="pay('wechat_app')">
	                <div class="iconfont icon1 line">&#xe605;</div>
	                <div class="lines">&#xe68c;</div>
	                <div class="title-list">
	                    <div>微信支付</div>
	                    <div class="money icon4">
	                        <i>&#xe68d;</i>微信安全支付
	                    </div>
	                </div>
	                <i class="iconfont right">&#xe649;</i>
	            </li>
	            <li class="center-cell" @click="pay('alipay_app')">
	                <div class="iconfont zhifubao icon1 line ">&#xe65b;</div>
	                <div class="lines">&#xe68c;</div>
	                <div class="title-list">
	                    <div>支付宝支付</div>
	                    <div class="money icon4">
	                        <i>&#xe68d;</i>支付宝安全支付
	                    </div>
	                </div>
	                <i class="iconfont right">&#xe649;</i>
	            </li>
	            <li class="center-cell" @click="creditPay('credit')">
	                <div class="iconfont  icon1 icon2 line">&#xe690;</div>
	                <div class="lines">&#xe68c;</div>
	                <div class="title-list">
	                    <div class='title-list-txt'>余额支付</div>
	                    <!--<div class="money">当前余额:</div>-->
	                </div>
	                <i class="iconfont right">&#xe649;</i>
	            </li>
	            <!--<li class="center-cell">
	                <div class="iconfont  icon1 icon3 line" style="font-size: .24rem">&#xe638;</div>
	                <div class="lines">&#xe68c;</div>
	                <div class="title-list">
	                    <div>微信找人代付</div>
	                    <div class="money">帮你付款的人才是真爱</div>
	                </div>
	                <i class="iconfont right">&#xe649;</i>
	            </li>-->
	        </ul>
        </mt-popup>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
	import {_webapp} from '../../../config/hook.js'
    import list from './../../../assets/mixins/list'
    import addressInfo from  '../../order/confirm/addressInfo'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import { MessageBox,Toast } from 'mint-ui'
    export default {
        data() {
            return {
                goods: [],
                list: [],
                set: [],
                money: 0,
                dispatch: 0,
                info: { },
                ids:'',
                popupVisible: false,
                goodsdata:{}
            }
        },
        prop: {},
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getCreate(){
                let that = this;
                util.request({
                    url: 'creditshop.create',
                    method: 'get',
                    data: {
                        id: that.$route.query.id,
                        optionid: that.$route.query.oid,
                    },
                    success: function (res) {
                        console.log(res);
                        that.goods = res.data.goods;
                        that.info = res.data;
                        that.set = res.data.set;
                        that.money = parseFloat(res.data.goods.money);
                        that.dispatch = parseFloat(res.data.goods.dispatch)
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
            pays(){
            	console.log(123654);
                let that = this;
                if(that.ids == "" && that.goods.type == "0" && that.goods.goodstype == "0"){
                    Toast({
                        message: '请选择收货地址',
                        position: 'middle',
                        duration: 2000
                    });
                    return false
                }
                //抽奖
                if(that.goods.type==1){
                    util.request({
                        url: 'creditshop.detail.ipay',
                        method: 'post',
                        data: {
                            id: that.$route.query.id,
                            optionid: that.$route.query.oid || '',
                            paytype: 'wechat_app'
                        },
                        success: function (res) {
                            console.log(res);
                            that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type}})

                            if(that.goods.type==0){
                                that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type,status:that.goods.status}})
                            }
                        },
                        error: function (error) {
                            console.log(error)
                        },
                        complete: function (res) {

                        }
                    })
                }
                // 兑换
                if(that.goods.type==0){
					//判断是否有地址
					let param = {};
					if(that.goods.goodstype==1){
                        param = {
                            id: that.$route.query.id,
                            optionid: that.$route.query.oid || '',
                        };
                        that.goodsdata = {
                        	goodstype: that.goods.goodstype,
                        	id: that.$route.query.id,
                            optionid: that.$route.query.oid || '',
                        }
                    }else{
                        param = {
                            id: that.$route.query.id,
                            optionid: that.$route.query.oid || '',
                            addressid: that.info.address.id,
                        };
                        that.goodsdata = {
                        	goodstype: that.goods.goodstype,
                        	id: that.$route.query.id,
                            optionid: that.$route.query.oid || '',
                            addressid: that.info.address.id,
                        }
                    }
                    //判断是否需要支付
                	util.request({
                        url: 'creditshop.detail.ipay',
                        method: 'post',
                        data: param,
                        success: function (res) {
//                      	console.log("是否支付",res.data.needpay);
                        	if(res.data.needpay){
                        		that.popupVisible = true
//                      		console.log('跳转支付')
                        	}else{
//                      		console.log('立即兑换');
                        		that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type,status:that.goods.status}})
                        	}
                        },
                        error: function (error) {
                            console.log(error)
                        },
                        complete: function (res) {

                        }
                   })
               }
            },
            pay(type){
        		let that=this;
        		console.log('that.info.address.id',that.info.address.id);
                util.request({
                    url: `creditshop.detail.ipay`,
                    method: 'post',
                    data: {
                    	id: that.$route.query.id,
                        optionid: that.$route.query.oid || '',
                        paytype: type,
                        addressid: that.info.address.id || '',
                    },
                    success: function (success) {
                        console.log('支付方式:',type,'success',success);
                        var payinfo = '';
                        if(type == 'wechat_app'){
                        	payinfo = success.data.wechat_app;
                        }else if(type == 'alipay_app'){
                        	payinfo = success.data.alipay_app;
                        }
                        console.log('payinfo',payinfo);
                        _webapp.payment(type,payinfo,(res)=>{
                        	console.log('res',res);
                        	console.log('res.statusCode',res.statusCode);
                        	console.log('res.data',res.data);
                        	if(res.statusCode == 0){
                        		Toast({
			                        message: `支付成功`,
			                        position: 'middle',
			                        duration: 2000
			                    });
			                    setTimeout(()=>{
			                    	that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type,status:that.goods.status}})
			                    },2000)
                        	}else{
                        		console.log(res);
                        		Toast({
		                        	message: `${res.data}`,
			                        position: 'middle',
			                        duration: 2000
			                    });
                        	}		                    
		                })                       
                    },
                    error: function (error) {
                        Toast({
	                      	message: `${error.message}`,
	                        position: 'middle',
	                        duration: 2000
		                });
                    },
                    complete: function () {

                    }
                })
            },
        	creditPay(typ){
                let that = this;
                MessageBox({
                    title: "提示",
                    message: "确认要支付吗",
                    showCancelButton: true
                }).then(action => {
                    if (action == "confirm") {
                    	that.popupVisible = false;
                        util.request({
                            url: `creditshop.detail.ipay`,
                            method: 'post',
                            data: {
                                type:typ,
                                id: that.$route.query.id,
                                optionid: that.$route.query.oid || '',
                                addressid: that.info.address.id || '',
                            },
                            success: function (res) {
                            	console.log('支付成功',res);
                                Toast({
                                    message: `支付成功`,
                                    position: 'middle',
                                    duration: 1000
                                });
                                setTimeout(()=>{
			                    	that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type,status:that.goods.status}})                               	
                                },2000)
                            },
                            error: function (error) {
                            	console.log('支付失败',error);
                                Toast({
			                      	message: `${error.message}`,
			                        position: 'middle',
			                        duration: 2000
				                });
                            },
                            complete: function () {

                            }
                        })
                    } else if (action === "cancel") {
                        //表示点击了取消
                        Toast({
                            message: `取消支付`,
                            position: 'middle',
                            duration: 1000
                        });
                    }
                });
            },
            addressList(){
                this.$router.push({name: 'icaddList'})
            },
            submit(){
                let _this = this;
                if (_this.info.address) {
                    let params = {
                        id: _this.$route.query.id,
                        addressid: _this.info.address.id,
                        optionid: _this.$route.query.oid,
                    };
                    util.request({
                        url: 'creditshop.detail.ipay',
                        method: 'post',
                        data: params,
                        success: function (res) {
                            _this.$router.push({name: 'pay', query: {id: res.data.orderid}})
                        },
                        error: function (res) {
                            Toast({
                                message: `${res.message}`,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    })
                } else {
                    Toast({
                        message: '请选择收货地址',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }
            },
        },
        beforeRouteUpdate(to, from, next){
            let _this = this
            if (from.name === 'icaddList') {
                console.log(from)
                console.log(from.query.type)
                if (from.query.type !== 1) {
                    _this.info.address = _this.userAddress
                    _this.ids = "0"
                }
            }
            next()
        },
        mounted () {
            this.getCreate()
        },
        computed: {
            ...mapState([
                'userAddress'
            ]),
        },
        components: {
            addressInfo,
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    @font-face {
        font-family: 'iconfont';  /* project id 519918 */
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot');
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.woff') format('woff'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.svg#iconfont') format('svg');
    }

    .icon-shop {
        font-family: iconfont;
    }

    .main {
        .page-view(100);
        .loc {
            margin-top: .5rem;
            background: #ffffff;
            display: flex;
            text-align: left;
            padding: .1rem .1rem;
            justify-content: space-between;
            align-items: center;
            .loc-info {
                flex: 1;
                padding: 0 .1rem;
                div {
                    font-size: .14rem;
                }
                div:first-child {

                }
                div:last-child {
                    color: #666;
                }
            }
        }
        .shop {
            background: #ffffff;
            margin-top: .08rem;
            .shop-title {
                padding: .08rem .12rem;
                text-align: left;
                font-size: .14rem;
            }
            .list-main {
                display: flex;
                justify-content: space-between;
                padding: .12rem;
                .main-left {
                    display: flex;
                    align-items: flex-start;
                    width: 82%;
                    text-align: left;
                    img {
                        width: .6rem;
                        height: .6rem;
                    }
                    > div {
                        display: flex;
                        flex-direction: column;
                        text-align: left;
                        margin-left: .1rem;
                        span {
                            font-size: .14rem;
                        }
                        div {
                            margin-top: .04rem;
                            font-size: .14rem;
                        }
                    }
                }
                .main-right {
                    color: #666;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    font-size: .12rem;
                    text-align: right;
                    div {
                        width: 100%;
                        font-size: .12rem;
                    }
                    > div:last-child {
                        margin-top: .04rem;
                        text-align: right;
                    }
                }
            }
        }
        .list {
            margin-top: .1rem;
            background: #ffffff;
            .list-item {
                display: flex;
                justify-content: space-between;
                padding: .1rem;
                border-bottom: 1px solid #f7f7f7;
                div {
                    font-size: .14rem;
                }
            }
        }
        .btns {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .45rem;
            line-height: .45rem;
            background: #ffffff;
            div:first-child {
                width: 70%;
                float: left;
                text-align: left;
                text-indent: 1em;
                font-size: .14rem;
                span {
                    font-size: .14rem;
                }
            }
            div:last-child {
                float: left;
                background: #F14748;
                color: #ffffff;
                text-align: center;
                width: 30%;
                font-size: .14rem;
            }
        }
            	.payment {
            background-color: red;
            float: left;
            width: 100%;
            .center-cell {
                border-bottom: 1px solid #ebebeb;
                float: left;
                width: 100%;
                height: 0.8rem;
                line-height: 0.8rem;
                background: #fff;
                .zhifubao{
                    color:#02A9F1!important;
                }
                .icon1 {
                    float: left;
                    font-family: iconfont;
                    font-size: .3rem;
                    margin-left: .12rem;
                    color: #4bb803;
                }
                .icon2 {
                    color: #f48533;
                    font-weight: bold;
                }

                .icon3 {
                    color: #f6d410;
                }

                .lines {
                    font-family: iconfont;
                    float: left;
                    font-size: .4rem;
                    color: #eaeaea;
                }
                .title-list {
                    float: left;
                    .money {
                        color: #9b9b9b;
                    }
                    .icon4 {
                        i {
                            font-family: iconfont;
                            color: #8ea9ee;
                        }
                    }
                    div {
                        height: .4rem;
                        line-height: .4rem;
                        text-align: left
                    }
                    /*div:first-child {
                        line-height: .5rem;
                        font-size: .14rem;
                    }
                    div:last-child {
                        line-height: .3rem;
                        font-family: iconfont;
                        font-size: .14rem;
                    }*/
                   .title-list-txt{
                   		line-height: .8rem;
                   }
                }
                .right {
                    font-family: iconfont;
                    float: right;
                    margin: 0 .12rem;
                }
            }
        }
    }

</style>
