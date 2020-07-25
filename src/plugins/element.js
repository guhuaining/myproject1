import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// 按需导入，然后利用vue.use注册为全局可用的组件

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//进行message的全局挂载,通过prototype原型对象使其他组件可以通过this进行访问
Vue.prototype.$message = Message
