<template>
	<div class="cont-wap">
		<div class="searchPar">
			<div class="search-wap">
				<label for="searchFrame"><i class="icon iconfont icon-sousuo"></i></label>
				<input type="text" placeholder='任何地点，任何学校' id="searchFrame" v-model="searchValue">
				<div class="cancel rightBar" @click="goback">取消</div>
			</div>
		</div>
		
		<div class="searchDetail-wap">
			<div class="dhjsv">kbdfkjbvjdfbvjdfdfvjdfbhjv</div>
			<div class="dhjsv">kbdfkjbvjdfbvjdfdfvjdfbhjv</div>
			<div class="dhjsv">kbdfkjbvjdfbvjdfdfvjdfbhjv</div>
			<div class="dhjsv">kbdfkjbvjdfbvjdfdfvjdfbhjv</div>
			<div class="dhjsv">kbdfkjbvjdfbvjdfdfvjdfbhjv</div>
		</div>

	</div>

</template>

<script>
	import router from '../../router';
	export default{
		name: 'search-page',
		data(){
			return{
				searchValue: '',

			}
		},
		mounted(){},
		watch:{
			searchValue: function(){
				if(this.searchValue == ''){
					return false
				}
				this.$http.post("https://fcgj.wshoto.com/Api/house/houseList",{},{emulateJSON: true})
					.then(
						(response)=>{ 
							console.log("-----------success------------");
							console.log(response);
							if(response.body.status === 0){
								console.log(response.body);
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
		methods:{
			goback(){
				router.go(-1);
			}
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
				padding: 10px 0;
				background: $orange;
				.cancel{
					background: red;
					height: 20px;
					line-height: 20px;
				}
				input{
					border: none;
					background: none;
					outline: none;
				}
			}
		}

		.searchDetail-wap{
			padding-top: 40px;
			// background: yellow;
		}
	}

</style>