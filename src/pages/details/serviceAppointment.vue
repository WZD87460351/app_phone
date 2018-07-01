<template>
	<div class="cont-wap">
		<div class="bookDetails">
			<div class="head-wap clearfix">
				<div class="back leftBar" @click="goback"><i class="icon iconfont_fc icon-fc_fanhui1"></i></div>
				<div class="saveInfo rightBar" @click="reservate">保存</div>
			</div>
			<h3 class="mainTitle">服务预约</h3>
			<div class="serve">
				<p>服务</p>
				<p>{{getTitle()}}</p>
			</div>
			<div class="serveDetail">
				<p>服务详情{{serveInfo.sereveDetail}}</p>
				<input type="text" v-model="serveInfo.sereveDetail" placeholder="请输入服务详情">
				<mt-picker :slots="serverpick" @change="onValuesChange" :showToolbar="true"></mt-picker>
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
				<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
			</div>
			<div class="address">
				<p>地址</p>
				<input type="text" v-model="serveInfo.address" placeholder="请输入您的地址">
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router';
	export default{
		name: 'serviceAppointment',
		data(){
			return{
				serveInfo:{
					sereveDetail: '',
					phoneNum: '',
					zipCode: '',
					time: '',
					address: '',
					service_id: null,
				},
				startDate: new Date(),
				serveTitle:'',
				serverpick: [
					{
						flex: 1,
						values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
						className: 'slot1',
						textAlign: 'center'
					}
				],
				slots: [
					{
						flex: 1,
						values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
						className: 'slot1',
						textAlign: 'right'
					}, {
						divider: true,
						content: '-',
						className: 'slot2'
					}, {
						flex: 1,
						values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
						className: 'slot3',
						textAlign: 'left'
					}
				]

			}
		},
		activated(){
			let page = this;
			// page.$nextTick(() => {
			// 	page.getDetail();
			// })
		},
		created(){
		},
		beforeRouteLeave(to, from, next) {
			if (to.path == "/mainService") {
				to.meta.keepAlive = true;
				console.log("jump----------------");
			} else {
				to.meta.keepAlive = false;
			}
			next();  
		},
		mounted(){
		},
		methods:{
			onValuesChange(picker, values) {
				if (values[0] > values[1]) {
					picker.setSlotValue(1, values[0]);
				}
			},
			handleConfirm: function(){
				console.log(this.pickerValue)
			},
			goback(){
				router.go(-1);
			},
			jump(url){
				router.push({path: url})
			},
			getTitle(){
				this.serveInfo.service_id = this.$route.query.service_id;
				// console.log(this.serveInfo.service_id);
				// console.log(this.serveInfo.serveTitle);
				return this.serveInfo.serveTitle = this.$route.query.title_name;
			},
			getDetail(){
				this.$http.post("http://fcgj.wshoto.com/Api/service/serviceList",{"service_id": this.serveInfo.service_id},{emulateJSON: true})
				.then(
					(response)=>{
						console.log(response.body); 
						console.log("-----------success------------"); 
					},
					(error)=>{
						console.log(error);
						console.log("---------------error-----------------");
					}
				);
			},
			reservate(){
				this.jump('/Payment');
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/common.scss';
	@import '../../static/css/comment.scss';
	.cont-wap{
		.bookDetails{
			background: $white;
			padding: 0 15px;
			.head-wap{
				padding: 15px 0;
				// background: $orange;
				.back{
					i{
						font-size: 20px;
					}
				}
				.saveInfo{
					font-size: 20px;
				}
			}
			.mainTitle{
				font-size: 26px;
				line-height: 54px;
				// background: red;
				font-weight: 200;
			}
			.serve,.serveDetail,.phoneNumber,.zipCode,.time,.address{
				padding: 15px 0;
				font-size: 17px;
				:first-child{
					margin-bottom: 10px;
				}
				input{
					border: none;
					outline: none;
				}
			}
		}
	}

</style>