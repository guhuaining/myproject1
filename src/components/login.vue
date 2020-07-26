<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src='../assets/logo.png' alt='picture'>
            </div>
            <!-- 登陆表单区 ,创建ref引用，方便获取表单的实例对象-->
            <el-form ref="LoginFormRef" class="login_form" :model="LoginForm" :rules="LoginFormRules">
                <!-- 用户名 -->
                <el-form-item  prop="user_name">
                    <!-- 通过prop传入对应规则，使规则能够生效 -->
                    <el-input prefix-icon="el-icon-user" v-model="LoginFrom.user_name"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="LoginFrom.password" type="password"></el-input>
                    <!-- 利用v-model实现双向数据绑定，password类型将帮助不以明文显示密码 -->
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" v-on="Login">登录</el-button>
                    <el-button type="info" v-on="restLogin">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 表单整体的属性值 
            LoginForm: {
                user_name: '',
                password: ''
            },
            // 表单的验证规则对象
            LoginFormRules: {
                // 验证用户名是否合法
                user_name: [
                    // 参考element-ui中的样本，trigger代表触发时机
                     { required: true, message: '请输入用户名称', trigger: 'blur' },
                     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码是否合法
                password: [
                     { required: true, message: '请输入登录密码', trigger: 'blur' },
                     { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        restLogin() {
            // 获取表单实例对象，调用方法将所有字段值重置为初始值并移除校验结果
            this.$refs.LoginForm.resetFields();
        },
        Login() {
        // 1.对整个表单进行校验的方法，参数为一个回调函数。
        // 2.该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。
        // 3.若不传入回调函数，则会返回一个 promise
        this.$refs.LoginForm.validate(async valid =>{
            if(!valid) return;
            //利用async&await处理promise对象，将数据参数通过login路径传到对应的后台api
            const {data: res} = await this.$http.post('login', this.LoginForm);
            console.log(res);
            //通过查询res中的状态码，利用message的对应方法返回登录状态
            if(res.meta.status!==200) return this.$message.error('登录失败');
            this.$message.success('登录成功');
            //1.将登录成功之后的Token保存到客户端的sessionstorge中
            //  1.1 项目中出了登录之外的其他API接口，必须登录之后才能访问
            //  1.2 token只在当前网站打开期间有效，所以将Token保存到客户端的sessionstorge中
           window.sessionStorage.setItem('token', res.data.token); 
           //2.通过编程式导航跳转到后台主页，路由地址是 /Home
            this.$router.push('/Home');
        })
    }
    }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: cadetblue;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: azure;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding:10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        img{
            widows: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .btns{
        display: flex;
        // 利用弹性盒实现尾部对齐
        justify-content: end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
}
</style>
