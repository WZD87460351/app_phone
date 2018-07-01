
import { MessageBox,Toast } from 'mint-ui'
import util from './../../api/util'
const order= {
    methods: {
        // 取消订单
        cancel(id,stu){
            let _this=this;
            MessageBox({
                title: "提示",
                message: "确认要取消订单吗",
                showCancelButton: true
            }).then(action => {
                if (action == "confirm") {
                    util.request({
                        url:`${_this.url}.cancel`,
                        method:'post',
                        data:{
                            id:id,
                            remark:''
                        },
                        success(res){
                            if(_this.list){
                                for(let i=0;i<_this.list.length;i++){
                                    if (_this.list[i].id === id) {
                                        _this.list.splice(i,1)
                                        break;
                                    }
                                }
                            }else {
                                _this.$route.query.a=stu;
                                _this.$route.query.stal=0;
                                setTimeout(()=>{
                                    _this.$router.go(-1)
                                },1000)
                            }
                            console.log(111)
                            Toast({
                                message: `取消成功`,
                                position: 'middle',
                                duration: 2000
                            });
                        },
                        error(){
                            console.log(178)
                        }

                    })
                } else if (action === "cancel") {
                    //表示点击了取消
                }
            });
        },
        //确认收货
        confirm(id){
            let _this=this
            MessageBox({
                title: "提示",
                message: "是否确认已收到货？",
                showCancelButton: true
            }).then(action => {
                if (action == "confirm") {
                    util.request({
                        // url:'order.op.finish',
                        url:`${_this.url}.finish`,
                        method:'post',
                        data:{
                            id:id,
                        },
                        success(res){
                            if(_this.list){
                                _this.select = 3;
//                              _this.getOrder(3)
								_this.getInitOrder(2)
                            }else {
                                _this.getOrderDetail()
                            }
                            Toast({
                                message: `已确认收货`,
                                position: 'middle',
                                duration: 2000
                            });
                        },
                        error(){

                        }
                    })
                } else if (action === "cancel") {
                    //表示点击了取消
                }
            });
        },
        //查看物流
        logistic(id){
            let _this=this;
            util.request({
                // url:'order.op.finish',
                url:'order.express',
                method:'POST',
                data:{
                    id:id,
                },
                success(res){
                    console.log('确认收货的res',res);
                    // if(true){
                    //     _this.select=3;
                    //     _this.getOrder(3)
                    // }else {
                    //     _this.getOrderDetail()
                    // }
                    // Toast({
                    //     message: `已确认收货`,
                    //     position: 'middle',
                    //     duration: 2000
                    // });
                },
                error(){

                },
                fail(res){
                    console.log('失败的res',res)
                }
            })
        },
        //提醒收货
        remind(id){
            let _this=this
            MessageBox({
                title: "提示",
                message: "确认要取消订单吗",
                showCancelButton: true
            }).then(action => {
                if (action == "confirm") {
                    util.request({
                        // url:'order.op.cancel',
                        url:`${_this.url}.cancel`,
                        method:'post',
                        data:{
                            id:id,
                            remark:''
                        },
                        success(res){
                            Toast({
                                message: `提醒成功`,
                                position: 'middle',
                                duration: 2000
                            });
                        },
                        error(){
                            
                        }

                    })
                } else if (action === "cancel") {
                    //表示点击了取消
                }
            });

        },
        //退货
        refund(id){
            let _this=this
            MessageBox({
                title: "提示",
                message: "确认要取消订单吗",
                showCancelButton: true
            }).then(action => {
                if (action == "confirm") {
                    util.request({
                        // url:'order.op.cancel',
                        url:`${_this.url}.cancel`,
                        method:'post',
                        data:{
                            id:id,
                            remark:''
                        },
                        success(res){
                            console.log(res.data)
                        },
                        error(){

                        }

                    })
                } else if (action === "cancel") {
                    //表示点击了取消
                }
            });
        },
        del(id,stu =''){
            let _this=this;
            MessageBox({
                title: "提示",
                message: "确认要删除订单吗",
                showCancelButton: true
            }).then(action => {
                if (action == "confirm") {
                    util.request({
                        url:`${_this.url}.delete`,
                        method:'post',
                        data:{
                            id:id,
                            remark:'',
                            userdeleted:'1'
                        },
                        success(res){
                            if(_this.list){
                                for(let i=0;i<_this.list.length;i++){
                                    if (_this.list[i].id === id) {
                                        _this.list.splice(i,1)
                                        break;
                                    }
                                }
                            }else {
                                _this.$route.query.a=stu;
                                _this.$route.query.stal=0;
                                setTimeout(()=>{
                                    _this.$router.go(-1)
                                },1000)
                            }
                        },
                        error(){

                        }

                    })
                } else if (action === "cancel") {
                    //表示点击了取消
                }
            });
        },
    }
}
export default order