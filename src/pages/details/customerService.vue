<template>
	<div class="cont-wap">
		<div class="customer-wap">
			<div class="header clearfix">
				<div class="leftBar"><i class="icon iconfont icon-fc_fanhui1" @click="goback"></i></div>
				<div class="rightBar">保存</div>
			</div>
			my CustomerService page
		</div>
		
	</div>
</template>

<script>
	import router from '../../router';
	export default{
		name: 'myCustomerService-page',
		data(){
			return{

			}
		},
		methods:{
			goback(){
				router.go(-1);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.cont-wap{
		.customer-wap{
			padding: 0 15px;
			.header{
				padding: 15px 0;
				.rightBar{
					font-size: 17px;
				}
			}
		}
	}

</style>