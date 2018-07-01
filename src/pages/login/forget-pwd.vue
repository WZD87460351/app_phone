<template>
	<div class="forget-wap">
		<div class="forgetHead">
			<i class="icon iconfont_fc icon-fc_fanhui" @click="goabck"></i>
			<span class="headText">忘记密码</span>
		</div>
		<div class="forget-cont">
			<div class="phone">
				<select v-model="selected" class="numSelect"> 
					<option v-for="item in phoneArea" :value="item.num">{{item.area}}</option> 
				</select>
				<input type="number" v-model="phoneNum" placeholder="手机号" class="phonenumber">
				<button class="getVerify" :class="{hasget : !show}" @click="getCode" :disabled="!show">
					<span v-show="show">获取验证码</span>
					<span v-show="!show" class="count">{{count}} s</span>
				</button>
			</div>

			<div class="verification">
				<i class="icon iconfont_fc icon-fc_aixin"></i>
				<input type="number" placeholder="请输入验证码" v-model="verifyNum">
			</div>

			<div class="newPwd">
				<i class="icon iconfont_fc icon-fc_dingdan"></i>
				<input type="password" placeholder="输入新密码" v-model="newPassword">
			</div>

			<div class="newPwdAgain">
				<i class="icon iconfont_fc icon-fc_dingdan"></i>
				<input type="password" placeholder="再次输入新密码" v-model="newPasswordAgain">
			</div>

			<div class="submit-con" @click="submit">
				提交
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router';
	import { Toast } from 'mint-ui';
	import util from "./../../api/util";
	var md5 = require('../../../static/js/md5');
	export default{
		name: 'forget-pwd',
		data(){
			return{
				phoneArea:[{
					area:'+86',
					num: '86',
					selected: true
				},{
					area:'+1',
					num: '1',
					selected: ''
				}],
				selected: '86',
				phoneNum: '',
				verifyNum: null,
				verifyCode: NaN,
				newPassword: '',
				newPasswordAgain: '',
				show: true,
				timer: null,
				count: '',

			}
		},
		methods:{
			goabck(){
				router.go(-1);
			},
			//获取验证码
			getCode(){
				if(this.phoneNum == ''){
					Toast({
						message: '请输入手机号',
						position: 'bottom',
						duration: 2000
					});
					return false
				}
				var re=new RegExp(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
				var retu = this.phoneNum.match(re);
				if(retu){
					console.log('验证成功');
					var timestamp = Date.parse(new Date()) / 1000;
					var md = md5(this.selected + this.phoneNum + timestamp + 'fcgj');
					
					let _this = this;
					util.request({
						url: "sms.register",
						data: {
							"country"   : _this.selected,
							"mobile"    : _this.phoneNum,
							"timestamp" : timestamp,
							"token"     : md
						},
						method: "post",
						success(res) {
							const TIME_COUNT = 60;
							if (!_this.timer) {
								_this.count = TIME_COUNT;
								_this.show = false;
								_this.timer = setInterval(() => {
									if (_this.count > 0 && _this.count <= TIME_COUNT) {
										_this.count--;
									} else {
										_this.show = true;
										clearInterval(_this.timer);
										_this.timer = null;
									}
								}, 1000)
							};
							Toast({
								message: '获取验证码成功',
								position: 'bottom',
								duration: 2000
							});
							console.log(res);
							_this.verifyCode = res.data.code;
							console.log(res.data.code)
						},
						error(err){
							Toast({
								message: '获取验证码失败',
								position: 'bottom',
								duration: 2000
							});
						}
					});
				}else{
					console.log('验证失败------------------------');
					Toast({
						message: '手机号码不正确',
						position: 'bottom',
						duration: 2000
					});
				}
			},
			//提交密码
			submit(){
				if(this.verifyNum != this.verifyCode){
					Toast({
						message: '验证码不正确',
						position: 'bottom',
						duration: 2000
					});
					return false
				};
				if(this.newPassword == ''){
					Toast({
						message: '密码不能为空',
						position: 'bottom',
						duration: 2000
					});
					return false
				}else{
					var reg = new RegExp(/^(\w){6,20}$/);
					var passCheck = this.newPassword.match(reg);
					if(passCheck){
						console.log('---------pass--------')
					}else{
						Toast({
							message: '密码格式不对',
							position: 'bottom',
							duration: 2000
						});
						return false
					}
				};
				if(this.newPassword != this.newPasswordAgain){
					Toast({
						message: '密码不一致，请重输',
						position: 'bottom',
						duration: 2000
					});
					return false
				};

				var timestamp = Date.parse(new Date()) / 1000;
				var md2 = md5(this.selected + this.phoneNum + timestamp + 'fcgj');
				let _this = this;
				util.request({
					url: "account.forget",
					data: {
						"country"   : _this.selected,
						"mobile"    : _this.phoneNum,
						"verifycode": _this.verifyNum,
						"pwd"       : _this.newPassword,
						"timestamp" : timestamp,
						"token"     : md2
					},
					method: "post",
					success(res) {
						Toast({
							message: '修改密码成功',
							position: 'bottom',
							duration: 2000
						});
						console.log(res);
						router.push({path: '/loginPage'});
					},
					error(err){
						Toast({
							message: '修改密码失败',
							position: 'bottom',
							duration: 2000
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/common.scss';
	@import '../../static/css/comment.scss';
	.forget-wap{
		width: 100%;
		padding: 20px 20px 40px;
		.forgetHead{
			// background: yellow;
			position: relative;
			.icon{
				position: absolute;
				left: 0;
				top: 0;
				line-height: 40px;
				color: $orange;
				font-size: 20px;
			}
			.headText{
				text-align: center;
				display: inline-block;
				width: 100%;
				// background: red;
				line-height: 40px;
				color: $orange;
			}
		}

		.forget-cont{
			padding: 20px 10px;
			// background: blue;
			height: 200px;
			.phone{
				border: 1px solid $orange;
				border-radius: 10px;
				padding: 10px 0;
				.numSelect{
				}
				.phonenumber{
					width: 50%;
					// background: red;
				}
				.getVerify{
					background: $orange;
					border-radius: 5px;
					width: 28%;
					color: $white;
					&.hasget{
						background: $gray;
					}
				}
			}

			.verification,.newPwd,.newPwdAgain{
				margin-top: 10px;
				padding: 10px 0;
				border: 1px solid $orange;
				border-radius: 10px;
				.icon{
					// background: red;
					color: $orange;
					display: inline-block;
					width: 55px;
					text-align: center;
					font-size: 20px;
				}
			}

			.submit-con{
				margin-top: 30px;
				padding: 10px 0;
				background: $orange;
				width: 100%;
				text-align: center;
				color: $white;
				border-radius: 10px;
			}

		}
	}
</style>