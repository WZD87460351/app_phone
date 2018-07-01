<template>
	<div class="loginPage">
		<div class="goback">
			<i class="icon iconfont icon-fc_fanhui" @click="goback"></i>
			<p class="title">登录</p>
		</div>
		<p class="slogan">你好！<br>欢迎回来</p>
		<div class="inputSection clearfix">
			<div class="phoneNum">
				<select v-model="selected"> 
					<option v-for="item in phoneArea" :value="item.num">{{item.area}}</option> 
				</select> 
				<input type="text" placeholder="手机号" v-model="phoneNum">
			</div>
			<div class="passwordNum">
				<input type="password" placeholder="密码" v-model="passWord">
			</div>
			<div class="forgetPassword rightBar" @click="jump('/ForgetPwd')">忘记了密码？</div>
		</div>
		<div class="btns">
			<div class="startBtn" @click="login">开始</div>
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
	export default{
		name: 'login-page',
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
				passWord: '',
			}
		},
		methods:{
			goback(){
				router.go(-1);
			},
			jump(url){
				router.push({path: url});
			},
			login(){
				if(this.phoneNum == ''){
					Toast({
						message: '请输入手机号码',
						position: 'bottom',
						duration: 2000
					});
					return false
				}
				if(this.passWord == ''){
					Toast({
						message: '请输入密码',
						position: 'bottom',
						duration: 2000
					});
					return false
				}

				let _this = this;
				util.request({
					url: "account.login",
					data: {
						"country": _this.selected,
						"mobile": _this.phoneNum,
						"pwd": _this.passWord
					},
					method: "post",
					success(res) {
						console.log(res);
						console.log(res.data.code);
						Toast({
							message: '登陆成功',
							position: 'bottom',
							duration: 2000
						});
						router.push({path: '/mainHome'})
					},
					error(err){
						Toast({
							message: '登陆失败',
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
				input{
					border: none;
					background: none;
					outline: none;
					font-size:16px;
					width: 80%;
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
			.forgetPassword{
				line-height:30px;
				font-size: 16px;
				color: $orange;
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