import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// -------------------------------------蜂巢主页----------------------------------------------------------------------

//main的5个首页面
const mainHome = r => require.ensure([], () => r(require('../pages/main/home.vue')))
const mainService = r => require.ensure([], () => r(require('../pages/main/service.vue')))
const mainRelease = r => require.ensure([], () => r(require('../pages/main/release.vue')))
const mainMall = r => require.ensure([], () => r(require('../pages/main/mall.vue')))
const mainMy = r => require.ensure([], () => r(require('../pages/main/my.vue')))


//appstore子项目页面

const AppStore = r => require.ensure([], () => r(require('../pages/appStore/index')))
const appList = r => require.ensure([], () => r(require('../pages/appStore/appList')))
const appDetail = r => require.ensure([], () => r(require('../pages/appStore/appDetail')))
const Other = r => require.ensure([], () => r(require('../pages/appStore/other')))
const Socket = r => require.ensure([], () => r(require('../pages/appStore/socket')))

//login的页面
const LoginFirst = r => require.ensure([], () => r(require('../pages/login/login-first')))
const LoginPage = r => require.ensure([], () => r(require('../pages/login/login-page')))
const LoginRegistered = r => require.ensure([], () => r(require('../pages/login/login-registered')))
const ForgetPwd = r => require.ensure([], () => r(require('../pages/login/forget-pwd')))


//房源详情和室友详情页面
const RoomDetail = r => require.ensure([], () => r(require('../pages/details/roomDetail')))

//我的收藏详情页面
const MyCollect = r => require.ensure([], () => r(require('../pages/details/myCollect')))
//我的积分商城页面
const MyPointMall = r => require.ensure([], () => r(require('../pages/details/myPointMall')))
//我的服务页面
const MyService = r => require.ensure([], () => r(require('../pages/details/myService')))
//我的发布页面
const MyRelease = r => require.ensure([], () => r(require('../pages/details/myRelease')))
//常见问题页面
const CommonProblem = r => require.ensure([], () => r(require('../pages/details/commonProblem')))
//蜂巢客服页面
const CustomerService = r => require.ensure([], () => r(require('../pages/details/customerService')))


//发布的住房列表页面
const RoomList = r => require.ensure([], () => r(require('../pages/details/roomList')))

//发布的室友列表页面
const RoommateList = r => require.ensure([], () => r(require('../pages/details/roommateList')))

//编辑个人信息页面
const EditMineInfo = r => require.ensure([], () => r(require('../pages/details/editMineInfo')))

//预约服务页面
const ServiceAppointment = r => require.ensure([], () => r(require('../pages/details/serviceAppointment')))

//首页搜索获得焦点跳转页面
const SearchPage = r => require.ensure([], () => r(require('../pages/details/searchPage')))

//支付页面
const Payment = r => require.ensure([], () => r(require('../pages/pay/payment')))


// -------------------------------------商城页面开始----------------------------------------------------------------------

/* index */
import Home from '@/components/index/home/index'

const Product = r => require.ensure([], () => r(require('@/components/index/goods/goods.vue')), 'index');
const Category = r => require.ensure([], () => r(require('@/components/index/category/category.vue')), 'index');
// const List = r => require.ensure([], () => r(require('@/components/index/list/list.vue')), 'index');
const List = r => require.ensure([], () => r(require('@/components/index/goodList/list.vue')), 'index');
const goodList = r => require.ensure([], () => r(require('@/components/index/goodList/list.vue')), 'index');
const Special = r => require.ensure([], () => r(require('@/components/index/special/special.vue')), 'index');
const SpecialList = r => require.ensure([], () => r(require('@/components/index/special/specialList.vue')), 'index');
const Search = r => require.ensure([], () => r(require('@/components/index/search/search.vue')), 'index');
const Test = r => require.ensure([], () => r(require('@/components/test.vue')), 'index');

// member
const UserCenter = r => require.ensure([], () => r(require('@/components/member/userCenter/index.vue')), 'member')
const Cart = r => require.ensure([], () => r(require('@/components/member/cart/cart.vue')), 'member')
const Address = r => require.ensure([], () => r(require('@/components/member/address/list/addressList.vue')), 'member')
const Add = r => require.ensure([], () => r(require('@/components/member/address/edit/add.vue')), 'member')
const Edit = r => require.ensure([], () => r(require('@/components/member/address/edit/edit.vue')), 'member')
const Favorite = r => require.ensure([], () => r(require('@/components/member/favorite/favorite.vue')), 'member')
const History = r => require.ensure([], () => r(require('@/components/member/history/history.vue')), 'member')
const UserInfo = r => require.ensure([], () => r(require('@/components/member/userInfo/userInfo.vue')), 'member');
const Mobile = r => require.ensure([], () => r(require('@/components/member/mobile/mobile.vue')), 'member');
const Recharge = r => require.ensure([], () => r(require('@/components/member/recharge/recharge.vue')), 'member');

