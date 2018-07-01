<template>
	<div class="releaseRoom-wap">
		<div class="release-wap">
			<!-- <p class="release-title">发布</p> -->

			
			<!-- <div class="roommate">室友<i class="icon iconfont_fc icon-fc_xiala"></i></div> -->
			<div class="personalInfo">
				<h3 class="personalTitle">房源信息</h3>

				<div class="namePar clearfix">
					<div class="leftBar">
						<div class="nametitle">姓名</div>
						<div class="nameInp"><input type="text" value="五花，爱吃肉"></div>
					</div>
					<div class="rightBar">
						<i class="icon iconfont_fc icon-fc_tianjia"></i>
					</div>
				</div>

				<div class="phoneNumPar">
					<div class="phoneTitle">手机号</div>
					<div class="phonenumInp"><input type="text" value="456564445198"></div>
				</div>

				<div class="addressPar">
					<div class="addressTitle">地址</div>
					<div class="addressChose clearfix">
						<div class="leftBar">省市区</div>
						<div class="rightBar"><i class="icon iconfont_fc icon-fc_xiala"></i></div>
					</div>
				</div>

				<h3 class="personalTitle">室友状况</h3>

				<div class="sexPar">
					<div class="sexTitle">性别</div>
					<div class="sexChoose clearfix">
						<div class="leftBar">女</div>
						<div class="rightBar"><i class="icon iconfont_fc icon-fc_xiala"></i></div>
					</div>
				</div>

				<div class="agePar">
					<div class="ageTitle">年龄段</div>
					<div class="ageInp">
						<input type="text" value="" placeholder="开始年龄">
						---
						<input type="text" value="" placeholder="最后年龄">
					</div>
				</div>

				<div class="expectPar">
					<div class="expectTitle">期望</div>
					<div class="expectInp"><input type="text" placeholder="写出你的期望"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'release-room',
		data(){
			return{

			}
		},
		methods:{

		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.releaseRoom-wap{
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
	}
</style>