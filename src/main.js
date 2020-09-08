import 'babel-polyfill'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
// import 'normalize.css/normalize.css'
import '@/styles/index.scss' // 全局CSS
import commonComponents from '@/commons'
// import '@/utils/mixin'
import ElementUI from 'element-ui'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import App from './App'
import router from './router'
import store from './store'
import request from '@/api/request'
import bus from '@/utils/bus'
import drag from '@/directives/dragDom'
// import '@/icons'
import { eachOwn } from '@/utils'
Vue.use(ElementUI, { size: 'medium' })
Vue.directive('drag', drag)
Vue.config.productionTip = false
eachOwn(commonComponents, (item, key) => {
  Vue.component(key, item)
})

Vue.prototype.$request = request
// 原型链挂载
Object.defineProperties(Vue.prototype, {
  $bus: {
    value: bus
  }
})
import directives from '@/directives/index'
import filters from '@/filters'
Vue.use(directives)
Vue.use(filters)
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
