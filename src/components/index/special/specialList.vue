<template>
	<div class="page">
		<mt-header title="系统公告">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
		<div class="container">
			<list-view>
				<special-item v-for='(i,index) in list' :item='i' :key='index' @goDetail="goDetail(i.id)"></special-item>
			</list-view>
		</div>
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
    import { Popup,Indicator } from 'mint-ui'
    import util from '../../../api/util'
    import listView from '../../common/view/listView'
    import specialItem from './specialItem'
    
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
		          url: 'shop.notice.get_list',
		          data: {
		          	page: 1
		          },
		          method: 'get',
		          success(res){
		          	_this.list = res.data.list;
		          }
	        	})
			},
            goDetail(i){
			    this.$router.push({name:'special',query:{id:i}})
			}
        },
        mounted() {
			this.getHome();
        },
        watch: {

        },
        components: {
			listView,
			specialItem
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

        }
    }

</style>