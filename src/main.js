import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {post} from 'common/js/util'
import * as custom from 'common/js/filter'
import 'common/stylus/index.styl'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'

Vue.config.productionTip = false
Vue.prototype.$post = post
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
