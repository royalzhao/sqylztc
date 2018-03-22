<template>
    <div>
        <div class="left hidden-xs-only">
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
                <el-menu-item index="/sqztc/setting/me">
                    <span class="sb-icon"><i class="iconfont icon-wode-"></i></span>
                    <span class="sb-cn">账号</span>
                </el-menu-item>
                <el-menu-item index="/sqztc/setting/del">
                    <span class="sb-icon"><i class="iconfont icon-shanchu"></i></span>
                    <span class="sb-cn">清除</span>
                </el-menu-item>
                
            </el-menu>
            
        </div>
        <div id="modal"></div>
        <div class="left leftXs hidden-sm-and-up" id="leftXs" >
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
                <el-menu-item index="/sqztc/setting/me">
                    <span class="sb-icon"><i class="iconfont icon-wode-"></i></span>
                    <span class="sb-cn">账号</span>
                </el-menu-item>
                <el-menu-item index="/sqztc/setting/del">
                    <span class="sb-icon"><i class="iconfont icon-shanchu"></i></span>
                    <span class="sb-cn">清除</span>
                </el-menu-item>
                
            </el-menu>
        </div>
    </div>
    
</template>
<script>
    import store from '../vuex/store'
    export default {
        data(){
            return{
                
            }
        },
        store,
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            myValue() {
                return this.$store.state.show
            }
        },
        mounted() {
             //初始化
             this.init()
        },
        methods:{
            init(){
                var left = document.getElementById('leftXs');
                var modal = document.getElementById('modal');
                if(store.state.show){
                    left.style.marginLeft = '0';
                    modal.style.display = 'block';
                }else{
                    left.style.marginLeft = '-300px';
                    modal.style.display = 'none';
                }
            },
            talk(){
                this.$router.push('consult');
            },
            order(){
                this.$router.push('order');
            }
        },
        watch: {
            myValue: function(newVal) {
                var left = document.getElementById('leftXs');
                var modal = document.getElementById('modal');
                //其他业务代码
                if(store.state.show){
                    left.style.marginLeft = '0';
                    modal.style.display = 'block';
                }else{
                    left.style.marginLeft = '-300px';
                    modal.style.display = 'none';
                }
            },
            onRoutes:function(){
                var left = document.getElementById('leftXs');
                var modal = document.getElementById('modal');
                left.style.marginLeft = '-300px';
                modal.style.display = 'none';
                store.commit('hide');
            }
        }
    }
</script>
<style scoped>
    .left{
        width: 300px;
        text-align: left;
    }
    .leftXs{
        transition: all 0.45s;
        position: fixed;
        z-index: 999;
        background: #fff;
        height: 100%;
        box-shadow:3px 0px 3px #ccc;
    }
    #modal{
        position: fixed;
        top: 48.39px;
        bottom: 0;
        left: 0;
        right:0;
        background: rgba(243, 241, 241, 0.8);
        z-index: 998;
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