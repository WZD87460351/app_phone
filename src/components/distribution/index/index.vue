<template>
    <div class="main">
        <mt-header title="分销中心">
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container" v-if="show">
            <!-- 基本信息 -->
            <div class="base-info">
                <img :src="member.avatar" alt="">
                <div class="right">
                    <h3>{{member.nickname}}</h3>
                    <p class="yellow">{{baseInfo.levelname}}</p>
                    <p>{{set.up}}: {{baseInfo.agentname}}</p>
                </div>
            </div>
            <!-- 佣金 -->
            <div class="commission-box">
                <div class="top">
                    <p>{{set.commission_pay}}({{set.yuan}})</p>
                    <p><span>{{member.commission_pay}}</span></p>
                </div>
                <div class="btm">
                    <div>
                        <p>{{set.commission_ok}}({{set.yuan}})</p>
                        <p>{{member.commission_ok}}</p>
                    </div>
                    <router-link :to="{name:'commission'}" tag="span">{{set.commission}}{{set.withdraw}}</router-link>
                </div>
            </div>
            <!-- 分销菜单 -->
            <ul class="nav-box">
                <router-link :to="{name:'commission'}" tag="li">
                    <img src="../../../assets/images/money.png" alt="">
                    <p>{{set.commission1}}</p>
                    <p><span>{{member.commission_total}}</span>{{set.yuan}}</p>
                </router-link>
                <router-link :to="{name:'distributionOrder'}" tag='li'>
                    <img src="../../../assets/images/list.png" alt="">
                    <p>{{set.order}}</p>
                    <p><span>{{member.ordercount0}}</span>笔</p>
                </router-link>
                <router-link :to="{name:'withdrawals'}" tag='li'>
                    <img src="../../../assets/images/manage-order.png" alt="">
                    <p>{{set.commission_detail}}</p>
                    <p><span>{{member.applycount}}</span>笔</p>
                </router-link>
                <router-link :to="{name:'partner'}" tag='li'>
                    <img src="../../../assets/images/group.png" alt="">
                    <p>{{set.mydown}}</p>
                    <p><span>{{member.downcount}}</span>人</p>
                </router-link>
                <router-link :to="{name:'qCode'}" tag='li'>
                    <img src="../../../assets/images/code.png" alt="">
                    <p>推广二维码</p>
                </router-link>
            </ul>
        </div>
        <div class="container" v-if="!show">
            <div class="tip">
                <div class="logo">
                    <img v-if="tip.img" :src="tip.img"/>
                    <span v-if="tip.icon" class="iconfont" v-html="tip.icon"></span>
                </div>
                <p>{{tip.title}}</p>
                <button v-if="tip.btn" @click="go">{{tip.btn}}</button>
            </div>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import defaultImg from "../../../assets/images/good-tip.png";
    export default {
        data() {
            return {
                baseInfo:{},
                member:{},
                menu:{},
                set:{},
                show:true,
                tip:{
                    img: defaultImg,
                    title: "您还不是分销商！",
                    btn: ""
                }
            }
        },
        methods: {
            goBack(){
              this.$router.go(-1);
            },
            init(){
                let _this = this;
                util.request({
                    url: 'commission.index',
                    data:{},
                    method:'get',
                    success(res){
                        _this.baseInfo = res.data;
                        _this.member = res.data.member;
                        _this.menu = res.data.menu;
                        _this.set = res.data.set.texts;
                        _this.show=true
                    },
                    error(res){
                        if(res.error === 70000){
                            _this.show=false
                        }
                    }
                })
            }
        },
        components:{

        },
        mounted(){
            console.log('分销')
            this.init();
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
        .container {
            .scroll-view(100%);
            .base-info{
                display: flex;
                background: #FE5455;
                border-bottom: @border;
                padding: .1rem;
                align-items: center;
                >img{
                    width: .5rem;
                    height: .5rem;
                    border-radius: 50%;
                    margin-right: .1rem;
                }
                .right{
                    flex: 1;
                    h3{
                        font-size: .18rem;
                        color: #fff;
                        text-align: left;
                    }
                    p{
                        color: #fff;
                        text-align: left;
                        font-size: .14rem;
                    }
                    .yellow{
                        color: #fef31f;
                    }
                }
            }
            .commission-box{
                display: flex;
                flex-direction: column;
                 background: #FE5455;
                 padding: .1rem .18rem;
                .top{
                    margin-bottom: .1rem;
                    p{
                        font-size: .16rem;
                        color: #fff;
                        text-align: left;
                        span{
                            font-size: .22rem;
                        }
                    }
                }
                .btm{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                        font-size: .14rem;
                        color: #fff;
                        text-align: left;
                    }
                    span{
                        font-size: .14rem;
                        color: #fff;
                        border: 1px solid #fff;
                        border-radius: .12rem;
                        padding: .012rem .1rem;
                    }
                }
            }
            .nav-box{
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 33.33%;
                    border-right: @border;
                    border-bottom: @border;
                    padding: .2rem;
                    img{
                        width: .35rem;
                        height: .35rem;
                        margin-bottom: .03rem;
                    }
                    p{
                        font-size: .12rem;
                        span{
                            font-size: .12rem;
                            color: #feb312;
                            margin-right: .02rem;
                        }
                    }
                }
            }
            .tip {
                margin: 0 auto;
                .logo {
                    width: 1.6rem;
                    /* height: .76rem; */
                    margin: 0.5rem auto 0.1rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .iconfont {
                        display: block;
                        width: 100%;
                        height: 100%;
                        /*font-size: 1rem;*/
                        font-size: 0.15rem;
                    }
                }
                p {
                    font-size: 0.16rem;
                    width: 100%;
                    color: #bbbbbb;
                }
                button {
                    width: 0.7rem;
                    height: 0.35rem;
                    border-radius: 0.03rem;
                    margin-top: 0.15rem;
                    background: #ff4f4f;
                    outline: none;
                    color: #ddd;
                }
            }
        }
    }
</style>
