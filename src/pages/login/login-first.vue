<template>
	<div class="loginPage">
		<div class="headTopImg clearfix">
			<img class="rightBar backImg" src="../../../static/img/login-tu-one.png" alt="">
		</div>
		
		<div class="header-loginBar">
			<i class="icon iconfont icon-shachu-xue leftBar"></i>
			<div class="loginBtn rightBar" @click="jump('/loginPage')">登录</div>
		</div>

		<div class="honeyImg">
			<img src="../../../static/img/login-tu-two.png" alt="">
			<div class="honeyText">给所有漂泊的人一个温暖的家</div>
		</div>

		<div class="btns clearfix">
			<button class="createBtn leftBar" @click="jump('/LoginRegistered')">创建账号</button>
			<button class="wechatBtn rightBar">微信账号登陆</button>
		</div>

	</div>
</template>

<script>
	import router from '../../router';
	export default{
		name: 'login-first',
		data(){
			return{

			}
		},
		methods: {
			jump(url){
				router.push({path:url});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	
	.loginPage{
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		.headTopImg{
			width: 100%;
			.backImg{
				max-width: 80%;
			}
		}
		.header-loginBar{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			padding: 20px 10px;
			font-size: 16px;
			color: $orange;
			font-size: 20px;
			.icon{
				font-size: 20px;
			}
			.loginBtn{
				font-weight: bolder;
			}
		}

		.honeyImg{
			position: absolute;
			left: 0;
			top: 65%;
			width: 100%;
			padding: 0 20px;
			>img{
				width: 40%;
			}
			.honeyText{
				color: $orange;
				font-size: 20px;
				font-weight: bolder;
				line-height: 40px;
			}
		}

		.btns{
			position: absolute;
			left: 0;
			bottom: 5%;
			width: 100%;
			padding: 0 20px;
			button{
				width: 48%;
				background: none;
				border-radius: 4px;
				font-size: 18px;
				line-height: 40px;
				font-weight: 600;
				box-sizing: border-box;
				border: 1px solid $orange;
				&.createBtn{
					color: $orange;
				}
				&.wechatBtn{
					background: $orange;
					color: #fff;
				}
			}
		}
	}

</style>