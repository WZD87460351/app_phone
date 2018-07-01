import util from './../../api/util'
import {
    Indicator,
    Toast
} from 'mint-ui';

const list = {
    data() {
        return {
            list: [],
            page: 1,
            psize: 10,
            loading:true
        }
    },
    methods: {
        getList(params, tag = 'list') {
            return new Promise((resolve, reject) => {
                let obj = {
                    'page': this.page,
                }
                util.request({
                    url: params.url,
                    data: Object.assign(obj, params.opt),
                    method: 'get',
                    success: res => {
                        if (res.data.list !== undefined) {
                            this.list = [...this.list, ...res.data[tag]]
                            1 === res.data.page / 1 && (this.loading = false)
                            1 === res.data.page / 1 && res.data[tag].length < res.data.pagesize && (this.loading = true)
                            if (0 === res.data[tag].length && res.data.page > 1) {
                                this.loading = true;
                                0 === res.data[tag].length && Toast({
                                    message: '后面没有了',
                                    position: 'bottom',
                                    duration: 1000
                                })
                            }
                        } else {
                            if (res.data.page > 1) {
                                this.loading = true;
                                Toast({
                                    message: '后面没有了',
                                    position: 'bottom',
                                    duration: 1000
                                })
                            }
                        }
                        Indicator.close()
                        resolve(res)
                    },
                    error(res = {}) {
                        Indicator.close()
                        reject(res)
                    },

                })
            })
        },
        loadMore(params, tag = 'list') {
            return new Promise((resolve, reject) => {
                this.page = this.page + 1
                this.getList(params, tag)
            })
        },
        listInit() {
            return new Promise((resolve, reject) => {
                this.loading = true
                this.list = []
                this.page = 1
                resolve()
            })
        },
        getParams(params) {
            return Object.assign({
                page: this.page,
                psize: this.psize
            }, params)
        },
        scrollTop(s) {
            return new Promise((resolve, reject) => {
                this.$el.querySelector(s).scrollTop = 0
                // console.log(`this.$el.querySelector(${s})的高度为${this.$el}`)
                resolve()
            })
        }
    },
    mounted() {

    }
}
export default list