<template>
    <div class="main">
        <mt-header title="我的订单">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <t-tab :select="select" @change="status"></t-tab>
        <div class="container">
            <!--tab导航栏-->
            <t-tablist :list="list" :loading="loading" @loadmore="loadorder" @cancel="cancel" @confirm="confirm" @remind="remind" @del="del">
            </t-tablist>
        </div>
        <group-bar></group-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import groupBar from '../../common/Tabbar/GroupBar.vue'
    import list from './../../../assets/mixins/list'
    import order from './../../../assets/mixins/order'
    import barStyle from './../../../assets/mixins/barStyle'
    import tTab from './tab.vue'
    import tTablist from './tablist.vue'
    import listView from '@/components/common/view/listView'
//    import orderItem from '@/components/order.vue'
    import TopBar from '@/components/common/Tabbar/TopBar'




    import { MessageBox,Toast } from 'mint-ui'
    export default {
        data() {
            return {
                select: '0',
                url:'groups.order',
                islist: '1'
            }
        },
        mixins: [list,order,barStyle],
        methods: {
            status(i){
                this.select=i;
                this.getOrder(i)
            },
            getOrder(status){
                let params = {
                    url: 'groups.order.lists',
                    opt: {
                        status: status,
                    }
                };

                this.scrollTop('.container').then(this.listInit()).then(this.getList(params))
            },
            getInitOrder(s){
                this.select= s;
                if(s == ''){
                    this.select= 0
                }
                let params = {
                    url: 'groups.order.lists',
                    opt: {
                        status: s,
                    }
                };

                this.scrollTop('.container').then(this.listInit()).then(this.getList(params))
            },
            loadorder(){
                let _this=this;
                let params = {
                    url: 'groups.order.lists',
                    opt: {
                        status: _this.select,
                    }
                };
                this.loadMore(params)
            },
        },
        beforeRouteUpdate(to, from, next){
            let _this = this
            if (from.query.stal===0) {
                this.getInitOrder(from.query.a);
            }
            next()
        },
        mounted () {
//            this.getInitOrder();
//            this.getInitOrder(this.$route.query.status);
            this.getInitOrder('');
        },
        components: {
            tTab,
            tTablist,
            groupBar,
            listView,
            TopBar

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(1);
        .tab {
           /* position: fixed;
            width: 100%;
            top:.4rem;*/
        }
        .container {
            background: #f7f7f7;
            .scroll-view(100%);
//            .header-height;
            /*padding-top: .8rem;*/
            ul {
                margin-bottom: .5rem;
            }
        }
    }
</style>
