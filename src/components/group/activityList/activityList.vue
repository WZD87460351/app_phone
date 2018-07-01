<template>
    <div class="main">
        <mt-header title="火爆拼团" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="search-box">
            <search ref="search" @submit="search"></search>
        </div>

        <div class="container">
            <list-view :loading="loading" @loadMore="loadList">
                <group-list v-for="(i,index) in list" :item="i" jumpTo="groupProduct" :key="index"></group-list>
            </list-view>
        </div>
        <group-bar></group-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import groupBar from '../../common/Tabbar/GroupBar.vue'
    import search from '../../common/base/search.vue'
    import groupList from '../../common/list/groupList.vue'
    import Tip from '../../common/base/Tip.vue'
    import style from './../../../assets/mixins/style'
    import ListView from './../../common/view/listView'
    export default {
        data() {
            return {
                id:'',

            }
        },
        mixins:[list],
        prop:{

        },
        methods: {
            init(){
                let _this=this
                _this.id = _this.$route.query.id;
//                _this.keyword= _this.$route.query.keywords
                let params={
                    url:'groups.goods.lists',
                    opt:{
                        cateid:  _this.id,
                        keyword:_this.$refs.search.keywords,
                    }
                }
                this.listInit().then(this.getList(params))
            },
            loadList(){
                let _this=this
                let params={
                    url:'groups.goods.lists',
                    opt:{
                        cateid: _this.id,
                        keyword:_this.$refs.search.keywords,
                    }
                }
                this.loadMore(params)
            },
            search(key){
                let params={
                    url:'groups.goods.lists',
                    opt:{
                        cateid: '',
                        keyword:key,
                    }
                }
                this.id=''
//                this.keywords=key
                this.listInit().then(this.getList(params))
            }
        },
        components:{
            groupBar,
            search,
            groupList,
            Tip,
            ListView
        },
        mounted(){
            this.init()
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
        .container {
            height: 100%;
            //.header-height;
            .scroll-view(100%);
            padding-top: .92rem;
            .list {
                padding-bottom: .5rem;
            }
        }
        .search-box {
            position: fixed;
            top: .4rem;
            width: 100%;
            background-color: #fff;
        }
    }

</style>