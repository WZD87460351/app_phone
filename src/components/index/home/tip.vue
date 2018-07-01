<template>
	<router-link class="tip-con" :to="{name:'specialList'}" tag="div">
		<div class="tip">
	        <div class="tip-icon">        	
	            <img src="../../../assets/images/hots.png" alt="">
	            <img class="img" src="../../../assets/images/notification.png" alt="">
	            <span class="tip-text" style="color: #333">
	                {{message}}
	            </span>
	        </div>
		</div>
	</router-link>
</template>

<script>
    export default {
        data () {
            return {
                message:'',
                i:1,
            }
        },
        props: {
            tip: {
                type: Array,
                required: true
            },
        },
        methods: {
            init(){
                let that = this;
                that.message=that.tip[0].title;
                setInterval(function () {
                    if(that.i>=that.tip.length){
                        that.i=0
                    }else{
                        that.message=that.tip[that.i].title;
                        that.i=that.i+1;
                    }
                },3000)
            }
        },
        mounted () {
            this.init()
        },
        components: {

        }
    }
</script>
<style lang="less" scoped>
    @import '../../../assets/less/common.less';
    .tip{
    	color: #333;
        padding:.06rem .1rem;
        text-align: left;
        background: #ffffff;
        border-bottom: 1px solid #E6E2E2;
        padding-bottom: .02rem;
        .tip-icon{
            height:.2rem;
            line-height: .2rem;
            overflow: hidden;
            img:first-child{
                width: .3rem;
                height:.2rem;
                border-right: 1px solid #E6E2E2;
                padding-right:.1rem;
            }
            .img{
                width: .15rem;
                height:.15rem;
                position: relative;
                top:-.02rem;
            }
            span{
                position: relative;
                top:-.04rem;
                font-size: .14rem;
            }
					 .tip-text {
						 color: #333;
					 }
        }
    }
</style>
