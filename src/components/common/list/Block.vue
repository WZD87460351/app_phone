<template>
    <li class="item block" @click="tap(item.id)">
        <img :src="item.thumb"/>
        <div class="dec">
            <div class="title">{{item.title}}</div>
            <div class="price">￥{{item.minprice}}</div>
        </div>
        <img :src="noTotal" class="nototal" v-if="item.total==0"/>
    </li>
</template>

<script>
    import defaultAvatar from '@/assets/images/test.png'
    import noTotal from '@/assets/images/no-total.png'
    export default {
        data () {
            return {
                test: defaultAvatar,
                noTotal:noTotal
            }
        },
        props: {
            item: {
                // type: Object,
                // required: true
            },
            jumpTo: {
                type: String,
                required: true
            },
            jumpQuery: {
                type: Object
            }
        },
        methods: {
            tap (id) {
                this.$router.push({name: 'product',query:{id:id}})
            }
        },
        mounted(){

        }
    }
</script>

<style lang="less" scoped="">
    @import '../../../assets/less/index.less';
    .item{
        display: flex;
        flex-direction: column;
        padding: .05rem .05rem;
        width: 50%;
        position:relative;
        height: 2.44rem;
        img{
            width: 1.675rem;
            height: 1.6rem;
            display: block;
            margin: 0 auto;
            margin-bottom: .05rem;
        }
        .dec{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            .title{
                font-size: 14px;
                .text-overflow(2);
                margin-bottom: .1rem;
            }
            .price{
                color: @themeColor;
                font-size: 16px;
            }
        }
        .nototal{
            width:1rem;
            height:1rem;
            position:absolute;
            bottom:.4rem;
            right:.1rem;
            margin-bottom:0;
        }
    }
</style>