// order;
const Order = r => require.ensure([], () => r(require('@/components/order/index/index.vue')), 'order');
const Detail = r => require.ensure([], () => r(require('@/components/order/detail/detail.vue')), 'order');
const Pay = r => require.ensure([], () => r(require('@/components/order/pay/pay.vue')), 'order');
const Confirm = r => require.ensure([], () => r(require('@/components/order/confirm/confirm.vue')), 'order');
const Store = r => require.ensure([], () => r(require('@/components/order/confirm/store.vue')), 'order');
const Logistics = r => require.ensure([], () => r(require('@/components/order/Logistics/Logistics.vue')), 'order');
const Refund = r => require.ensure([], () => r(require('@/components/order/refund/refund.vue')), 'order');

// integralMall
const integralMall = r => require.ensure([], () => r(require('@/components/integralMall/integralMall.vue')), 'integralMall');
const integralIndex = r => require.ensure([], () => r(require('@/components/integralMall/index/index.vue')), 'integralMall');
const integralType = r => require.ensure([], () => r(require('@/components/integralMall/class/class.vue')), 'integralMall');
const integralOrder = r => require.ensure([], () => r(require('@/components/integralMall/order/order.vue')), 'integralMall');
const integralProduct = r => require.ensure([], () => r(require('@/components/integralMall/goods/goods.vue')), 'integralMall');
const integralDetail = r => require.ensure([], () => r(require('@/components/integralMall/detail/detail.vue')), 'integralMall');
const integralConfirm = r => require.ensure([], () => r(require('@/components/integralMall/confirm/confirm.vue')), 'integralMall');
const integralMake = r => require.ensure([], () => r(require('@/components/integralMall/confirm/make.vue')), 'integralMall');
const integralExchange = r => require.ensure([], () => r(require('@/components/integralMall/exchange/exchange.vue')), 'integralMall');


// 拼团
const Group = r => require.ensure([], () => r(require('@/components/group/group.vue')), 'group');
const GroupIndex = r => require.ensure([], () => r(require('@/components/group/index/index.vue')), 'group');
const Action = r => require.ensure([], () => r(require('@/components/group/action/action.vue')), 'group');
const ActivityList = r => require.ensure([], () => r(require('@/components/group/activityList/activityList.vue')), 'group');
const GroupList = r => require.ensure([], () => r(require('@/components/group/groupList/groupList.vue')), 'group');

const GroupListDetail = r => require.ensure([], () => r(require('@/components/group/groupListDetail/groupListDetail.vue')), 'group');
// const GroupOrder = r => require.ensure([], () => r(require('@/components/group/order/order.vue')), 'group');
const GroupOrder = r => require.ensure([], () => r(require('@/components/group/order/index.vue')), 'group');
const GroupOrderDetail = r => require.ensure([], () => r(require('@/components/group/order/detail/orderDetail.vue')), 'group');
const GroupProduct = r => require.ensure([], () => r(require('@/components/group/product/product.vue')), 'group');
const GroupUser = r => require.ensure([], () => r(require('@/components/group/user/user.vue')), 'group');
const groupConfirm = r => require.ensure([], () => r(require('@/components/group/confirm/confirm.vue')), 'group');
// const GroupIndex = r => require.ensure([], () => r(require('@/components/group/index/index.vue')), 'group');
const GroupJoin = r => require.ensure([], () => r(require('@/components/group/groupJoin/join.vue')), 'group');

//秒杀
const SecKill = r => require.ensure([], () => r(require('@/components/seckill/index/index.vue')), 'seckill');


