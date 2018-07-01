<template>
	<div class="cont-wap">
		<!-- 房源详情页 -->
		<div class="detail-wap">
			<!-- <img :src="imgUrl" alt="" class="mainImg"> -->
			<div class="swipe-wrapper">
				<mt-swipe :auto="2000" ref="swipeWrapper">
					<mt-swipe-item class="swip-item" v-for="ite in rotateMap">
						<img :src="ite.imgsrc" alt="" class="rotateImg">
					</mt-swipe-item>
				</mt-swipe>
				<div class="backBtn" @click="goback">
					<i class="icon iconfont_fc icon-fc_fanhui1"></i>
				</div>
			</div>
			<div class="desc-wap">
				<p class="apartType">整套公寓</p>
				<h3 class="apartName">LJFTNJ公寓-cinh</h3>
				<ul class="roomCont clearfix">
					<li>
						<img src="../../../static/img/roomdetail-peoplecount.png" alt="">
						<span>最多住3人</span>
					</li>
					<li>
						<img src="../../../static/img/roomdetail-bedroom.png" alt="">
						<span>1间卧室</span>
					</li>
					<li>
						<img src="../../../static/img/roomdetail-bed.png" alt="">
						<span>2张床</span>
					</li>
					<li>
						<img src="../../../static/img/roomdetail-bathroom.png" alt="">
						<span>1间卫生间</span>
					</li>
				</ul>
				<h4 class="convenTitle">便利设施</h4>
				<ul class="conveniences">
					<li>
						<img src="../../../static/img/roomdetail-restrant.png" alt="">
					</li>
					<li>
						<img src="../../../static/img/roomdetail-wifi.png" alt="">
					</li>
					<li>
						<img src="../../../static/img/roomdetail-washing.png" alt="">
					</li>
					<li>
						<img src="../../../static/img/roomdetail-television.png" alt="">
					</li>
					<li>
						<img src="../../../static/img/roomdetail-hairdryer.png" alt="">
					</li>
					<li>
						+15
					</li>
				</ul>
			</div>

			<div class="amap-wrapper">
				<!-- <el-amap class="amap-box" vid="amapDemo" :zoom="zoom" :center="center">
					<el-amap-marker v-for="marker in markers" :position="marker.position"></el-amap-marker>
				</el-amap> -->

				<!-- <gmap-map :center="center" :zoom="7" style="width: 500px; height: 300px">
					<gmap-marker
						:key="index"
						v-for="(m, index) in markers"
						:position="m.position"
						:clickable="true"
						:draggable="true"
						@click="center=m.position"
					></gmap-marker>
				</gmap-map> -->


			</div>

			<div class="checkInOut clearfix">
				<div class="leftBar checkIn">
					<div class="intitle">入住时间</div>
					<div class="intime">12:00</div>
				</div>
				<div class="rightBar checkOut">
					<div class="outtitle">退房时间</div>
					<div class="outtime">12:00</div>
				</div>
			</div>

			<div class="bookCol clearfix">
				<div class="leftBar">
					<div class="price"><span>¥500</span>每晚</div>
					<div class="priceDetail">价格明细</div>
				</div>
				<div class="rightBar">
					<div class="btn">立即预订</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import router from '../../router';
	export default{
		name:'roomDetail',
		data(){
			return{
				rotateMap: [{
					imgsrc:'../../../static/img/home-banner.png',
					tuid: 0
				},{
					imgsrc:'../../../static/img/home-banner.png',
					tuid: 1
				}],
				center: {lat: 10.0, lng: 10.0},
				markers: [{
					position: {lat: 10.0, lng: 10.0}
				}, {
					position: {lat: 11.0, lng: 11.0}
				}]
			}
		},
		mounted(){
			this.load();
		},
		methods:{
			goback(){
				router.go(-1);
			},
			// createMap(){
			// 	var mapType = google.maps.MapTypeId.ROADMAP;
			// 	var lat = 39.915168, lng = 116.403875, zoom = 10;
			// 	var mapOptions = {
			// 		center: new google.maps.LatLng(lat, lng),  //地图的中心点
			// 		zoom: zoom,               　　　　　　　　　　//地图缩放比例
			// 		mapTypeId: mapType,       　　　　　　　　　　//指定地图展示类型：卫星图像、普通道路
			// 		scrollwheel: true          　　　　　　　　　 //是否允许滚轮滑动进行缩放
			// 	};
			// 	var map = new google.maps.Map(document.getElementById("map"), mapOptions); //创建谷歌地图

			// 	var marker = new google.maps.Marker({
			// 		map: map,
			// 		position: new google.maps.LatLng(lat, lng)
			// 	});
			// },
			
			load() {     //加载地图   
				if (GBrowserIsCompatible()) {    
					var map = new GMap2(document.getElementById("map"));    
					map.addControl(new GSmallMapControl());    //放大缩小   
					map.addControl(new GMapTypeControl());     //地图种类   
					map.enableScrollWheelZoom();    //启用鼠标滚轮   
					map.setCenter(new GLatLng(39.9000, 116.3000), 6);   //地图坐标 三个参数分别为 "纬度" "经度" "比例尺"   
					
					function createMarker(point, address,name,tel) {  //创建标记内容及标记的鼠标事件   
						var marker = new GMarker(point);   
						var html = '<div>'+   
							'<a >Name:'+ name +'</a><br/>'+   
							'<a >Address:'+address +'</a><br/>'+   
							'<a >telephone:'+tel +'</a>'+   
							'</div>';   
						GEvent.addListener(marker, "mouseover", function() {   
							marker.openInfoWindowHtml(html);   
						});
						GEvent.addListener(marker, "mouseout", function() {   
							marker.closeInfoWindow();   
						});
						GEvent.addListener(marker, "click", function() {   
							map.setCenter(point, 12);    
						});
						return marker;
					}
					var point = new GLatLng(39.9000,116.3000);     // 设置标记   
					map.addOverlay(createMarker(point,'beijing','sh','123456'));//加入标记   
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.cont-wap{
		.detail-wap{
			.swipe-wrapper{
				width: 100%;
				height: 260px;
				position: relative;
				.backBtn{
					position: absolute;
					top: 10px;
					left: 10px;
					background: $orange;
					opacity: .8;
					height: 30px;
					width: 30px;
					border-radius: 50%;
					text-align: center;
					line-height: 30px;
				}
			}
			.desc-wap{
				padding: 0 15px 17px;
				.apartType{
					font-size: 15px;
					line-height: 28px;
				}
				.apartName{
					color:$gray;
					padding-bottom: 10px;
				}
				.roomCont{
					li{
						float: left;
						width: 50%;
						padding: 10px 0;
						&:nth-child(3){
							img{
								margin-top: 3px;
							}
						}
						img{
							width: 15px;
						}
						span{
							font-size: 15px;
							margin-left: 14px;
						}
					}
				}
				.convenTitle{
					color: $gray;
					line-height: 40px;
				}
				.conveniences{
					display: flex;
					li{
						flex: 1;
						&:nth-child(6){
							color:$orange;
							font-size:16px;
							text-align: center;
						}
						img{
							height: 17px;
						}
					}
				}
			}

			.amap-wrapper{
				width: 100%;
				height:175px;
			}

			.checkInOut{
				padding: 15px 15px 90px;
				font-size: 17px;
				.checkIn{
					.intime{
						line-height: 25px;
					}
				}
				.checkOut{
					.outtime{
						line-height: 25px;
					}
				}
			}

			.bookCol{
				padding: 15px;
				position: fixed;
				left: 0;
				bottom: 0;
				width: 100%;
				-webkit-box-shadow: 0px 0px 5px 5px #e5e5e5;
				box-shadow:0px 0px  5px 5px #e5e5e5;
				background: $white;
				z-index: 1000;
				.leftBar{
					.price{
						font-size: 17px;
						span{
							font-weight: bold;
						}
					}
					.priceDetail{
						font-size: 12px;
						color: $roomselected;
						line-height: 22px;
					}
				}
				.rightBar{
					.btn{
						width: 84px;
						line-height:30px;
						background: $orange;
						border-radius: 3px;
						text-align: center;
						color: $white;
						font-size: 17px;
					}
				}
			}
		}
	}
</style>