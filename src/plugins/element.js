import Vue from 'vue'
import { 
    Button, 
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip
} from 'element-ui'
// 按需导入，然后利用vue.use注册为全局可用的组件

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
vue.use(Tooltip)
//进行Message的全局挂载,通过prototype原型对象使其他组件可以通过this进行访问
Vue.prototype.$message = Message
