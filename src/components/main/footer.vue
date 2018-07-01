<template>
	<div class="footer">
		<router-link to="/mainHome" class="footerNav home">
			<i class="icon iconhome"></i>
			<p>首页</p>
		</router-link>

		<router-link to="/mainService" class="footerNav service">
			<i class="icon iconservice"></i>
			<p>服务</p>
		</router-link>

		<router-link to="/mainRelease" class="footerNav release">
			<i class="icon iconrelease"></i>
			<p>发布</p>
		</router-link>
		
		<router-link to="/mallIndex" class="footerNav mall">
			<i class="icon iconmall"></i>
			<p>商城</p>
		</router-link>
		
		<router-link to="/mainMy" class="footerNav mine">
			<i class="icon iconmine"></i>
			<p>我的</p>
		</router-link>
	</div>
</template>
<script>
	
	export default{
		name: 'd-footer'
	};

</script>
<style lang='scss' scoped>
	@import '../../static/css/comment.scss';
	.footer{
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		height: 50px;
		border-top:1px solid #E3E3E3;
		display:flex;
		display:-webkit-flex;
		z-index: 2000;
		background: $white;
		.footerNav{
			flex:1;
			text-align: center;
			vertical-align: middle;
			justify-content: center;
			padding:8px 0;
			color:#7D8790;
			text-decoration:none;
			p{
				font-size:12px;
			}
			i.icon{
				display: block;
				height: 25px;
				width: 25px;
				// background: yellow;
				margin: 0 auto;
				// padding-bottom: 3px;
				background-size: 25px auto;
				background-repeat: no-repeat;
			}
		}
		.my-active{
			color:$orange !important;
			text-decoration:none !important;
		}
		// 背景图片
		.iconhome{
			background: url('../../../static/img/footer_home.png');
		}
		.iconservice{
			background: url('../../../static/img/footer_service.png');
		}
		.iconrelease{
			background: url('../../../static/img/footer_release.png');
		}
		.iconmall{
			background: url('../../../static/img/footer_mall.png');
		}
		.iconmine{
			background: url('../../../static/img/footer_myown.png');
		}

		.my-active .iconhome{
			background: url('../../../static/img/footer_home1.png');
		}
		.my-active .iconservice{
			background: url('../../../static/img/footer_service1.png');
		}
		.my-active .iconrelease{
			background: url('../../../static/img/footer_release1.png');
		}
		.my-active .iconmall{
			background: url('../../../static/img/footer_mall1.png');
		}
		.my-active .iconmine{
			background: url('../../../static/img/footer_myown1.png');
		}

	}
</style>