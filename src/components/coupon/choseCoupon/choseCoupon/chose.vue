
<template>
    <div class="main">
        <mt-header title="选择优惠券" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <list-view>
                <item v-for="(i,index) in list" :item="i" @tab="submit(index)" :key="index"></item>
            </list-view>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import util from '../../../api/util'
    import listView from '@/components/common/view/listView'
    import item from '@/components/coupon/choseCoupon/item'
    export default {
        data() {
            return {
                list:[]
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            init(){
                let _this=this
                util.request({
                    url:'sale.coupon.query',
                    method:'get',
                    data: Object.assign(_this.couponList,{
                        mid: '',
                        merchid: '',
                        authkey: ''
                    }),
                    success(res){
                        _this.list=res.data.list
//                        console.log(_this.list)
                    }
                })
            },
            submit(i){
                let promise=new Promise((resolve,reject)=>{
                    this.COUPON(this.list[i])
                    resolve()
                })
                promise.then(()=>{
                    this.$route.query.coupon=1
                    this.$router.go(-1)
                })
            },
            ...mapMutations([
                'COUPON'
            ]),

        },
        computed: {
            ...mapState([
                'couponList'
            ]),
        },
        components: {
            listView,
            item
        },
        mounted() {
            this.init()
        },
        created() {

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
        .container {
            .scroll-view(100%);
            .header-height
        }
    }
</style>