<template>
    <div class="main">
        <mt-header title="物流信息 ">
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <div v-if="names==1">
                <div class="log-header" v-if="expresslist.length" @click="showExpress()">
                    <div class="header-img">
                        <img :src="thumb" alt="">
                        <!--<div class="count">{{count}}件商品</div>-->
                    </div>

                    <div class="header-txt">
                        <div>快递公司：{{com}}</div>
                        <!--<div>物流状态：<span>{{status}}</span></div>-->
                        <div>快递单号：{{sn}}</div>
                    </div>
                    <div class="iconfont icon-shangjiantou" v-if="expressshow"></div>
	                <div class="iconfont icon-xiajiantou" v-else></div>
                </div>
                <div class="log-body" v-if="expressshow">
                    <div v-if="expresslist.length==0" class="log-none">
                    	<img :src="defaultImg" />
                    	暂无物流信息
                    </div>
                    <ul v-else>
                        <li class="steps" v-for="(v,i) in expresslist">
                            <div class="step">{{v.step}}</div>
                            <div class="time">{{v.time}}</div>
                        </li>
                    </ul>

                </div>
            </div>

            <div v-else>
            	<div  v-for="(list,i) in expresslist" >
	                <div class="log-header"  @click="showDetail(i)">
	                    <div class="header-img">
	                        <img :src="list.thumb" alt="">
	                        <div class="count">{{list.total}}件商品</div>
	                    </div>
	                    <div class="header-txt">
	                        <div>快递公司：{{list.expresscom}}</div>
	                        <!--<div>物流状态：<span>{{status}}</span></div>-->
	                        <div>快递单号：{{list.expresssn}}</div>
	                    </div>
	                    <div class="iconfont icon-shangjiantou" v-if="list.show"></div>
	                    <div class="iconfont icon-xiajiantou" v-else></div>
	                </div>
	                <div class="log-body" v-if="list.show">
	                    <div v-if="!list.item.length" class="log-none">
	                    	<img :src="defaultImg" />
	                    	暂无物流信息
	                    </div>
	                    <ul v-else>
	                        <li class="steps" v-for="(v,i) in list.item">
	                            <div class="step">{{v.step}}</div>
	                            <div class="time">{{v.time}}</div>
	                        </li>
	                    </ul>
	
	                </div>
            	</div>
           </div>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
	import defaultImg from '../../../assets/images/good-tip.png'
    export default {
        data() {
            return {
                thumb:'',
                com:'',
                status:'',
                sn:'',
                count:'',
                expresslist:[],
                names:1,
                defaultImg: defaultImg,
                expressshow: false
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
            init(){
                let _this = this;
                if(_this.$route.query.name == 1){

                    util.request({
                        url: "creditshop.log.express",
                        data:{
                            id: _this.$route.query.id,
                        },
                        method: "post",
                        success(e){
                            if(e.data.error == 0){
                                _this.names = _this.$route.query.name;
                                _this.com = e.data.log.expresscom;
                                _this.sn = e.data.expresssn;
                                _this.expresslist = e.data.expresslist;
                                _this.thumb = e.data.goods.thumb
                            }
                        }
                    })
                }else{
                	let url ="";
                	if(_this.$route.query.name == 2){
                		url = "groups.order.express"
                	}else{
                		url ="order.express"
                	}
                    util.request({
                        url: url,
                        data:{
                            id: _this.$route.query.id,
                        },
                        method: "POST",
                        success(res){
                        	let list = res.data[0];
                        	console.log(list);
                            _this.names= _this.$route.query.name;
//                          _this.thumb=res.data.thumb;
//                          _this.com=res.data.com;
//                          _this.sn=res.data.sn;
//                          _this.status=res.data.status;
//                          _this.count=res.data.count;
							for (let i = 0; i < list.length; i++) {
					          list[i].show = false
					        }
                            _this.expresslist=list;
                        }
                    })
                }
            },
            showDetail(index){
            	let _this = this;
            	for(let i=0;i<_this.expresslist.length;i++){
				  if(i == index){
				    _this.expresslist[i].show = !_this.expresslist[i].show
				  }else{
				    _this.expresslist[i].show = false        
				  }
				}
            },
            showExpress(){
            	this.expressshow = !this.expressshow;
            }
        },
        mounted(){
            this.init();
        },
        components:{

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        /*background: #f7f7f8 !important;*/
        .page-view(1);
        .container {
            .scroll-view(100%);  
            padding-bottom: 40px;       
            .log-header{
                display:flex;
                justify-content: space-between;
                align-items:center;
                height:.85rem;
                padding:.1rem .1rem;
                box-sizing: border-box;
                border-bottom:1px solid @border;
                .header-img{
                    width:.65rem;
                    height:.65rem;
                    margin-right:.1rem;
                    position:relative;
                    img{
                        width:.65rem;
                        height:.65rem;
                    }
                    .count{
                        position:absolute;
                        bottom:0;
                        left:0;
                        width:100%;
                        text-align: center;
                        background:#000;
                        opacity: 0.8;
                        color:#fff;
                        font-size:.12rem;
                    }
                }
                .header-txt{
                    height:.65rem;
                    line-height: .3rem;
                    display:flex;
                    flex-direction: column;
                    text-align: left;
                    span{
                        color:#09BB07;
                    }
                }
                .iconfont{
                	margin: 0 .1rem;
                }
            }
            .log-body{
                padding:.2rem .2rem 40px .2rem ;
                text-align: left;
                .log-none{
                	font-size: 0.16rem;
                	color: #bbb;
                	text-align: center;
                	img{
                		display: block;
                		width: 1.6rem;
                		height: 1.6rem;
    					margin: 0.5rem auto 0.1rem;
                	}
                }
                .steps{
                    padding:.1rem 0;
                    border-bottom:1px solid #EEE;
                    .step{
                        font-size:.16rem;
                    }
                    .time{
                        font-size:.14rem;
                    }
                }
            }
        }
    }
</style>