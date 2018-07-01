<template>
	<div class="loginPage">
		<div class="goback" @click="goback">
			<i class="icon iconfont icon-fc_fanhui"></i>
			<p class="title">注册</p>
		</div>
		<p class="slogan">你好！<br>欢迎回来</p>
		<div class="inputSection clearfix">
			<div class="phoneNum">
				<select v-model="selected"> 
					<option v-for="item in phoneArea" :value="item.num">{{item.area}}</option> 
				</select> 
				<input type="number" placeholder="手机号" v-model="phoneNum">
			</div>
			<div class="verification">
				<input type="number" placeholder="验证码" v-model="verifyNum">
				<button class="obtain rightBar" :class="{hasget : !show}" @click="getVerifiedCode" :disabled="!show">
					<span v-show="show">获取验证码</span>
					<span v-show="!show" class="count">{{count}} s</span>
				</button>
			</div>
			<div class="username">
				<input type="text" placeholder="用户名" v-model="userName">
			</div>
			<div class="passwordNum">
				<input type="password" placeholder="密码" v-model="passWord">
			</div>
			<div class="passwordAgain">
				<input type="password" placeholder="请再次输入密码" v-model="passWordAgain">
			</div>
		</div>
		<div class="btns">
			<div class="startBtn" @click="register">开始</div>
			<div class="or">OR</div>
			<div class="wechatBtn">
				<i class="icon iconfont icon-fc_weixin"></i>微信
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
		name: 'login-registered',
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
				passWord: '',
				passWordAgain: '',
				userName: '',
				timer: null,
				count: '',
				show: true
			}
		},
		methods:{
			goback(){
				router.go(-1);
			},
			IsTel(Tel){
				
			},
			getVerifiedCode(){
				var re=new RegExp(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
				var retu = this.phoneNum.match(re);
				if(retu){
					console.log('验证成功');
					var timestamp = Date.parse(new Date()) / 1000;
					// console.log(timestamp);
					var md = md5(this.selected + this.phoneNum + timestamp + 'fcgj');
					// this.$http.post("https://fcgj.wshoto.com/Api/index/smscode",{"country": this.selected,"phone": this.phoneNum,"timestamp": timestamp,"token": md},{emulateJSON: true})
					// .then(
					// 	(response)=>{ 
					// 		console.log("-----------success------------");
					// 		this.verifyCode = response.body.smscode;
					// 	},
					// 	(error)=>{
					// 		console.log(error);
					// 		console.log("---------------error-----------------");
					// 	}
					// );
					
					let _this = this;
					util.request({
						url: "sms.register",
						data: {
							"country": _this.selected,
							"mobile": _this.phoneNum,
							"timestamp": timestamp,
							"token": md
						},
						method: "post",
						success(res) {
							Toast({
								message: '获取验证码成功',
								position: 'bottom',
								duration: 2000
							});
							//发完验证码，button失效60秒
							const TIME_COUNT = 60;
							if(!_this.timer){
								_this.count = TIME_COUNT;
								_this.show = false;
								_this.timer = setInterval(() =>{
									if(_this.count > 0 && _this.count <= TIME_COUNT){
										_this.count--;
									}else{
										_this.show = true;
										clearInterval(_this.timer);
										_this.timer = null;
									}
								},1000)
							};
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
			register(){
				if(this.verifyNum != this.verifyCode){
					Toast({
						message: '验证码不正确',
						position: 'bottom',
						duration: 2000
					});
					return false
				};
				if(this.userName == ''){
					Toast({
						message: '用户名不能为空',
						position: 'bottom',
						duration: 2000
					});
					return false
				}else{
					var patrn=/^[a-zA-Z]{1,30}$/;
					if (!patrn.exec(this.userName)){
						Toast({
							message: '用户名不符合',
							position: 'bottom',
							duration: 2000
						});
						return false
					}
				}

				if(this.passWord == ''){
					Toast({
						message: '密码不能为空',
						position: 'bottom',
						duration: 2000
					});
					return false
				}else{
					var reg = new RegExp(/^(\w){6,20}$/);
					var passCheck = this.passWord.match(reg);
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

					
				}
				if(this.passWord != this.passWordAgain){
					Toast({
						message: '密码不一致，请重输',
						position: 'bottom',
						duration: 2000
					});
					return false
				};
				
				var timestamp = Date.parse(new Date()) / 1000;
				console.log(this.selected + this.phoneNum + timestamp + 'fcgj');
				var md2 = md5(this.selected + this.phoneNum + timestamp + 'fcgj');
				let _this = this;
				util.request({
					url: "account.register",
					data: {
						"country": _this.selected,
						"mobile": _this.phoneNum,
						"verifycode": _this.verifyNum,
						"pwd": _this.passWord,
						"nickname": _this.userName,
						"token": md2,
						"timestamp":timestamp
					},
					method: "post",
					success(res) {
						console.log(res);
						console.log(res.data.member);
						Toast({
							message: '注册成功',
							position: 'bottom',
							duration: 2000
						});
						router.push({path:'/loginPage'});
					},
					error(err){
						Toast({
							message: '注册失败',
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
	.loginPage{
		width: 100%;
		height: 100%;
		padding: 20px 20px 40px;
		.goback{
			color: $orange;
			.icon{
				font-size: 20px;
			}
			.title{
				font-size: 25px;
				line-height: 60px;
			}
		}
		.slogan{
			font-size: 25px;
		}

		.inputSection{
			padding-top: 45px;
			.phoneNum{
				// background: green;
				padding: 20px 0;
				select{
					outline: none;
					border: none;
				}
				input{
					border: none;
					background: none;
					outline: none;
					font-size:16px;
				}
			}
			.verification{
				padding: 20px 0;
				input{
					border: none;
					background: none;
					outline: none;
					font-size:16px;
				}
				.obtain{
					color: $orange;
					border: 1px solid $orange;
					border-radius: 5px;
					background: $white;
					width: 28%;
					line-height: 25px;
					&.hasget{
						border: 1px solid $gray;
						background: $gray;
						color: $white;
					}
				}
			}
			.username{
				padding: 20px 0;
				input{
					border: none;
					background: none;
					outline: none;
					font-size: 16px;
					width: 100%;
				}
			}
			.passwordNum{
				// background: yellow;
				padding: 20px 0;
				input{
					border: none;
					background: none;
					outline: none;
					font-size: 16px;
					width: 100%;
				}
			}
			.passwordAgain{
				padding: 20px 0;
				input{
					border: none;
					background: none;
					outline: none;
					font-size: 16px;
					width: 100%;
				}
			}
		}

		.btns{
			padding-top: 60px;
			width: 100%;
			color: $white;
			text-align: center;
			font-size: 18px;
			line-height: 50px;
			.startBtn{
				background: $orange;
				border-radius: 4px;
			}
			.or{
				color: $gray;
			}
			.wechatBtn{
				background: $blue;
				border-radius: 4px;
				.icon{
					font-size: 24px;
					margin-right: 10px;
				}
			}
		}

	}

</style>