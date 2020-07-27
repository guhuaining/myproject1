<template>
    <el-container>
        <!--  头部区-->
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' :'200px'">
              <!-- 通过属性绑定，利用collapse实现侧边栏大小的动态响应 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#333744" text-color="#fff" 
                active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" 
                router :default-active="activePath" >
                <!-- 一级菜单，利用v-for对于多层结构进行渲染，同时动态绑定key值，key值减少渲染压力，collapse-transition控制过度动画 -->
                    <!-- 动态绑定index，使得各级导航都可以独立张开，且由于index只接受字符串而非数字，加上空字符进行装化 -->
                    <!-- router启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                    <!-- 一级菜单的模板区域 -->
                    <template slot="title">
                    <!-- 图标 -->
                    <i :class="iconsObj[item.id]"></i>
                    <!-- 文本 ,这里的authname是后台接口返回的数据属性值-->
                    <span>{{item.authName}}</span>
                    </template>

                    <!-- 二级菜单,将菜单index动态绑定路径，作为路由跳转地址 -->
                    <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                    <!-- 定义函数保存导航链接的index路径 -->
                    <template slot="title">
                        <!-- 图标 -->
                        <i class="el-icon-menu"></i>
                        <!-- 文本 -->
                        <span>{{subItem.authName}}</span>
                    </template>
                    </el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
              <!-- 路由占位符 -->
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
    return {
      // 左侧菜单数据
      menulist: [],
      //以id作为值，图标作为内容，从而利用id进行匹配填充不同图标
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  //生命周期函数，在被create时就生效，调用方法获取所有左侧菜单
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
    methods:{
        logout() {
            //清除存储的token值，使失去访问权限
            window.sessionStorage.clear()
            //利用push将页面重定向到登录界面
            this.$router.push('/login')
            },
            // 从后台menus路径获取所有的菜单数据
            async getMenuList() {
            const { data: res } = await this.$http.get('menus')
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            //打印错误消息
            this.menulist = res.data
            console.log(res)
            },
            // 点击按钮，切换菜单的折叠与展开
            toggleCollapse() {
            this.isCollapse = !this.isCollapse
            },
            // 保存链接的激活状态到session
            saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
            }
    }
}
</script>


<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;//使元素组件横向贴边对齐
  padding-left: 0;
  align-items: center;//使按钮在纵向居中
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}
// 调整图标与文本的间距
.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>