//分销  ComWithdraw
const Distribution = r => require.ensure([], () => r(require('@/components/distribution/index/index.vue')), 'distribution');
const Commission = r => require.ensure([], () => r(require('@/components/distribution/Commission/Commission.vue')), 'distribution');
const ComWithdraw = r => require.ensure([], () => r(require('@/components/distribution/Commission/comWithdraw.vue')), 'distribution');
const DistributionOrder = r => require.ensure([], () => r(require('@/components/distribution/order/order.vue')), 'distribution');
const Withdrawals = r => require.ensure([], () => r(require('@/components/distribution/Withdrawals/Withdrawals.vue')), 'distribution');
const Partner = r => require.ensure([], () => r(require('@/components/distribution/partner/partner.vue')), 'distribution');
const QCode = r => require.ensure([], () => r(require('@/components/distribution/qCode/qCode.vue')), 'distribution');

//优惠券
const CouponList = r => require.ensure([], () => r(require('@/components/coupon/couponList/couponList.vue')), 'coupon');
const Coupon = r => require.ensure([], () => r(require('@/components/coupon/coupon/coupon.vue')), 'coupon');
const CouponDetail = r => require.ensure([], () => r(require('@/components/coupon/couponDetail/couponDetail.vue')), 'coupon');
const CouponDetails = r => require.ensure([], () => r(require('@/components/coupon/couponDetail/couponDetails.vue')), 'coupon');
const Exchange = r => require.ensure([], () => r(require('@/components/coupon/exchange/exchange.vue')), 'coupon');
const useCoupon = r => require.ensure([], () => r(require('@/components/coupon/useCoupon/useCoupon.vue')), 'coupon');
const ChoseCoupon = r => require.ensure([], () => r(require('@/components/coupon/choseCoupon/chose.vue')), 'coupon');


const GroupRoute =  {
    path: '/group/index',
    name: 'groupIndex',
    component: GroupIndex,
    children: [
        {
            path: '/group/product',
            name: 'groupProduct',
            component: GroupProduct,
        },
        {
            path: '/group/confirm',
            name: 'groupConfirm',
            component: groupConfirm,
            children: [
                {
                    path: '/group/confirm/address',
                    name: 'gaddList',
                    component: Address,
                    children: [
                        {
                            path: '/group/confirm/address/add',
                            name: 'gaddAddress',
                            component: Add,
                        },
                        {
                            path: '/group/confirm/address/edit',
                            name: 'geditAddress',
                            component: Edit,
                        }
                    ]
                }

            ]
        },
        {
            path: '/group/action',
            name: 'groupAction',
            component: Action,
        },
        {
            path: '/group/join',
            name: 'groupJoin',
            component: GroupJoin
        },
        // 活动列表
        {
            path: '/group/activityList',
            name: 'activityList',
            component: ActivityList,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/group/activity/product',
                    name: 'activityProduct',
                    component: GroupProduct,
                }
            ]
        },

        // 订单
        {
            path: '/group/order',
            name: 'groupOrder',
            component: GroupOrder,
            children: [
                {
                    path: '/group/order/detail',
                    name: 'GroupOrderDetail',
                    component: GroupOrderDetail,
                }
            ]
        },

        // 我的团
        {
            path: '/group/my',
            name: 'GroupList',
            component: GroupList,
            // meta: { keepAlive: true },
        },
        {
            path: '/group/ListDetail',
            name: 'GroupListDetail',
            component: GroupListDetail,
        }
    ]
}

