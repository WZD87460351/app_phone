<template>
    <div class="main">
        <mt-header title="火爆拼团" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <banner :slider="res.advs"></banner>
            <nav-list :nav="res.category" jumpTo="activityList"></nav-list>
            <!--<t-title title="obj.name"></t-title>-->
            <group :list="res.recgoods" title="正在热卖"></group>
        </div>
        <group-bar></group-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import groupBar from '../../common/Tabbar/GroupBar.vue'
    import Banner from '../../index/home/banner.vue'
    import navList from '../../index/home/nav.vue'
    import tTitle from '../../index/home/top-title.vue'
    import group from './group.vue'
    import {Indicator} from 'mint-ui';


    export default {
        data() {
            return {
                res:{
                    advs:[],
                    category:[]
                }
            }
        },
        prop:{

        },
        methods: {
            init() {
                let _this=this;
                util.request({
                    url: 'groups',
                    method: 'get',
                    data:{},
                    success:function (res) {
                        _this.res=res.data
                    },
                    error:function (error) {

                    }
                })
            }
        },
        components:{
            groupBar,
            Banner,
            navList,
            tTitle,
            group
        },
        mounted(){
            Indicator.close();
            this.init()
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
        .container {
            .scroll-view(100%);
            .header-height;
        }
    }

</style>