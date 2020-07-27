import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/CSS/global.css'
import axios from 'axios'

Vue.config.productionTip = false
// 配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//在挂载到原型对象之前，设置请求拦截器进行预处理
axios.interceptors.request.use( config =>{
  //利用Authorization属性将token携带到请求头中
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http =axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
