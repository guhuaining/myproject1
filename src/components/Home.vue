<template>
    <div>
        <el-button type="info" @click="logout">退出</el-button>
    <div>
</template>

<script>
export default {
    methods:{
        logout() {
            //清除存储的token值，使失去访问权限
            window.sessionStorage.clear()
            //利用push将页面重定向到登录界面
            this.$router.push('/login')
            }
    }
}
</script>


<style lang="less" scoped>

</style>