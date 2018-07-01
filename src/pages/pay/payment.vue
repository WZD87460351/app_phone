<template>
	<div class="cont-wap">
		<div class="pay-wap">
			<div class="header clearfix">
				<div class="leftBar"><i class="icon iconfont_fc icon-fc_fanhui1" @click="goback"></i></div>
				<div class="rightBar">保存</div>
			</div>

			<div class="payDetail">
				支付详情
			</div>
			<div class="payMethod">
				<div class="creditCard payBlock" data-method="credit" @click="changePay($event,'credit')" >
					<i class="icon iconfont_fc icon-fc_56" :class="{icon_select: selectPay === 'credit'}"></i>
					<p>信用卡支付</p>
				</div>
				<div class="unionPay payBlock" data-method="union" @click="changePay($event,'union')">
					<i class="icon iconfont_fc icon-fc_xinyongqiazhifu" :class="{icon_select: selectPay === 'union'}"></i>
					<p>银联支付</p>
				</div>
				<div class="aliPay payBlock" data-method="ali" @click="changePay($event,'ali')">
					<i class="icon iconfont_fc icon-fc_zhifubaozhifu1" :class="{icon_select: selectPay === 'ali'}"></i>
					<p>支付宝</p>
				</div>
				<div class="weiPay payBlock" data-method="weichat" @click="changePay($event,'weichat')">
					<i class="icon iconfont_fc icon-fc_weixinzhifu1" :class="{icon_select: selectPay === 'weichat'}"></i>
					<p>微信支付</p>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router';
	import { Toast } from 'mint-ui';
	export default{
		name: 'payment',
		data(){
			return{
				selectPay: '',
			}
		},
		methods:{
			goback(){
				router.go(-1);
			},
			changePay(e,tagname){
				// console.log(tagname);
				this.selectPay = tagname;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/common.scss';
	@import '../../static/css/comment.scss';
	.cont-wap{
		.pay-wap{
			padding: 0 15px;
			.header{
				padding: 15px 0;
				.rightBar{
					font-size: 17px;
				}
			}

			.payDetail{
				background: red;
			}

			.payMethod{
				display: flex;
				display:-webkit-flex;
				.payBlock{
					flex: 1;
					text-align: center;
					vertical-align: middle;
					justify-content: center;
					.icon{
						font-size: 30px;
						position: relative;
						&.icon_select{
							&:after{
								position: absolute;
								bottom: 0;
								right: -16px;
								display: block;
								height:15px;
								width: 15px;
								border-radius: 50%;
								background: $green;
								color: $white;
								font-size: 10px;
								text-align:center;
								line-height: 15px;
								content: '✔';
							}
						}
					}
				}
				.creditCard{
				}
			}
		}
	}

</style>