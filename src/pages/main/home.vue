<template>
	<div class="cont-wap">
		<!-- 首页 -->

		<div class="searchPar">
			<div class="search-wap">
				<label for="searchFrame"><i class="icon iconfont icon-sousuo"></i></label>
				<input type="text" placeholder='搜“温哥华”试试' id="searchFrame" @focus="jump('/SearchPage')">
			</div>
		</div>

		<div class="cont-sec">
			<div class="swipe-wrapper">
				<mt-swipe :auto="2000" ref="swipeWrapper">
					<mt-swipe-item class="swip-item" v-for="ite in rotateMap">
						<img :src="ite.thumb" alt="" class="rotateImg" @click="jump('/RoomDetail')">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="displayInfo">
				<h3>探索蜂巢</h3>
				<ul class="twoSearch clearfix">
					<li v-for="item in hivelist" @click="jump(item.routePath)">
						<img :src="item.imgsrc" alt="">
						<p>{{item.title}}</p>
					</li>
				</ul>
				<h3>最新消息</h3>
				<div class="twotaps clearfix">
					<div class="roomInfo leftBar" @click="changetap($event)" data-info="room" :class="{hasselected: tap === 'room'}">住房</div>
					<div class="roommateInfo leftBar" @click="changetap($event)" data-info="roommate" :class="{hasselected: tap === 'roommate'}">室友</div>
				</div>

				<ul class="details">
					<li v-for="item in pagelist" @click="jump('/RoomDetail')">
						<img :src="item.imgsrc" alt="">
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

		<main-footerNav></main-footerNav>
	</div>