const integralRoute =  {
    path: '/integral/index',
    name: 'integralIndex',
    component: integralIndex,
    meta: {keepAlive: false},
    children: [
        {
            path: '/integral/exchange',
            name: 'integralExchange',
            component: integralExchange,
            meta: {keepAlive: false},
        },
        {
            path: '/integral/type',
            name: 'integralType',
            component: integralType,
            meta: {keepAlive: true},
        },
        {
            path: '/integral/search',
            name: 'isearch',
            component: Search,
            meta: {keepAlive: false},
        },
        {
            path: '/integral/order',
            name: 'integralOrder',
            component: integralOrder,
            meta: {keepAlive: true},
            children: [
                {
                    path: '/integral/detail',
                    name: 'integralDetail',
                    component: integralDetail,
                    children: [
                        {
                            path: '/integral/detail/address',
                            name: 'iaddList',
                            component: Address,
                            children: [
                                {
                                    path: '/integral/detail/address/add',
                                    name: 'iaddAddress',
                                    component: Add,
                                },
                                {
                                    path: '/integral/detail/address/edit',
                                    name: 'ieditAddress',
                                    component: Edit,
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        {
            path: '/integral/product',
            name: 'integralProduct',
            component: integralProduct,
            meta: {keepAlive: false},
        },
        {
            path: '/integral/confirm',
            name: 'integralConfirm',
            component: integralConfirm,
            children: [
                {
                    path: '/integral/confirm/address',
                    name: 'icaddList',
                    component: Address,
                    children: [
                        {
                            path: '/integral/confirm/address/add',
                            name: 'icaddAddress',
                            component: Add,
                        },
                        {
                            path: '/integral/confirm/address/edit',
                            name: 'iceditAddress',
                            component: Edit,
                        }
                    ]
                }

            ]
        },
        {
            path: '/integral/make',
            name: 'integralMake',
            component: integralMake,

        }
    ]
}

const distributionRoute = {
    path: '/distribution',
    name: 'distribution',
    component: Distribution,
    meta: { keepAlive: false },
    children: [
        {
            path: '/distribution/commision',
            name: 'commission',
            component: Commission,
            children: [
                {
                    path: '/distribution/commision/comWithdraw',
                    name: 'comWithdraw',
                    component: ComWithdraw,
                },
            ]
        },
        {
            path: '/distribution/distributionOrder',
            name: 'distributionOrder',
            component: DistributionOrder,
        },
        {
            path: '/distribution/withdrawals',
            name: 'withdrawals',
            component: Withdrawals,
        },
        {
            path: '/distribution/partner',
            name: 'partner',
            component: Partner,
        },
        {
            path: '/distribution/qCode',
            name: 'qCode',
            component: QCode,
            children: [
                {
                    path: '/distribution/qCode/userinfo',
                    name: 'disuserinfo',
                    component: UserInfo,
                }
            ]
        }
    ]
}

const userRoute =  {
        path: '/userCenter',
        name: 'userCenter',
        component: UserCenter,
        // meta: { keepAlive: true },
        meta: { keepAlive: false },
        children: [
            {
                path: '/user/address',
                name: 'address',
                component: Address,
                children: [
                    {
                        path: '/user/add',
                        name: 'add',
                        component: Add,
                    },
                    {
                        path: '/user/edit',
                        name: 'edit',
                        component: Edit,
                    }
                ]
            },
            {
                path: '/user/favorite',
                name: 'favorite',
                component: Favorite,
                children: [
                    {
                        path: '/user/favorite/product',
                        name: 'favoriteproduct',
                        component: Product,
                    }
                ]
            },
            {
                path: '/user/history',
                name: 'history',
                component: History,
                children: [
                    {
                        path: '/user/history/product',
                        name: 'historyproduct',
                        component: Product,
                    }
                ]
            },
            {
                path: '/user/userInfo',
                name: 'userInfo',
                component: UserInfo,
            },
            {
                path: '/user/recharge',
                name: 'recharge',
                component: Recharge,
            },
            {
                path: '/couponList',
                name: 'couponList',
                component: CouponList,
                // children: [{
                //     path: '/couponList/coupon',
                //     name: 'couponIndex',
                //     component: Coupon,
                // }]
            },
            {
                path: '/coupon',
                name: 'coupon',
                component: Coupon,
                children: [
                    {
                        path: '/couponDetail',
                        name: 'couponDetail',
                        component: CouponDetail,
                        children: [
                            {
                                path: '/exchange',
                                name: 'exchange',
                                component: Exchange,
                                children: [
                                    // {
                                    //     path: '/exchange/list',
                                    //     name: 'exchangeLists',
                                    //     component: List
                                    // },
                                    {
                                        path: '/exchange/product',
                                        name: 'exchangeProduct',
                                        component: Product
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        path: '/couponDetails',
                        name: 'couponDetails',
                        component: CouponDetails,
                        children: [
                            /*{
                                path:'/exchanges',
                                name:'exchanges',
                                component: Exchange,
                            },*/
                        ]
                    },
                ]
            },
            // integralRoute,
            distributionRoute
        ]
    }

const orderRoute ={
        path: '/order',
        name: 'order',
        component: Order,
        meta: { keepAlive: false },
        children: [
            {
                path: '/detail',
                name: 'detail',
                component: Detail,
                children:[
                    {
                        path: '/refund',
                        name: 'refund',
                        component: Refund,
                    }
                ]
            },
            {
                path: '/logistics',
                name: 'logistics',
                component: Logistics,
            }

        ]
    }

export default new Router({
    routes: [
        { path: "",redirect:"/loginFirst" },
        { path: "/mainHome",component: mainHome ,meta: { keepAlive: true }},
        { path: "/mainService",component: mainService},
        { path: "/mainRelease",component: mainRelease},
        { path: "/mainMall",component: mainMall},
        { path: "/mainMy",component: mainMy, meta: {keepAlive: false }},

        //appstore 路由
        { path: "/appstore",component: AppStore},
        { path: "/applist", component: appList },
        { path: "/appDetail", component: appDetail },
        { path: "/other", component: Other },
        { path: "/socket", component: Socket },

        //login 路由
        { path: "/loginFirst",component: LoginFirst},
        { path: "/loginPage",component: LoginPage},
        { path: "/LoginRegistered",component: LoginRegistered},
        { path: "/ForgetPwd",component: ForgetPwd},


        //详情页面路由 室友和房源详情
        { path: "/RoomDetail",component: RoomDetail},

        //我的收藏详情路由
        { path: "/MyCollect",component: MyCollect},
        //我的积分商城页面
        { path: "/MyPointMall",component: MyPointMall},
        //我的服务页面
        { path: "/MyService",component: MyService},
        //我的发布页面
        { path: "/MyRelease",component: MyRelease},
        //常见问题页面
        { path: "/CommonProblem",component: CommonProblem},
        //蜂巢客服页面
        { path: "/CustomerService",component: CustomerService},

        //发布住房列表路由
        { path: "/RoomList",component: RoomList},
        //发布的室友列表路由
        { path: "/RoommateList",component: RoommateList},
        //编辑个人信息页面路由
        { path: "/EditMineInfo",component: EditMineInfo},

        //预约服务页面路由
        { path: "/ServiceAppointment",component: ServiceAppointment,meta: {keepAlive: true}},

        //首页搜索获得焦点跳转的搜索页面
        { path: "/SearchPage",component: SearchPage,meta: {keepAlive: true}},

        //支付页面
        { path: "/Payment",component: Payment,meta: {keepAlive: true}},




        //商城路由开始
        {
            path: '/mallIndex',
            name: 'index',
            component: Home,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/list',
                    name: 'list',
                    component: List,
                    children: [
                        {
                            path: '/list/product',
                            name: 'listproduct',
                            component: Product
                        },
                    ]
                },
                {
                    path: '/search',
                    name: 'search',
                    component: Search
                },
                {
                    path: '/specialList',
                    name: 'specialList',
                    component: SpecialList,
                    children:[
                        {
                            path: '/specialList/special',
                            name: 'special',
                            component: Special
                        },
                    ]
                },
                {
                    path: '/product',
                    name: 'homeproduct',
                    component: Product
                },
                GroupRoute,
                // integralRoute,
            ]
        },
        {
            path: '/category',
            name: 'category',
            component: Category,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/category/list',
                    name: 'lists',
                    component: List
                },
                {
                    path: '/category/search',
                    name: 'csearch',
                    component: Search
                }
            ]
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/cart/product',
                    name: 'cartproduct',
                    component: Product
                }
            ]
        },
        userRoute,
        orderRoute,
        {
            path: '/confirm',
            name: 'confirm',
            component: Confirm,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/confirm/address',
                    name: 'addList',
                    component: Address,
                    children: [
                        {
                            path: '/confirm/address/add',
                            name: 'addAddress',
                            component: Add,
                        },
                        {
                            path: '/confirm/address/edit',
                            name: 'editAddress',
                            component: Edit,
                        }
                    ]
                },
                {
                    path: '/choseCoupon',
                    name: 'choseCoupon',
                    component: ChoseCoupon
                },
                {
                    path: '/store',
                    name: 'store',
                    component: Store
                }
            ]
        },
        // 订单

        {
            path: '/order',
            name: 'order',
            component: Order,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/detail',
                    name: 'detail',
                    component: Detail
                },
                {
                    path: '/logistics',
                    name: 'logistics',
                    component: Logistics,
                }
            ]
        },
        integralRoute,

        //支付
        {
            path: '/pay',
            name: 'pay',
            component: Pay,
            meta: { keepAlive: false },
        },
        {
            path: '/mobile',
            name: 'mobile',
            component: Mobile,
            meta: { keepAlive: false },
        },
        {
            path: '/product',
            name: 'product',
            component: Product,
            meta: { keepAlive: false },
        },
        //秒杀
        {
            path: '/seckill',
            name: 'seckill',
            component: SecKill,
            meta: { keepAlive: false },
        },
        {
            path: '/test',
            name: 'test',
            component: goodList
        },
    ],
    linkActiveClass:"my-active"
})