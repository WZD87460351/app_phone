<template>
	<div class="cont-wap">
	<!-- 发布的住房列表 -->
		<div class="houseDetail">
			<div class="houseSearch">
				<i class="icon iconfont_fc icon-fc_fanhui1" @click="goback"></i>
				<input type="text" placeholder="任何目的地-房源">
			</div>

			<div class="sortPart">
				<div class="sor">排序</div>
				<div class="filterCondition">筛选条件</div>
			</div>

			<div class="filterResult">
				<h3>住房</h3>
				<div class="wrapper" ref="room_scroll">
					<ul class="filterdetails">
						<li v-for="item in newlist" @click="jump('/RoomDetail')">
							<img class="exhibitImg" :src="item.imgsrc" alt="">
							<p class="descri">{{item.descri}}</p>
							<p class="address">{{item.address}}</p>
							<p class="price">{{item.price}}</p>
							<div class="avatar" v-if="item.avatar">
								<div class="avaImg">
									<img :src="item.avatar" alt="">
									<img class="sexicon" src="../../../static/img/home-female.png" alt="" v-if="item.sex == 'female'">
									<img class="sexicon" src="../../../static/img/home-male.png" alt="" v-else>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router';
	import BScroll from "better-scroll";
	export default{
		name: 'roomList',
		data(){
			return{
				newlist:[{
					imgsrc: '../../../static/img/home-roomlist01.png',
					descri: '整套房子-2室2卫',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				},{
					imgsrc: '../../../static/img/home-roomlist02.png',
					descri: '整套房子-2室2卫',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				},{
					imgsrc: '../../../static/img/home-roomlist01.png',
					descri: '整套房子-2室2卫',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				},{
					imgsrc: '../../../static/img/home-roomlist02.png',
					descri: '整套房子-2室2卫',
					address: '江苏省无锡市滨湖区元一希尔顿',
					price: '¥900/月'
				}]
			}
		},
		mounted(){
			setTimeout(() => {
				this.room_scroll()
			}, 20);
		},
		methods:{
			jump:function(url){
				router.push({path:url});
			},
			goback:function(){
				router.go(-1);
			},
			room_scroll(){
				this.roomScroll = new BScroll(this.$refs.room_scroll,{
					scrollY: true,
					click: true
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	// @import '../../static/css/iconfont.css';
	.cont-wap{
		.houseDetail{
			padding: 0 15px 80px;
			background: $white;
			position: fixed;
			top: 0;
			left: 0;
			right:0;
			bottom:0;
			width: 100%;
			z-index: 3000;
			.houseSearch{
				// background: purple;
				padding: 10px ;
				box-shadow: 2px 4px 6px #e7e7e7;
				input{
					width: 80%;
					outline: none;
					background: none;
					border: none;
				}
			}
			.sortPart{
				padding: 15px 0;
				.sor{
					display: inline-block;
					padding: 0 11px;
					line-height: 22px;
					border: 1px solid $roomselected;
				}
				.filterCondition{
					display: inline-block;
					padding: 0 11px;
					line-height: 22px;
					border: 1px solid $roomselected;
				}
			}
			.filterResult{
				position: relative;
				// background: yellow;
				height: calc(100% - 50px);
				h3{
					line-height: 40px;
				}
				.wrapper{
					// height: 100%;
					position: absolute;
					top: 40px;
					left: 0;
					right: 0;
					bottom: 0;
					overflow: hidden;
					.filterdetails{
						li{
							padding: 15px 0;
							position: relative;
							.exhibitImg{
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
	}
</style>