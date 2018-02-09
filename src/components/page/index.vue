<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="content">
            <div class="left" id="left">
                <v-sidebar></v-sidebar>
            </div>
            <div class="right" id="layout">
                <transition name="move" class="box" mode="out-in"><router-view></router-view></transition>
            </div>
            
            
        </div>
    </div>
</template>

<script>
    import vHead from '../common/header.vue';
    import vSidebar from '../common/left.vue';
    export default {
        components:{
            vHead, vSidebar
        },
        data(){
            return{
                screenHeight: document.body.clientHeight-70,//减去header的60px
            }
        },
        mounted () {
            document.getElementById('layout').style.height=this.screenHeight+"px";//页面初始化
            window.onresize = () => {
                return (() => {
                    this.screenHeight = document.body.clientHeight
                })()
            }
        },
        watch:{
            screenHeight (val) {
                this.screenHeight = val
                document.getElementById('layout').style.height=this.screenHeight-70+"px";//检测窗口的大小，并赋值
                document.getElementById('left').style.height=this.screenHeight-70+"px";//检测窗口的大小，并赋值
            }
        }
    }
</script>
<style scoped>
    .content{
        max-width: 960px;
        margin: 0px auto;
        display: flex;
        justify-content: space-between;
        
    }
    .content .left{
        float: left;
    }
    .content .right{
        float: right;
        width: 100%;
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
    }
    
</style>
    