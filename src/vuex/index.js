/**
 * Created by Crete on 17/6/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
    userAddress: {},
    addtype: '',
    orederAddress:{},
    coupon:{},
    couponList:{},
    store:{}
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
