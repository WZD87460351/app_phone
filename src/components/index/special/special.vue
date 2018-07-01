<template>
	<div class="page">
		<mt-header title="系统公告">
            <router-link to="/SpecialList" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
		<div class='container'>
			<div class='title'>{{list.title}}</div>
			<div class='send-time'>发布时间:{{list.createtime}}</div>
			<div class='notice-detail' v-html='list.detail'></div>
		</div>
	</div>
</template>

<script>
    import { Popup,Indicator } from 'mint-ui'
    import util from '../../../api/util'
    export default {
        data() {
            return {
				list:[]
            }
        },
        methods: {
			getHome(){
		        let _this = this;
		        util.request({
		          url: 'shop.notice.detail',
		          data: {
		          	id: _this.$route.query.id
		          },
		          method: 'get',
		          success(res){
		          	_this.list = res.data.notice;
		          }
	        	})
			},
        },
        mounted() {
			this.getHome();
        },
        watch: {

        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .page {
        .page-view(1);
        .container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .scroll-view(100%);
            font-size: 0.16rem;
			.title{
				text-align: center;
				padding-top: 0.1rem;
				margin-bottom: 0.05rem;
			}
			.send-time{
				text-align: center;
				padding-bottom: 0.1rem;
				border-bottom: 1px solid #e0e0e0;
				margin-bottom: 0.1rem;
			}
			.notice-detail{
				margin: 0.2rem 0.1rem;
				font-size: .14rem;
				color: #666;
				text-align: left;
			}
        }
    }

</style>
