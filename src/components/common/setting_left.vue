<template>
    <div class="left">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <el-menu-item index="/setting/me">
                <span class="sb-icon"><i class="iconfont icon-wode-"></i></span>
                <span class="sb-cn">账号</span>
            </el-menu-item>
            <el-menu-item index="/setting/del">
                <span class="sb-icon"><i class="iconfont icon-shanchu"></i></span>
                <span class="sb-cn">清除</span>
            </el-menu-item>
            
        </el-menu>
        
    </div>
</template>
<script>
    export default {
        data(){
            return{
                
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .left{
        width: 300px;
        text-align: left;
        margin-top:30px;
    }
    .el-menu{
        border: 0;
        background-color:transparent;
    }
    .el-menu span i{
        font-size: 1.3rem;
        margin-right: 5px;
    }
    .el-menu-item:focus, .el-menu-item:hover{
        background-color: #fff; 
    }
    .el-menu-item{
        height: 40px;
        line-height: 40px;
    }
</style>