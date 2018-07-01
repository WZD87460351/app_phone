<template>
	<div class="cont-wap">
	<!-- 个人信息编辑 -->
		<div class="changeInfo-wap">
			<div class="editHeader clearfix">
				<i class="icon iconfont_fc icon-fc_fanhui1" @click="goback"></i>
				<p class="editTitle">编辑个人资料</p>
				<span class="save" @click="">保存</span>
			</div>
			<div class="editBody">
				<div class="avatarEdit">
					<div class="imgSrc">
						<img :src="imgDataUrl" >
						<!-- <input type="file" name="file" class="upload__input" @change="uploadChange" accept="image/png,image/gif" style="background:url(../../../static/img/myedit-camera.png) center left no-repeat"> -->
						<img src="../../../static/img/myedit-camera.png" alt="" class="camera" @click="openCamera">
					</div>
				</div>
				<div class="firstnameEdit edititem">
					<p><label for="firstname">名字</label></p>
					<input type="text" name="firstname" id="firstname" placeholder="输入名字" v-model="users.firstname">
				</div>
				<div class="lastnameEdit edititem">
					<p><label for="lastname">姓氏</label></p>
					<input type="text" name="lastname" id="lastname" placeholder="输入姓氏" v-model="users.lastname">
				</div>
				<div class="sexEdit edititem">
					<p><label for="sex">性别</label></p>
					<input type="text" name="sex" id="sex" placeholder="输入性别" v-model="users.sex">
				</div>
				<div class="phoneNumEdit edititem">
					<p><label for="phonenumber">手机</label></p>
					<input type="text" name="phonenumber" id="phonenumber" placeholder="输入手机号" v-model="users.phonenumber">
				</div>
				<div class="addressEdit edititem">
					<p><label for="address">地点</label></p>
					<input type="text" name="address" id="address" placeholder="输入地址" v-model="users.address">
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import router from '../../router';
	export default{
		name: 'editMyownInfo',
		data(){
			return{
				imgDataUrl: '../../../static/img/myedit-avatar.png',
				users:{
					firstname: '爱吃肉',
					lastname: '五花',
					sex: '女',
					phonenumber: null,
					address: null
				},
				msg: ''
			}
		},
		mounted(){

		},
		methods:{
			goback(){
				router.go(-1);
			},
			openCamera:function(){
				var tag=this;
				summer.openCamera({
					callback : function(args){
						tag.msg=args;
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.cont-wap{
		.changeInfo-wap{
			// position: fixed;
			// top: 0;
			// left: 0;
			width: 100%;
			min-height: 100%;
			padding: 15px;
			background: $white;
			.editHeader{
				position: relative;
				padding: 15px 0;
				// background:pink;
				.icon{
					position: absolute;
					left: 0;
					top: 0;
					z-index: 2000;
				}
				.editTitle{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					text-align: center;
					font-size: 16px;
					z-index: 1;
				}
				.save{
					font-size: 16px;
					z-index:2000;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
			.editBody{
				.avatarEdit{
					background: #eeeeee;
					margin: 0 -15px;
					.imgSrc{
						position: relative;
						img{
							width: 150px;
							height: 150px;
							margin: 0 auto;
							display: block;
						}
						.camera{
							position: absolute;
							right: 15px;
							bottom: 15px;
							height: 18px;
							width: 24px;
						}
					}
				}

				.edititem{
					padding: 15px 0;
					p{
						label{
							font-size: 14px;
							line-height: 24px;
						}
					}
					input{
						font-size: 17px;
						outline: none;
						background: none;
						border: none;
					}
				}
			}
		}
	}
</style>