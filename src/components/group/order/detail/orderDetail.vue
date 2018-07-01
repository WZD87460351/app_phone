<template>
    <div class="page" style="background: #f7f7f7;">
        <!--<mt-header title="订单详情" fixed>
            <router-link to="/GroupOrder" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>-->
        <mt-header title="订单详情 " fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <t-toplist :order="order"></t-toplist>
            <t-location :address="address"></t-location>
            <t-shop :goods="goods" :shop="shop" :order="order"></t-shop>
            <t-list :goods="goods" :order="order"></t-list>
            <t-info @cancel="cancel" @confirm="confirm" @remind="remind" @del="del" :order="order" @express="express"></t-info>
        </div>
    </div>
</template>

<script>
    import util from '../../../../api/util'
    import list from '../../../../assets/mixins/list'
    import tToplist from './toplist.vue'
    import tLocation from './location.vue'
    import order from '../../../../assets/mixins/order'
    import tShop from './shop.vue'
    import tList from './list.vue'
    import tInfo from './info.vue'

    export default {
        data() {
            return{
                order:{},
                carrier:{},
                shop:{},
                goods:{},
                url:'groups.order',
                address:{}
            }
        },
        mixins: [order],
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            express(id) {
		      this.$router.push({ name: "logistics", query: { id: id ,name:2} });
		    },
            getOrderDetail(){
                let that=this;
                util.request({
                    url: 'groups.order.detail',
                    method:'get',
                    data: {
                        orderid: that.$route.query.oid,
                        teamid:that.$route.query.tid
                    },
                    success:function (res) {
                        that.order = res.data.order;
                        that.goods = res.data.goods;
                        that.carrier = res.data.carrier;
                        that.address = res.data.order.address;
                        that.shop = res.data.shopset;
                    },
                    error:function (error) {
                        console.log(error)
                    },
                    complete:function () {

                    }
                })
            },
        },
        mounted () {
            this.getOrderDetail();
        },
        components: {
            tToplist,
            tLocation,
            tShop,
            tList,
            tInfo
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/less/index.less';
    .page {
        .page-view(1);
        .container {
            background: #f7f7f7;
            .header-height;
        }
    }
</style>