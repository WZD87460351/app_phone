<template>
	<div class="cont-wap">
		<div class="mycollect-wap">
			<div class="header clearfix">
				<div class="leftBar"><i class="icon iconfont_fc icon-fc_fanhui1" @click="goBack"></i></div>
				<div class="rightBar">保存</div>
			</div>
			<div class="collect-cont">
				<h3>我的收藏</h3>
				<ul class="details">
					<li v-for="item in collectlist" @click="jump">
						<img class="deImg" :src="item.imgsrc" alt="">
						<p class="descri">{{item.descri}}</p>
						<p class="address">{{item.address}}</p>
						<p class="price">{{item.price}}</p>
						<div class="avatar" v-if="item.avatar">
							<div class="avaImg">
								<img class="ava_Img" :src="item.avatar" alt="">
								<img class="sexicon" src="../../../static/img/home-female.png" alt="" v-if="item.sex == 'female'">
								<img class="sexicon" src="../../../static/img/home-male.png" alt="" v-else>
							</div>
						</div>
					</li>
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router';
	export default{
		name: 'my-collect',
		data(){
			return{
				collectlist:[{
					imgsrc: '../../../static/img/home-roomlist01.png',
					avatar: '../../../static/img/home-avatar.png',
					sex: 'female',
					descri: '五花，爱吃肉   139999999',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				},{
					imgsrc: '../../../static/img/home-roomlist02.png',
					avatar: '../../../static/img/home-avatar.png',
					sex: 'male',
					descri: '五花，爱吃肉   139999999',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				},{
					imgsrc: '../../../static/img/home-roomlist01.png',
					avatar: '../../../static/img/home-avatar.png',
					sex: 'female',
					descri: '五花，爱吃肉   139999999',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				},{
					imgsrc: '../../../static/img/home-roomlist02.png',
					avatar: '../../../static/img/home-avatar.png',
					sex: 'male',
					descri: '五花，爱吃肉   139999999',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				}]
			}
		},
		methods:{
			jump:function(){
				router.push({path:'/RoomDetail'});
			},
			goBack:function(){
				router.go(-1);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.cont-wap{
		.mycollect-wap{
			.header{
				padding: 15px;
				.rightBar{
					font-size: 17px;
				}
			}
			.collect-cont{
				padding: 0 15px;
				.details{
					li{
						padding: 15px 0;
						position: relative;
						.deImg{
							width: 100%;
						}
						.descri{
							font-size: 14px;
							padding: 10px 0;
						}
						.address{
							font-size: 16px;
							font-weight: bold;
						}
						.price{
							font-size: 16px;
							padding: 10px 0;
							font-weight: 300;
						}
						.avatar{
							position: absolute;
							bottom: 15%;
							right: 0;
							width: 45px;
							.avaImg{
								position: relative;
								.ava_Img{
									width: 100%;
								}
								.sexicon{
									position: absolute;
									right: 0;
									bottom:-10px;
									width: 40%;
								}
							}
						}
					}
				}
			}
		}
	}
</style>