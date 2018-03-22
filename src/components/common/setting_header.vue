<template>
    <div class="header">
        <div class="header-content">
            <div class="title">
                <div class="hidden-xs-only">
                    设置
                </div>
                
                <div class="hidden-sm-and-up">
                    <div v-if="show">
                        <i class="el-icon-close" @click="dll"></i>
                    </div>
                    <div v-else>
                        <i class="iconfont icon-caidan" @click="dll"></i>
                    </div>
                </div>
            </div>
            <div class="close" @click="close">
                <i class="el-icon-close"></i>
                关闭
            </div>
        </div>
        
    </div>
</template>
<script>
    import store from '../vuex/store'
    export default {
        data() {
            return {
                name: 'header',
                searchValue:'',
                face:'../../../static/img/user.jpg',
                show:false
            }
        },
        methods:{
            
        },
        computed:{
            myValue() {
                return this.$store.state.show
            }
        },
        methods:{
            chatList(){
                this.$router.push("/sqztc/chatList");
            },
            close(){
                this.$router.push("/sqztc");
            },
            
            dll(){
                if(store.state.show){
                    store.commit('hide');
                    this.show = false
                }else{
                    store.commit('show');
                    this.show = true
                }
                
            },
            
        },
        store,
        watch: {
            myValue: function(newVal) {
                
                if(store.state.show){
                    this.show = true
                }else{
                    this.show = false
                }
            }
        }
    }
</script>
<style scoped>
.hidden-sm-and-up{
    cursor: pointer;
}
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