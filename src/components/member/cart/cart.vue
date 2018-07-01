<template>
    <div class="main">
        <mt-header title="购物车" fixed></mt-header>
        <div class="container">
            <list-view>
                <cart-item v-for="(v,i) in getShCartData" :key="i" :goodsInfo="v" @check="nowChecked(v,i)"
                           @reduce="reduceTotal(v,i)" @add="addTotal(v,i)" @del="delItem(v.id)" @goDetail="goProductDetail(v)">
                </cart-item>
            </list-view>
        </div>
        <cart-account :defPricea="defPrice" :defTotala="defTotal" :isTruea="isTrue" @checkBox="allCheckBox" @confirmOrder="goConfirmorder"></cart-account>
        <v-tabbar></v-tabbar>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import { Header, Checklist, MessageBox, Toast } from 'mint-ui';
    import { mapMutations, mapGetters } from 'Vuex';
    import vTabbar from '../../common/Tabbar/Tabbar';
    import listView from '../../common/view/listView';
    import CartItem from './CartItem';
    import CartAccount from './CartAccount';

    export default {
        data() {
            return {
                value1: [],
                getShCartData: [], //商品列表
                defPrice: 0,  //购物车总的价格
                defTotal: 0,  //购物车总的数量
                isTrue: true,  //全选状态
                goodsId: '',
                optionId: '',
                cartids: '',
                total: '',
            }
        },
        methods: {
            mycartsInt() {  //购物车初始化
                let _this = this;
                util.request({
                    url: 'member.cart.get_cart',
                    data: {},
                    method: 'get',
                    success(res){
                        if(res.data.merch_list==null){
                            _this.getShCartData=[]
                        }else{

                            _this.getShCartData = res.data.merch_list[0].list;//赋值
                        }

//                         _this.getShCartData = res.data.list;
                        _this.isTrue = res.data.ischeckall;//全选状态
                        _this.defPrice = res.data.totalprice;
                        _this.defTotal = res.data.total;
                    }
                })
            },
            cartCalc(v){//添加或减少购物车商品数量
                let _this=this;
                let params = {
                    id: v.id,
                    optionid: v.optionid,
                    total: v.total
                };
                util.request({
                    url: 'member.cart.update',
                    data: params,
                    method: 'post',
                    success(res){
                        _this.mycartsInt();
                    }
                })
            },
            addTotal(v, i) {//加
                let _this = this;
                v.total++;
                if (_this.getShCartData[i].selected == true) {
                    _this.cartCalc(v);
                }
            },
            reduceTotal(v, i) {//减
                let _this = this
                let total = v.total;
                if (total > 1) {
                    v.total--;
                    if (_this.getShCartData[i].selected == true) {
                        //_this.defPrice = Number(_this.defPrice) - Number(v.marketprice);
                        //  _this.defTotal--  //总数--
                        _this.cartCalc(v);
                    }
                }else{
                    Toast({
                        message: '数量不可小于1',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
            caleSelect(v,s){
                let _this = this;
                let params={
                    id:v.id,
                    select:s
                }
                util.request({
                    url: 'member.cart.select',
                    data: params,
                    method: 'post',
                    success(res){
                        _this.mycartsInt();
                    }
                })
            },
            allCheckBox() {//全选
                let _this = this;
                _this.mycartsInt();
                if (_this.isTrue === true) {
                    //_this.defState();
                    let data={
                        id:'all'
                    };
                    _this.caleSelect(data,0)
                } else {
                    let data={
                        id:'all',
                    };
                    _this.caleSelect(data,1)
                }
            },
            nowChecked(v, i) {//单选
                let _this = this;
                if (_this.getShCartData[i].selected == 1) {
                    _this.caleSelect(v,0);
                } else {
                    _this.caleSelect(v,1);
                }
            },
            delItem(id){//删除商品
                MessageBox({ title: '确认要删除此商品吗?', message: '点击确认删除', showCancelButton: true }).then(action => {
                    if (action == 'confirm') {//表示点击了确定
                        let _this = this;
                        util.request({
                            url: 'member.cart.remove',
                            data: {
                                ids: [id]
                            },
                            method: 'post',
                            success(res){
                                console.log('res is',res)
                                _this.mycartsInt();
                            }
                        })
                    } else if (action == 'cancel') {//表示点击了取消
                        // console.log('点击了取消')
                    }
                })
            },
            goProductDetail(v) {
                let goodsId = v.goodsid;
                this.$router.push({ name:'product', query: { id: goodsId } })
            },
            goConfirmorder() {//确认订单
                let _this = this;

                if (Number(_this.defPrice) === 0) {
                    Toast({
                        message: '请选择商品',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }

                util.request({
                    url: 'order.create',
                    data: {},
                    method: 'get',
                    success(res) {
                        _this.$router.push({name: 'confirm',query:{fromcart:1}});
                    }
                })
            }
        },
        mounted () {
            this.mycartsInt();
        },
        components:{
            vTabbar,
            listView,
            CartItem,
            CartAccount
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        text-align: center;
        .page-view(1);
        .container {
            .scroll-view(100%);
            margin-top: .4rem;
        }
        .list .mint-checklist-label {
            height: .5rem;
            width: 0.3rem;
            text-align: left;
            margin-top: 0.20rem;
            padding: 0rem;
        }
        .list {
            margin-bottom: 1.4rem;
        }
        .list li {
            height: 1rem;
            padding: 0.1rem;
            background: #fff;
            margin-top: 0.05rem;
        }
    }
</style>