<template>
	<div class="releaseRoommate-wap">
		<div class="release-wap">
			<!-- <p class="release-title">发布</p> -->

			
			<!-- <div class="roommate">室友<i class="icon iconfont_fc icon-fc_xiala"></i></div> -->
			<div class="personalInfo">
				<h3 class="personalTitle">个人信息</h3>

				<div class="namePar clearfix">
					<div class="leftBar">
						<div class="nametitle">姓名</div>
						<div class="nameInp"><input type="text" v-model="releaseInfo.nickname"></div>
					</div>
					<!-- <div class="rightBar">
						<i class="icon iconfont_fc icon-fc_tianjia"></i>
					</div> -->
				</div>

				<div class="phoneNumPar">
					<div class="phoneTitle">手机号</div>
					<div class="phonenumInp"><input type="number" v-model="releaseInfo.phonenumber"></div>
				</div>

				<div class="addressPar" @click="setCity">
					<div class="addressTitle">地址</div>
					<div class="addressChose clearfix">
						<div class="leftBar"><input type="text" v-model="addressInfo" disabled></div>
						<div class="rightBar"><i class="icon iconfont_fc icon-fc_xiala"></i></div>
					</div>
				</div>

				<h3 class="personalTitle">室友状况</h3>

				<div class="sexPar" @click="setSex">
					<div class="sexTitle">性别</div>
					<div class="sexChoose clearfix">
						<div class="leftBar"><input type="text" v-model="releaseInfo.roommateSex" disabled></div>
						<div class="rightBar"><i class="icon iconfont_fc icon-fc_xiala"></i></div>
					</div>
				</div>

				<div class="agePar">
					<div class="ageTitle">年龄段</div>
					<div class="ageInp">
						<input type="number" value="" v-model="releaseInfo.ageStart">
						---
						<input type="number" value="" v-model="releaseInfo.ageEnd">
					</div>
				</div>

				<div class="expectPar">
					<div class="expectTitle">期望</div>
					<div class="expectInp"><input type="text" v-model="releaseInfo.expect"></div>
				</div>
			</div>
		</div>

		<mt-popup v-model="mypopup" position="bottom" class="cityPopup">
			<div class="userpopup">
				<div class="userpopup-tp clearfix">
					<span class="leftBar userpopup-lf" @click="cityCancel">取消</span>
					选择地址
					<span class="rightBar userpopup-lr" @click="cityConfirm">确定</span>
				</div>
				<mt-picker :slots="slots" value-key="aname" @change="cityValuesChange" class="myCityPopup"></mt-picker>
			</div>
		</mt-popup>

		<mt-popup v-model="sexpopup" position="bottom" class="cityPopup">
			<div class="userpopup">
				<div class="userpopup-tp clearfix">
					<span class="leftBar userpopup-lf" @click="sexCancel">取消</span>
					选择性别
					<span class="rightBar userpopup-lr" @click="sexConfirm">确定</span>
				</div>
				<mt-picker :slots="sexs" value-key="aname" @change="sexValuesChange" class="myCityPopup"></mt-picker>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import {address, slots} from '../../assets/js/address';
	export default{
		name: 'release-roommate',
		data(){
			return{
				releaseInfo:{
					nickname: '五花，爱吃肉',
					phonenumber: 15051985731,
					address: '省市区',
					roommateSex: '女',
					ageStart: 18,
					ageEnd: 30,
					expect: '写出你的期待'
				},
				mypopup:false,
				sexpopup: false,
				slots: slots,
				sexs: [{values:['男','女','不限']}],
				city:'',


			}
		},
		methods:{
			cityCancel(){
				this.mypopup = false;
			},
			cityConfirm(){
				this.mypopup = false;
				console.log(this.addressInfo)
			},
			setCity(){//所在城市显示
				this.initAddress()
				this.mypopup = true;
			},
			initAddress() {//城市初始化
				this.slots[0].values = address.filter((item, index) => {
					if (item.apid === 0) {
						return item;
					}
				});
			},
			cityValuesChange(picker, values) {
				let left=picker.getSlotValue(0)
				let center=picker.getSlotValue(1)
				let right=picker.getSlotValue(2)
				if(left){
					this.slots[1].values = address.filter(item => item.apid === left.aid ? true : false)
				}
				if(center){
					this.slots[2].values = address.filter(item => item.apid === center.aid ? true : false)
				}
				if(right){
					this.city=`${left['aname']} ${center['aname']} ${right['aname']}`
				}
			},
			sexCancel(){
				this.sexpopup = false;
			},
			sexConfirm(){
				this.sexpopup = false;
			},
			setSex(){
				this.sexpopup = true;
				console.log('1111111')
			},
			sexValuesChange(picker, values){
				// console.log(picker);
				// console.log(values);
				this.releaseInfo.roommateSex = values
			}
		},
		computed:{
			addressInfo(){
				if(this.city){
					return this.city
				}else {
					return '请输入地址'
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.releaseRoommate-wap{
		.release-wap{
			padding: 0 15px 80px;
			.release-title{
				text-align: center;
				color: $roomselnot;
				line-height: 44px;
				font-size: 18px;
			}
			.roommate{
				font-size: 20px;
				font-weight: 600;
				padding: 15px 0;
				.icon{
					margin-left: 8px;
					font-size: 10px;
					font-weight: 200;
				}
			}
			.personalInfo{
				font-size: 18px;
				.personalTitle{
					padding: 15px 0;
					margin-left: -10px;
					color: $orange;
				}
				.namePar{
					.leftBar{
						.nametitle{
							line-height: 35px;
						}
						.nameInp{
						}
					}
					.rightBar{
						.icon{
							font-size: 60px;
							font-weight: 100;
							color: $roomselnot;
						}
					}
				}

				.phoneNumPar{
					padding: 15px 0;
					.phoneTitle{
						line-height: 35px;
					}
				}

				.addressPar{
					padding: 15px 0;
					.addressTitle{
						line-height: 35px;
					}
					.addressChose{
						.leftBar{

						}
						.rightBar{
							.icon{
								font-size: 10px;
							}
						}
					}
				}

				.sexPar{
					padding: 15px 0;
					.sexTitle{
						line-height: 35px;
					}
					.sexChoose{
						.rightBar{
							.icon{
								font-size: 10px;
							}
						}
					}
				}

				.agePar{
					padding: 15px 0;
					.ageTitle{
						line-height: 35px;
					}
					.ageInp{
						input{
							width: 40%;
						}
					}
				}

				.expectPar{
					padding: 15px 0;
					.expectTitle{
						line-height: 35px;
					}
				}
			}
		}

		.cityPopup{
			.userpopup-tp{
				text-align: center;
			}
		}
	}
</style>