</template>
<script>
	import MainFooterNav from '../../components/main/footer.vue';
	import router from '../../router';
	import { Toast } from 'mint-ui';
	import util from "./../../api/util";

	export default{
		name: 'home',
		data(){
			return{
				value:'',
				rotateMap: [{
					imgsrc:'../../../static/img/home-banner.png',
					tuid: 0
				},{
					imgsrc:'../../../static/img/home-banner.png',
					tuid: 1
				}],
				tap: 'room',
				showRoom: false,
				showMate: false,
				hivelist:[{
					id: 0,
					routePath: '/RoomList',
					imgsrc: '../../../static/img/home-room.png',
					title: '住宿'
				},{
					id: 1,
					routePath: '/RoommateList',
					imgsrc: '../../../static/img/home-roommate.png',
					title: '室友'
				}],
				pagelist:[],
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
				}],
				matelist:[{
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
		activated(){
			
		},
		created(){
			console.log("------------------------- created()")
		},
		mounted() {
			console.log('-----------------------------------mounted()');
			try{
				this.getRotateTu();
			}catch(err){
				console.log(err)
			}
			this.pagelist = this.newlist;
		},
		methods:{
			changetap(e){
				var that = this;
				that.tap = e.target.dataset.info;
				if(e.target.dataset.info == 'room'){
					that.pagelist = that.newlist;
				}else if(e.target.dataset.info == 'roommate'){
					that.pagelist = that.matelist;
				}
			},
			showRoomFun(ite){
				if(ite.id === 0){
					this.showRoom = true;
					setTimeout(() => {
						this.room_scroll()
					}, 20);
				}else if(ite.id === 1){
					this.showMate = true;
					setTimeout(() => {
						this.mate_scroll()
					}, 20);
				}
				
			},
			hideRoomFun(){
				this.showRoom = false;
			},
			hideMateFun(){
				this.showMate = false;
			},
			jump:function(url){
				router.push({path:url});
			},
			getRotateTu(){
				let _this = this;
				util.request({
					url: "fcgj.index.carousel",
					data: {},
					method: "post",
					success(res) {
						console.log(res)
						_this.rotateMap = res.data.data;
					}
				});
				// this.$http.post("https://fc.wshoto.com/app/wshoto_shop_v3_api.php?i=46&comefrom=app&r=fcgj.index.carousel",{},{emulateJSON: true})
				// .then(
				// 	(response)=>{ 
				// 		console.log("-----------success------------");
				// 		console.log(response.data);
				// 		if(response.status === 0){
				// 			console.log(response.data);
				// 			this.rotateMap = response.data;
				// 		}else{
				// 			Toast({
				// 				message: response.msg,
				// 				position: 'bottom',
				// 				duration: 2000
				// 			});
				// 		}
						
				// 	},
				// 	(error)=>{
				// 		console.log(error);
				// 		console.log("---------------error-----------------");
				// 	}
				// );
			},
			getNewRoomList(){
				this.$http.post("https://fcgj.wshoto.com/Api/house/houseList",{},{emulateJSON: true})
				.then(
					(response)=>{ 
						console.log("-----------success------------");
						if(response.body.status === 0){
							console.log(response.body.data);
							this.newlist = response.body.data;
						}else{
							Toast({
								message: response.body.msg,
								position: 'bottom',
								duration: 2000
							});
						}
						
					},
					(error)=>{
						console.log(error);
						console.log("---------------error-----------------");
					}
				);
			},
			getNewRoommateList(){
				this.$http.post("https://fcgj.wshoto.com/Api/room/roomList",{},{emulateJSON: true})
				.then(
					(response)=>{ 
						console.log("-----------success------------");
						if(response.body.status === 0){
							console.log(response.body.data);
							this.matelist = response.body.data;
						}else{
							Toast({
								message: response.body.msg,
								position: 'bottom',
								duration: 2000
							});
						}
						
					},
					(error)=>{
						console.log(error);
						console.log("---------------error-----------------");
					}
				);
			}
		},
		components: {
			MainFooterNav
		}
	};
</script>
<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.cont-wap{
		.searchPar{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			padding: 0 15px;
			z-index: 2000;
			.search-wap{
				padding: 10px;
				background: $white;
				border-radius: 3px;
				input{
					border: none;
					background: none;
					outline: none;
				}
			}
		}

		.cont-sec{
			width: 100%;
			.swipe-wrapper{
				width: 100%;
				height: 260px;
				.swip-item{
					width: 100%;
					.rotateImg{
						width: 100%;
					}
				}
			}
			.displayInfo{
				padding: 0 15px 80px;
				h3{
					text-align:left;
					color: $font;
					padding: 15px 0;
				}
				.twoSearch{
					li{
						float: left;
						width: 48%;
						&:nth-child(2){
							margin-left: 4%;
						}
						img{
							width: 100%;
						}
						p{
							font-size: 16px;
							font-weight: 600;
							color: $font;
							padding: 13px 0;
							text-indent: 10px;
						}
					}
				}
				.twotaps{
					div{
						font-size: 18px;
						color: $roomselnot;
						padding-bottom: 10px;
					}
					.roomInfo{
						margin-right: 25px;
					}
					.hasselected{
						color: $orange;
						border-bottom: 1px solid $orange;
					}
				}

				.details{
					li{
						padding: 15px 0;
						position: relative;
						img{
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

		// 住房搜索
		// .houseDetail{
		// 	padding: 0 15px 80px;
		// 	background: $white;
		// 	position: fixed;
		// 	top: 0;
		// 	left: 0;
		// 	right:0;
		// 	bottom:0;
		// 	width: 100%;
		// 	z-index: 3000;
		// 	.houseSearch{
		// 		// background: purple;
		// 		padding: 10px ;
		// 		box-shadow: 2px 4px 6px #e7e7e7;
		// 		input{
		// 			width: 80%;
		// 			outline: none;
		// 			background: none;
		// 			border: none;
		// 		}
		// 	}
		// 	.sortPart{
		// 		padding: 15px 0;
		// 		.sor{
		// 			display: inline-block;
		// 			padding: 0 11px;
		// 			line-height: 22px;
		// 			border: 1px solid $roomselected;
		// 		}
		// 		.filterCondition{
		// 			display: inline-block;
		// 			padding: 0 11px;
		// 			line-height: 22px;
		// 			border: 1px solid $roomselected;
		// 		}
		// 	}
		// 	.filterResult{
		// 		position: relative;
		// 		// background: yellow;
		// 		height: calc(100% - 50px);
		// 		h3{
		// 			line-height: 40px;
		// 		}
		// 		.wrapper{
		// 			// height: 100%;
		// 			position: absolute;
		// 			top: 40px;
		// 			left: 0;
		// 			right: 0;
		// 			bottom: 0;
		// 			overflow: hidden;
		// 			.filterdetails{
		// 				li{
		// 					padding: 15px 0;
		// 					position: relative;
		// 					.descri{
		// 						font-size: 14px;
		// 						padding: 10px 0;
		// 					}
		// 					.address{
		// 						font-size: 16px;
		// 						font-weight: bold;
		// 					}
		// 					.price{
		// 						font-size: 16px;
		// 						padding: 10px 0;
		// 						font-weight: 300;
		// 					}
		// 					.avatar{
		// 						position: absolute;
		// 						bottom: 15%;
		// 						right: 0;
		// 						width: 45px;
		// 						.avaImg{
		// 							position: relative;
		// 							.sexicon{
		// 								position: absolute;
		// 								right: 0;
		// 								bottom:-10px;
		// 								width: 40%;
		// 							}
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }

		// 室友搜索
		// .mateDetail{
		// 	padding: 0 15px 80px;
		// 	background: $white;
		// 	position: fixed;
		// 	top: 0;
		// 	left: 0;
		// 	right:0;
		// 	bottom:0;
		// 	width: 100%;
		// 	z-index: 3000;
		// 	.houseSearch{
		// 		// background: purple;
		// 		padding: 10px ;
		// 		box-shadow: 2px 4px 6px #e7e7e7;
		// 		input{
		// 			width: 80%;
		// 			outline: none;
		// 			background: none;
		// 			border: none;
		// 		}
		// 	}
		// 	.sortPart{
		// 		padding: 15px 0;
		// 		.sor{
		// 			display: inline-block;
		// 			padding: 0 11px;
		// 			line-height: 22px;
		// 			border: 1px solid $roomselected;
		// 		}
		// 		.filterCondition{
		// 			display: inline-block;
		// 			padding: 0 11px;
		// 			line-height: 22px;
		// 			border: 1px solid $roomselected;
		// 		}
		// 	}
		// 	.filterResult{
		// 		position: relative;
		// 		// background: yellow;
		// 		height: calc(100% - 50px);
		// 		h3{
		// 			line-height: 40px;
		// 		}
		// 		.wrapper{
		// 			// height: 100%;
		// 			position: absolute;
		// 			top: 40px;
		// 			left: 0;
		// 			right: 0;
		// 			bottom: 0;
		// 			overflow: hidden;
		// 			.filterdetails{
		// 				li{
		// 					padding: 15px 0;
		// 					position: relative;
		// 					.descri{
		// 						font-size: 14px;
		// 						padding: 10px 0;
		// 					}
		// 					.address{
		// 						font-size: 16px;
		// 						font-weight: bold;
		// 					}
		// 					.price{
		// 						font-size: 16px;
		// 						padding: 10px 0;
		// 						font-weight: 300;
		// 					}
		// 					.avatar{
		// 						position: absolute;
		// 						bottom: 15%;
		// 						right: 0;
		// 						width: 45px;
		// 						.avaImg{
		// 							position: relative;
		// 							.sexicon{
		// 								position: absolute;
		// 								right: 0;
		// 								bottom:-10px;
		// 								width: 40%;
		// 							}
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}
</style>
