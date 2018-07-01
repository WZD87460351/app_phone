<template>
	<div class="cont-wap">
		<!-- 发布 -->
		<div class="head-wap">
			<div class="headNav" :class="{active:releaseRoomActive}" @click="changePage('ReleaseRoom')">
				发布房源
			</div>
			<div class="headNav" :class="{active:releaseRoommateActive}" @click="changePage('ReleaseRoomMate')">
				发布室友
			</div>
		</div>
		<component :is="currentView"></component>

		<MainFooterNav></MainFooterNav>
	</div>

</template>
<script>
	import MainFooterNav from '../../components/main/footer.vue'
	import router from '../../router'
	import ReleaseRoom from '../details/releaseRoom'
	import ReleaseRoomMate from '../details/releaseRoommate'
	export default{
		name: 'd-msg',
		data(){
			return{
				currentView: ReleaseRoom,
				releaseRoomActive: true,
				releaseRoommateActive: false
			}
		},
		components: {
			MainFooterNav,
			ReleaseRoom,
			ReleaseRoomMate
		},
		methods:{
			changePage(url){
				this.currentView = url;
				this.releaseRoomActive = false;
				this.releaseRoommateActive = false;
				switch(url){
					case "ReleaseRoom": this.releaseRoomActive = true; break;
					case "ReleaseRoomMate": this.releaseRoommateActive = true; break;
				}
			}
		}

	};
</script>
<style lang="scss" scoped>
	@import '../../static/css/comment.scss';
	@import '../../static/css/common.scss';
	.cont-wap{
		padding: .4rem 0 .5rem 0;
		.head-wap{
			position: fixed;
			left: 0;
			top: 0;
			display: flex;
			display: flex;
			display: -webkit-flex;
			width:100%;
			background: $white;
			.headNav{
				flex: 1;
				text-align: center;
				padding:5px 0;
				border-bottom: 1px solid $gray;
				&.active{
					border-bottom: 1px solid $orange;
					color: $orange;
				}
			}
		}
	}
</style>
