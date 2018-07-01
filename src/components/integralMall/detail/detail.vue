<template>
    <div class="main">
        <mt-header title="订单详情" fixed>
            <router-link to="/integral/order" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <topTip :goodObj="goodObj" :shopObj="shopObj"></topTip> 
            <t-location :logObj="logObj" :addressInfo="addressInfo" @tap="tap"></t-location>
            <t-info :goodObj="goodObj" :logObj="logObj" :shopObj="shopObj"></t-info>
        </div>
		<t-btn :goodObj="goodObj" :logObj="logObj" @payStu="payStu" @goodRec="goodRec" @exchange="exchange" @logistic="logistics(logObj.id,1)"></t-btn>
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
				<!--<li class="center-cell" @click="creditPay('credit')">
                    <div class="iconfont  icon1 icon2 line">&#xe690;</div>
                    <div class="lines">&#xe68c;</div>
                    <div class="title-list">
                        <div class='title-list-txt'>余额支付</div>
                        <div class="money">当前余额:</div>
                    </div>
                    <i class="iconfont right">&#xe649;</i>
                </li>
                <li class="center-cell">
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
	import {_webapp} from '../../../config/hook.js'
    import util from '../../../api/util'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import {Toast} from 'mint-ui';
    import topTip from './topTip'
    import tLocation from './location'
    import tInfo from './info'
    import tBtn from './btn'
    export default {
        data() {
            return {
                goodObj:{},
                logObj:{},
                shopObj:{},
                addressInfo:{},
                popupVisible: false,
            }
        },
        methods: {
            getInfo(){
                let _this = this;
                util.request({
                    url: 'creditshop.log.detail',
                    data:{
                        id: this.$route.query.id
                    },
                    method:'get',
                    success(res){
                        _this.goodObj = res.data.goods;
                        _this.logObj = res.data.log;
                        _this.shopObj = res.data.shopset;
                    }
                })
            },
            tap(){
                this.$router.push({name:'iaddList'})
            },
            exchange(){
//          	console.log("确认兑换");
            	let _this = this;
            	var addressid;
            	if(_this.logObj.isaddress == 1){
            		addressid = _this.logObj.addressid; 
            	}else{
            		addressid = _this.addressInfo.id;
            	}
            	console.log(addressid);
            	util.request({
                    url: 'creditshop.log.paydispatch',
                    data:{
                        id: _this.$route.query.id,
                        addressid : addressid
                    },
                    method:'post',
                    success(res){
                    	console.log('success',res);
                        _this.getInfo()
                    },
                    error: function (res) {
                    	console.log('error',res);
                        Toast({
                            message: `${res.message}`,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })
            },
            goodRec(){
//          	console.log("确认收货");
            	let _this = this;
            	var addressid;
            	if(_this.logObj.isaddress == 1){
            		addressid = _this.logObj.addressid; 
            	}else{
            		addressid = _this.addressInfo.id;
            	}
            	console.log('addressid',addressid);
            	util.request({
                    url: 'creditshop.log.finish',
                    data:{
                        id: _this.$route.query.id,
                        addressid : addressid
                    },
                    method:'post',
                    success(res){
                    	console.log('success',res);
                    	_this.getInfo()
//                      _this.$router.push({name: 'pay', query: {id: res.data.orderid}})
                    },
                    error: function (res) {
                    	console.log('error',res);
                        Toast({
                            message: `${res.message}`,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })
            },
            logistics(id,name){//查看物流
                this.$router.push({name:'logistics',query:{id:id,name:name}});
//				Toast({
//					message:'暂无开通物流查看',
//					position:'middle',
//					duration:2000
//				});
//				return false;
			},
            payStu(){
//          	console.log('支付');
                let _this = this;
                if(_this.addressInfo.address||_this.logObj.isaddress){
                	_this.popupVisible = true;
//              	console.log(_this.addressInfo.id);
//                  util.request({
//                      url: 'creditshop.log.paydispatch',
//                      data:{
//                          id: _this.$route.query.id,
//                          addressid : _this.addressInfo.id
//                      },
//                      method:'post',
//                      success(res){
//                      	console.log('success',res);
//                          _this.$router.push({name: 'pay', query: {id: res.data.orderid}})
//                      },
//                      error: function (res) {
//                      	console.log('error',res);
//                          Toast({
//                              message: `${res.message}`,
//                              position: 'middle',
//                              duration: 2000
//                          });
//                      }
//                  })
                }else{
                    Toast({
                        message: '请选择收货地址',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }
                
            },
            pay(type){
        		let _this=this;
        		var addressid;
            	if(_this.logObj.isaddress == 1){
            		addressid = _this.logObj.addressid; 
            	}else{
            		addressid = _this.addressInfo.id;
            	}
            	console.log('addressid',addressid);
                util.request({
                    url: `creditshop.log.paydispatch`,
                    method: 'post',
                    data: {
                    	id: _this.$route.query.id,
                        addressid: addressid || '',
                        paytype: type,
                    },
                    success: function (success) {
//                      console.log('支付方式:',type,'success',success);
                        var payinfo = '';
                        if(type == 'wechat_app'){
                        	payinfo = success.data.wechat_app.payinfo;
                        }else if(type == 'alipay_app'){
                        	payinfo = success.data.alipay_app.payinfo;
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
			                    _this.getInfo()
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
            ...mapMutations({

            }),
        },
        beforeRouteUpdate(to, from, next){
            let _this = this
            if(from.name === 'iaddList'){
                if(from.query.type !== 1){
                    _this.addressInfo = _this.userAddress
                } 
            }
            next()
        },
        components:{
            topTip,
            tLocation,
            tInfo,
            tBtn,
        },
        computed: {
            ...mapState([
                'userAddress'
            ]),
        },
        mounted(){
            this.getInfo();
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
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
                    div:first-child {
                        line-height: .5rem;
                        font-size: .14rem;
                    }
                    div:last-child {
                        line-height: .3rem;
                        font-family: iconfont;
                        font-size: .14rem;

                    }
                    .title-list-txt{
                   		line-height: .8rem!important;
                   }
                }
                .right {
                    font-family: iconfont;
                    float: right;
                    margin: 0 .12rem;
                }
            }
        }
		.container{
			padding-bottom:.5rem;
			.scroll-view(100%);
		}
    }

</style>