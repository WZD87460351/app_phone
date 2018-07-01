<template>
	<div class="cont-wap">
		<!-- 个人 -->
		<div class="personal-wap">
			<div class="personal-edit clearfix" @click="jump('/EditMineInfo')">
				<div class="leftBar">
					<h3 class="person_name">五花，爱吃肉</h3>
					<p class="desc">查看并编辑个人资料</p>
				</div>
				<div class="rightBar">
					<img src="../../../static/img/my-avatar.png" alt="">
				</div>
			</div>
			<div class="clearfix sixsec" v-for="item in myList" @click="jump(item.routePath)">
				<div class="title leftBar">{{item.title}}</div>
				<div class="icon rightBar">
					<img :src="item.icon" alt="">
				</div>
			</div>
		</div>
		<main-footerNav></main-footerNav>
	</div>
</template>
<script>
	import util from "./../../api/util";
	import MainFooterNav from '../../components/main/footer.vue';
	import router from '../../router';
	export default{
		name: 'd-msg',
		data(){
			return{
				pereditshow: null,
				myList:[{
					id: 0,
					title: '我的收藏',
					icon: '../../../static/img/my-collect.png',
					routePath: '/MyCollect'
				},{
					id: 1,
					title: '积分商城',
					icon: '../../../static/img/my-pointMall.png',
					routePath: '/MyPointMall'
				},{
					id: 2,
					title: '我的服务',
					icon: '../../../static/img/my-service.png',
					routePath: '/MyService'
				},{
					id: 3,
					title: '我的发布',
					icon: '../../../static/img/my-release.png',
					routePath: '/MyRelease'
				},{
					id: 4,
					title: '常见问题',
					icon: '../../../static/img/my-commonpro.png',
					routePath: '/CommonProblem'
				},{
					id: 5,
					title: '蜂巢客服',
					icon: '../../../static/img/my-customerSer.png',
					routePath: '/CustomerService'
				}]
			}
		},
		activated(){
			
		},
		created(){
			let _this = this;
			util.request({
				url: "fcgj.personal.myInfo",
				data: {
					"openid": _this.selected,
					"id": _this.phoneNum
				},
				method: "post",
				success(res) {
					console.log(res);
				},
				error(err){
					console.log('--------------getuserinfoerror------------------')
				}
			});
		},
		methods: {
			showEdit(){
				this.pereditshow = true;
			},
			hideEdit(){
				this.pereditshow = false;
				console.log('hide has been triggered');
			},
			jump(url){
				router.push({path:url});
			},
			uploadChange(event){
				if(event.target.files.length>0){
					this.files = event.target.files[0];  //提交的图片  
					this.$conf.getBase64(event.target,(url)=>{
						this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片  
					});
				}
			},

			getBase64 : function(file,callback){
			    var maxWidth = 640;
			    if(file.files && file.files[0]){  
			        var thisFile = file.files[0];  
			        if(thisFile.size>2019200){  
			            // mualert.alertBox("图片不能超过800K");  
			            alert("图片不能超过2M");  
			            return  
			        };  
			        var reader = new FileReader();  
			        reader.onload = function(event){  
			            var imgUrl = event.target.result;  
			            var img = new Image();  
			            img.onload = function(){  
			                var canvasId = 'canvasBase64Imgid',  
			                canvas = document.getElementById(canvasId);  
			                if(canvas!=null){document.body.removeChild(canvas);}  
			                var canvas = document.createElement("canvas");  
			                canvas.innerHTML = 'New Canvas';  
			                canvas.setAttribute("id", canvasId);  
			                canvas.style.display='none';  
			                document.body.appendChild(canvas);  
			                canvas.width = this.width;  
			                canvas.height = this.height;  
			                var imageWidth = this.width,   
			                imageHeight = this.height;  
			                if (this.width > maxWidth){  
			                    imageWidth = maxWidth;  
			                    imageHeight = this.height * maxWidth/this.width;  
			                    canvas.width = imageWidth;  
			                    canvas.height = imageHeight;  
			                }  
			                var context = canvas.getContext('2d');  
			                context.clearRect(0, 0, imageWidth, imageHeight);  
			                context.drawImage(this, 0, 0, imageWidth, imageHeight);  
			                var base64 = canvas.toDataURL('image/png',1);  
			                var imgbase = base64.substr(22);  
			                callback(imgbase)  
			                //this.imgUrl =   
			            }  
			            img.src = imgUrl;
			        }  
			        reader.readAsDataURL(file.files[0]);
			    }
			},

		},
		components: {
			MainFooterNav
		}
	}
</script>
<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.cont-wap{
		.personal-wap{
			padding: 44px 15px;
			.personal-edit{
				padding-top: 18px;
				.leftBar{
					.person_name{
						font-size: .2rem;
					}
					.desc{
						font-size: 18px;
						line-height: 50px;
						color: $roomselnot;
					}
				}
				.rightBar{
					img{
						width: 50px;
						border-radius:50%;
					}
				}
			}
			.sixsec{
				padding: 25px 0;
				.title{
					font-size: 20px;
					color: $roomselnot;
				}
				.icon{
					width: 25px;
					img{
						width: 100%;
					}
				}
			}
		}
	}
</style>