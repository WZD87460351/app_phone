<template>
    <div :class="['screen',{in : screenShow}]">
        <div class="attribute">
            <div :class="['item',{active:i.active}]" v-for="(i,index) in type">
                <div class="btn" @click="filter(i,index)"><span>√</span>{{i.title}}</div>
            </div>
        </div>
        <div class="title">选择分类</div>
        <div class="cate">
            <div class="item">
                <div :class="{cur:i === select}"  @click="tab(i,v.id)" v-for="(v,i) in cateList" :key="i">{{v.name}}</div>
            </div>
            <div class="item">
                <template v-for="(i,index) in cateList" v-if="select === index">
                    <div :class="{cur: select2 === idx}" @click="tab2(1,v.id)"   v-for="(v,idx) in i.child" :key="idx">{{v.name}}</div>
                </template>
            </div>
        </div>
        <div class="btns">
            <div class="cancle" @click="cancle">取消筛选</div>
            <div class="confirm" @click="submit">确认</div>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
                type:[
                    {
                        title:'推荐商品',
                        keyword:'isrecommand',
                        active:false
                    },
                    {
                        title:'新品上市',
                        keyword:'isnew',
                        active:false
                    },
                    {
                        title:'热卖商品',
                        keyword:'ishot',
                        active:false
                    },
                    {
                        title:'促销商品',
                        keyword:'isdiscount',
                        active:false
                    },
                    {
                        title:'卖家包邮',
                        keyword:'issendfree',
                        active:false
                    },
                    {
                        title:'限时抢购',
                        keyword:'istime',
                        active:false
                    },
                ],
                params:{
                    isrecommand: '',
                    isnew: '',
                    ishot: '',
                    isdiscount: '',
                    issendfree: '',
                    istime: '',
                    cate: '',
                },
                select:0,
                select2:0,
            }
        },
        props: {
            screenShow: {
                type: Boolean,
                required: true
            },
            cateList:{
                type: Array,
                required: true
            },
        },
        methods: {
            submit:function(){
                this.$emit('submit',this.params);
                this.$emit('toggle');
            },
            cancle:function(){
                const params={
                    isrecommand: '',
                    isnew: '',
                    ishot: '',
                    isdiscount: '',
                    issendfree: '',
                    istime: '',
                    cate: '',
                }
                this.type.forEach((i,index) => {
                    const obj=this.type[index]
                    obj.active=false
                    this.$set(this.type,index,obj)
                })
                this.select =0
                this.select2 =0

                this.$emit('cancel',params);
                this.$emit('toggle');
            },

            filter:function(i,index){
                this.$set(this.params,i.keyword,this.params[i.keyword]===''? 1 : '')
                const obj=this.type[index]
                obj['active']=!obj['active']
                this.$set(this.type,i,obj)
                console.log(this.params)
            },
            tab(index,id){
                console.log('tab')
                this.select=index;
//                console.log(select)
                this.select2 = 0
                this.$set(this.params,'cate',id)
                console.log(this.params)
            },
            tab2(index,id){
                this.$set(this.params,'cate',id)
                console.log(this.params)
                this.select2 = index
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .screen{
        background:#fff;
        width:100%;
        position:fixed;
        top:1.17rem;
        left:0;
        z-index:3;
        opacity:0;
        transition-property:height, opacity, -webkit-transform;
        transition-property:height, opacity, transform;
        transition-property:height, opacity, transform, -webkit-transform;
        transition-duration:300ms;
        -webkit-transform:translate3d(0px, -100%, 0px) scaleY(0);
        transform:translate3d(0px, -100%, 0px) scaleY(0);
        .attribute{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            .item{
                width: 28%;
                margin: .03rem 0.05rem;
                .btn{
                    border: 1px solid #999;
                    color: #999;
                    font-size: 13px;
                    border-radius: 5px;
                    padding: .04rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    >span{
                        display: none;
                        font-size: 12px;
                        margin-right: .03rem;
                    }
                }
            }
            .item.active{
                .btn{
                    border: @themeColor 1px solid;
                    color: @themeColor;
                    >span{
                        display: block;
                    }
                }
                
            }
        }
        .title{
            padding:0 0.06rem;
            line-height:.3rem;
            font-size:14px;
            color:#999;
            position:relative;
            text-align:center;
            border-top: @border;
            border-bottom: @border;
        }
        .cate{
            height:2.4rem;
            position:relative;
            display:-webkit-box;
            display:-webkit-flex;
            display:-ms-flexbox;
            display:flex;
            margin:0.06rem 0;
            padding:0 0.06rem;
            .item{
                width:100%;
                height:inherit;
                overflow-y:auto;
                position:relative;
                -webkit-overflow-scrolling:touch;
                >div{
                    height:.3rem;
                    line-height:.3rem;
                    font-size:14px;
                    text-align:center;
                    color:#666;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    overflow:hidden;
                    padding:0 0.04rem;
                    display:block;
                }
                >div.cur{
                    background-color:rgba(223, 223, 223, 0.43)
                }
            }
            .item:first-child{
                border-right:@border;
            }
        }
        .btns{
            padding:.1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: @border;
            .cancle{
                color:#666;
                font-size: 15px;
            }
            .confirm{
                color:#fd5454;
                font-size: 15px;
            }
        }
    }
    .screen.in{
        transition-duration:0.3s;
        opacity:1;
        height:auto;
        -webkit-transform:translate3d(0px, 0px, 0px) scaleY(1);
        transform:translate3d(0px, 0px, 0px) scaleY(1);
    }
</style>