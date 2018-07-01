<template>
	<div class="header clearfix">
		<div class="logoAddress clearfix" v-if="showIf">
			<div class="CorporateLogo"><i class="icon iconfont icon-shoucang"></i></div>
			<div class="citySelect">
				<div class="cityName">{{CurrentCity}}</div>
			</div>
		</div>

		<div class="searchPart clearfix" v-else>
			<i class="icon iconfont icon-qiehuan"></i>
			<form action="">
				<input type="text" placeholder="你想住哪儿">
			</form>
		</div>

		<div class="login">
			<i class="icon iconfont icon-xiaoxi"></i>
		</div>

	</div>
</template>

<script>
export default{
	data(){
		return{
			CurrentCity: '北京',
			showIf: false
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../static/css/comment.scss';
@import '../../static/css/common.scss';

.header{
	width: 100%;
	height: 40px;
	padding: 0 10px;
	background: $gray;
	position: fixed;
	top: 0;
	left: 0;
	.logoAddress{
		float: left;
		margin-top: 5px;
		// background:green;
		.CorporateLogo{
			float: left;
			height: 30px;
			width: 60px;
			// background: red;
		}
		.citySelect{
			float: left;
			height: 30px;
			width: 30px;
			@include bottomTriangle(black,5px);
			.cityName{
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
	}

	.searchPart{
		float: left;
		margin-top: 5px;
		background: #fff;
		height: 30px;
		width: 90%;
		border-radius: 15px;
		>i{
			display: inline-block;
			margin: 6px 10px 6px 15px;
		}
		>form{
			display: inline-block;
			input{
				outline: none;
				border: none;
				width: 200px;
				background:none;
			}
		}
	}

	.login{
		float: right;
		margin-top: 5px;
		background: yellow;
		line-height: 30px;
		font-size: 20px;

	}



}
</style>