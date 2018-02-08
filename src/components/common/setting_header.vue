<template>
    <div class="header">
        <div class="header-content">
            <div class="title">
                设置
            </div>
            <div class="close" @click="close">
                <i class="el-icon-close"></i>
                关闭
            </div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'header',
                searchValue:'',
                face:'../../../static/img/user.jpg'
            }
        },
        methods:{
            chatList(){
                this.$router.push("chatList");
            },
            close(){
                this.$router.push("/");
            }
        }
    }
</script>
<style scoped>
.header{
    width:100%;
    background: #fff;
    box-shadow:0px 0px 2px 1px #ccc; 
}
.header .header-content{
    max-width:960px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 10px;
}
.header .header-content .title{
    color: #000;
    font-size: 1.2rem;
}
.header .header-content .close{
    color: #ccc;
    cursor: pointer;
}
.header .header-content .close:hover{
    color: #666;
}

</style>