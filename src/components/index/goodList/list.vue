<template>
    <transition name="slide">
        <div class="page">
            <mt-header title="商品列表" fixed>
                <!--<router-link to="/category" slot="left">-->
            	<a slot="left" @click="goBack">
                	<mt-button icon="back"></mt-button>
                </a>
                <!--</router-link>-->
            </mt-header>
            <div class="search">
                <t-search></t-search>
                <div class="iconfont type" @click="typeChoose">&#xe669;</div>
            </div>
            <!--筛选下拉层 -->
            <sort :info="params" @change="setParams" @toggle="toggle"></sort>
            <screen :screenShow="screenShow" :cateList="cateList" @submit="setParams" @cancel="setParams"
                    @toggle="toggle"></screen>
            <div :class="['container',{scroll:screenShow}]">
                <list-view @loadMore="loadList" :loading="loading">
                    <col-list v-if="type===1" v-for="(i,index) in list" :item="i" jumpTo="" :key="index"></col-list>
                    <block v-if="type===0" v-for="(i,index) in list" :item="i" jumpTo="" :key="index"></block>
                </list-view>
            </div>
        </div>
    </transition>
</template>

<script>
    import {Popup, Indicator} from 'mint-ui'
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import tSearch from './../home/search'
    import screen from './screen'
    import listView from '@/components/common/view/listView.vue'
    import ColList from "./../../common/list/ColList.vue";
    import Block from "./../../common/list/Block.vue";
    import sort from './sort.vue'

    export default {
        data() {
            return {
                type: 0,
                params: {
                    keywords: '',
                    isrecommand: '',
                    isnew: '',
                    ishot: '',
                    isdiscount: '',
                    issendfree: '',
                    istime: '',
                    cate: '',
                    order: '',
                    by: '',
                },
                cateList: [],
                screenShow: false,
                flg: 0, //筛选按钮是否高亮,
                noDate: 0
            }
        },
        mixins: [list],
        methods: {
            //获取筛选分类
            getCate() {
                let _this = this;
                util.request({
                    url: 'shop.get_category',
                    data: {},
                    method: 'get',
                    success(res) {
                        console.log(res.data.category)
                        _this.cateList = res.data.category;
                    },
                    error(res) {

                    }
                })
            },
            //切换显示类型
            typeChoose() {
                this.type = this.type === 0 ? 1 : 0
            },
            //根据参数重新加载列表
            async init() {
                let params = {
                    url: 'goods.get_list',
                    opt: this.params
                }
                await this.listInit()
                await this.scrollTop('.container')
                console.log('getinit')
                await this.getList(params)
            },
            //LoadMore
            loadList() {
                let params = {
                    url: 'goods.get_list',
                    opt: this.params
                }
                this.loadMore(params)
            },
            //根据router 设置params
            goodList() {
                if (this.$route.query.keywords) {
                    this.params.keywords = this.$route.query.keywords;
                }
                if (this.$route.query.cate) {
                    this.params.cate = this.$route.query.cate;
                }
                this.init();
            },
            //sort setParams
            setParams(o) {
                this.params = Object.assign(this.params, o)
                this.init()
                console.log(this.params)
            },
            toggle() {
                this.screenShow = !this.screenShow
                console.log('toggle')
                console.log(this.screenShow)
            },
            toggleList() {
                this.screenShow = !this.screenShow
                console.log('toggle')
                console.log(this.screenShow)
            },
            goBack(){
                this.$router.go(-1)
            },
        },
        mounted() {
            // this.goodList();
            this.params.cate = this.$route.query.cate
            if(this.$route.query.attribute){
                this.params[this.$route.query.attribute] = 1
            }
            this.init()
            this.getCate()
        },
        watch: {},
        components: {
            tSearch,
            listView,
            screen,
            ColList,
            Block,
            sort
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .page {
        .page-view(1);
        .search {
            display: flex;
            margin-top: .4rem;
            background-color: #fff;
            z-index: 3;
            position: relative;
            padding: 0 0 0 10px;
            .type {
                width: .365rem;
                /*font-size: .3rem;*/
                /*line-height: .28rem;*/
                line-height: .42rem;
                font-size: .24rem;
                text-align: center;
                margin-right: .03rem;
            }
        }

        .screen-bg {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .5)
        }
        .container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .scroll-view(100%);
            padding-bottom: 1.5rem;
            background-color: #efeff4;
            .list {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 0.075rem;
                .item {
                    background: #fff;
                    width: 100%;
                }
                .block {
                    width: 49%;
                    margin-bottom: 0.075rem;
                    background: #fff;
                }
                .block:nth-child(odd) {
                    margin-right: 2%;
                }
                .block:nth-child(even) {
                    margin-right: 0;
                }
            }
        }
        .scroll {
            overflow-y: hidden;
        }
    }

</style>