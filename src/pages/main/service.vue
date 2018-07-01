<template>
	<div class="cont-wap">
		<!-- 服务 -->
		<h3 class="waptitle">服务</h3>
		<div class="cont-items">
			<ul class="clearfix">
				<li v-for="item of list" class="leftBar" @click="jump('/ServiceAppointment',item)">
					<img :src="item.imgPath" alt="">
					<p>{{item.term}}</p>
				</li>

				<li class="leftBar furnitureMall" @click="jump('/mallIndex','')">
					<i class="icon iconfont_fc icon-fc_service"></i>
					<p>家具商城</p>
				</li>
			</ul>
		</div>

		<!-- <div class="bookDetails" v-show="">
			<div class="head-wap clearfix">
				<div class="back leftBar" @click="hideBookDetail"><i class="icon iconfont icon-shachu-xue"></i></div>
				<div class="saveInfo rightBar">保存</div>
			</div>
			<h2>服务预约</h2>
			<div class="serve">
				<p>服务</p>
				<p>{{serveTitle}}</p>
			</div>
			<div class="serveDetail">
				<p>服务详情{{serveInfo.sereveDetail}}</p>
				<input type="text" v-model="serveInfo.sereveDetail" placeholder="请输入服务详情">
			</div>
			<div class="phoneNumber">
				<p>电话{{serveInfo.phoneNum}}</p>
				<input type="number" v-model="serveInfo.phoneNum" placeholder="请输入电话号码">
			</div>
			<div class="zipCode">
				<p>邮编</p>
				<input type="number" v-model="serveInfo.zipCode" placeholder="请输入邮政编码">
			</div>
			<div class="time">
				<p>时间</p>
				<input type="text" v-model="serveInfo.time" placeholder="请输入预约时间">
				<mt-datetime-picker
				ref="picker" 
				type="time"
				@confirm="handleConfirm" 
				v-model="serveInfo.time"
				style="display: block;"
				:startDate="startDate">
				</mt-datetime-picker>
			</div>
			<div class="address">
				<p>地址</p>
				<input type="text" v-model="serveInfo.address" placeholder="请输入您的地址">
			</div>
		</div> -->

		<main-footerNav></main-footerNav>
	</div>
</template>
<script>
	import router from '../../router';
	import MainFooterNav from '../../components/main/footer.vue';
	export default{
		name: 'service',
		data(){
			return{
				list:[{
					term: '除草',
					service_id: 1,
					imgPath: '../../../static/img/service_weeding.png',
					selectedPath: '../../../static/img/service_weeding_selected.png'
				},{
					term: '除雪',
					service_id: 2,
					imgPath: '../../../static/img/service_removesnow.png',
					selectedPath: '../../../static/img/service_removesnow_selected.png'
				},{
					term: '搬家',
					service_id: 4,
					imgPath: '../../../static/img/service_movehouse.png',
					selectedPath: '../../../static/img/service_movehouse_selected.png'
				},{
					term: '打扫',
					service_id: 3,
					imgPath: '../../../static/img/service_clean.png',
					selectedPath: '../../../static/img/service_clean_selected.png'
				},{
					term: '维修',
					service_id: 6,
					imgPath: '../../../static/img/service_repair.png',
					selectedPath: '../../../static/img/service_repair_selected.png'
				},{
					term: '保险',
					service_id: 7,
					imgPath: '../../../static/img/service_insurance.png',
					selectedPath: '../../../static/img/service_insurance_selected.png'
				},{
					term: '法务',
					service_id: 8,
					imgPath: '../../../static/img/service_legalaffairs.png',
					selectedPath: '../../../static/img/service_legalaffairs_selected.png'
				}]
			}
		},
		methods:{
			jump:function(url,ite){
				// if(ite){
				// 	router.push({
				// 		path:url,
				// 		query:{
				// 			title_name:ite.term,
				// 			service_id: ite.service_id
				// 		}
				// 	})
				// }else{
				// 	router.push({
				// 		path:url
				// 	})
				// }
				// 
				router.push({
						path:url,
						query:{
							title_name:ite.term,
							service_id: ite.service_id
						}
					})
			}
		},
		components: {
			MainFooterNav
		}
	};
</script>
<style lang="scss" scoped>
	@import '../../static/css/common.scss';
	@import '../../static/css/comment.scss';
	.cont-wap{
		// background: pink;
		padding: 62px 25px;
		.waptitle{
			line-height: 50px;
		}
		.cont-items{
			ul{
				li{
					width: 50%;
					text-align: center;
					padding: 30px 0;
					&.furnitureMall{
						.icon{
							font-size: 45px;
							color: $orange;
						}
					}
					img{
						width:30%;
						height: 45px;
					}
					p{
						font-size: 18px;
						line-height: 50px;
						letter-spacing: 5px;
					}
				}
			}
		}

	}
</style>
