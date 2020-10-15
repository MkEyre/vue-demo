import Vue from 'vue'
import moment from 'moment'
import axios from 'axios'
import App from './App.vue'
import 'lib-flexible'
import './styles/base.less'
import './styles/iconfont.css'
import {
  Field,
  Toast,
  Cell,
  CellGroup,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  List,
} from 'vant'
Vue.use(Field, Toast)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
Vue.use(List)

// 注册全局过滤器
Vue.filter('time', (val, str) => {
  return moment(val).format(str)
})

//将axios添加到vue的原型对象上，方便使用
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false
import router from './router/index'
import DemoHeader from './components/DemoHeader.vue'
import DemoLogo from './components/DemoLogo.vue'
import DemoButton from './components/DemoButton.vue'
import DemoPost from './components/DemoPost.vue'

Vue.component('demo-header', DemoHeader)
Vue.component('demo-logo', DemoLogo)
Vue.component('demo-button', DemoButton)
Vue.component('demo-post', DemoPost)

//请求拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = token
  }
  return config
})
//设置响应拦截器
// axios.interceptors.response.use(res => {
//   const { statusCode, message } = res.data
//   if (statusCode === 401 && message === '用户信息验证失败') {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user_id')
//     Toast.fail('token失效了')
//     router.push('/login')
//   }
//   return res
// })
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
