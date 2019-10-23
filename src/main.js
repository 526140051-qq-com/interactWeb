import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {post} from 'common/js/util'
import 'common/stylus/index.styl'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'

Vue.config.productionTip = false
Vue.prototype.$post = post

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
