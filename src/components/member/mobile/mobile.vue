<template>

    <div class="main">
        <!--个人信息模块-->
        <mt-header fixed title="绑定手机号">
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--个人信息 内容模块-->
        <div class="container">
            <ul class="userinfo-list">
                <li class="cell">
                    <span class="left">手机号</span>
                    <input type="text" v-model="mobile" class="right" placeholder="手机号">
                </li>
                <li class="cell">
                    <span class="left">验证码</span>
                    <input type="text" v-model="code" class="right" placeholder="请输入验证码">
                    <div :class="['mobile',{active: time ==='获取验证码'}]" @click="getCode">{{time}}</div>
                </li>
                <li class="cell">
                    <span class="left">登陆密码</span>
                    <input type="text" v-model="passwords" class="right" placeholder="请输入密码">
                </li>
                <li class="cell">
                    <span class="left">确认密码</span>
                    <input type="text" v-model="passwords1" class="right" placeholder="请确认密码">
                </li>
            </ul>
            <!-- 保存按钮 模块-->
            <button class="postUserInfo-item" @click="postUserInfo">
                确认修改
            </button>
        </div>

    </div>
</template>

<script>

    import util from '../../../api/util.js';
    import { Toast } from 'mint-ui'
    import {address, slots} from '../../../assets/js/address';
    import {members} from "../../../config/url";

    export default {
        data() {
            return {
                mobile:'',
                code:'',
                passwords:'',
                passwords1:'',
                time:'获取验证码'
            }
        },
        methods:{
            postUserInfo(){
                let _this=this;
                let params={
                    mobile:_this.mobile,
                    code:_this.code,
                    password:_this.passwords,
                    password1:_this.passwords1
                }

                if(!_this.mobile || !_this.code || !_this.passwords || !_this.passwords1){
                    Toast({
                        message: `请填写正确资料`,
                        position: 'middle',
                        duration: 2000
                    });
                    return
                }
                if(_this.passwords !== _this.passwords1){
                    Toast({
                        message: `两次密码不一致`,
                        position: 'middle',
                        duration: 2000
                    });
                    return
                }
                util.request({
                    url: 'member.bind.submit',
                    method: 'post',
                    data: params,
                    success: function () {
                        Toast({
                            message: `绑定成功成功`,
                            position: 'middle',
                            duration: 2000
                        });
                        setTimeout(() => {
                            _this.$router.go(-1)
                        }, 2000);
                    },
                    error: function (res) {
                        console.log(res)
                        if(res.data.error === 90000 ){
                            Toast({
                                message: `${res.data.message}`,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    }
                })
                
            },
            getCode(){
                const _this=this
                if(_this.time === '获取验证码'){
                    util.request({
                        url:'sms.changemobie',
                        method:'get',
                        data:{
                            mobile:_this.mobile
                        },
                        success:function (res) {
                            console.log('发送成功')
                            _this.time=59
                            let a=setInterval(()=>{
                                _this.time--
                                if(_this.time === 0 ){
                                    clearInterval(a)
                                    _this.time ='获取验证码'
                                }
                            },1000)

                        },
                        error:function () {

                        }
                    })
                }

            },
            init(){
                let _this=this;
                util.request({
                    url:'member.bind',
                    method:'get',
                    data:{},
                    success:function (res) {
                        _this.mobile = res.data.member.mobile
                    },
                    error:function () {

                    }
                })
            },
        },
        mounted(){
            this.init()
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(10);
        .container {
            .scroll-view(100%);
            margin-top: .4rem;
        }
    }
    .header {
        font-size: 0.20rem;
        height: 0.16rem;
      }
      .mint-header {
          font-size: 0.16rem;
      }
      .userinfo-list {
        margin-top: 0.10rem;
        overflow: hidden;
      }
    
      .cell {
        padding: 0rem 0.10rem;
        height: 0.5rem;
        background: #fff;
        border-bottom: 0.01rem solid #F3F4F5;
        position: relative;
        display: flex;
      }

      .cell .mobile {
          /*padding: .1rem 0 ;*/
          box-sizing: border-box;
          font-size: .14rem;
          line-height: .21rem;
          border-radius:.05rem;
          height: .29rem;
          display: inline-block;
          min-width: .6rem;
          padding: .04rem .08rem;
          -webkit-box-sizing: border-box;
          color: #ffffff;
          /*background: #ef4f4f;*/
          background: #979696;
          margin: .1rem 0;
    }
      .cell .active {
          background: #ef4f4f;
      }
      .cell .left {
        width: .64rem;
        line-height: 0.5rem;
        color: #333;
        text-align:justify;
        font-size: .14rem;
        /*text-align-last:justify;*/
      }
      .cell .right {
        flex: 1;
        margin-left: .2rem;
        box-sizing: border-box;
        padding: .1rem 0;
        left: .3rem;
        color: #727272;
        font-size: 0.14rem
      }
    
    
      .userinfo-header {
        margin-bottom: 0.1rem;
        line-height: .5rem;
        position: relative;
        align-items: center;
      }
      .userinfo-header .left {
        width: .64rem;
    
      }
      .userinfo-header .logo {
        width: 0.25rem;
        height: 0.25rem;
        background-size: cover;
        font-size: 0.12rem;
        color: #969696;
        border-radius: 50%;
        display: flex;
        position: absolute;
        right: .2rem;
      }
      .logo img {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 50%;
        align-items: center;
      }
    
      .postUserInfo {
        width: 100%;
        margin-top: 0.2rem;
      }
    
      .postUserInfo-item {
          width: 94%;
          border-radius:.05rem;
          box-sizing:border-box;
          cursor:pointer;
          font-family:inherit;
          font-size:.15rem;
          height:.4rem;
          line-height:.4rem;
          padding:0 .1rem;
          position:relative;
          text-align:center;
          text-decoration:none;
          text-overflow:ellipsis;
          white-space:nowrap;
          margin:0.5em;
          -webkit-user-select:none;
          user-select:none;
          transition-duration:300ms;
          transition-property:background-color;
          display:inline-block;
          z-index:100;
          background:#fe5455;
          color:#fff;
          border:1px solid #fe5455;
      }
    
      .picker-toolbar .mint-datetime-action {
        color: #979696 !important;
      }
    
      .mint-popup.mint-popup-bottom {
        width: 100%;
        background: #fff;
      }
    
      .userpopup-tp {
        padding: 0.12rem 0.33rem;
        font-size: 0.16rem;
        color: #2C2C2C;
        border-bottom: 0.01rem solid #ddd;
      }
    
      .userpopup-lf {
        font-size: 0.135rem;
        color: #979696;
      }
    
      .userpopup-lr {
        font-size: 0.135rem;
        color: #F5751D;
      }
      .picker-item {
        font-size: 0.16rem;
      }
    </style>
