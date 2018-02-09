<template>
    <div>
        <h3>咨询记录</h3>
        <div class="chatList_wrap">
            <div class="acticle" @click="chatDetail(item.id)" v-for="item in chatList">
                <div class="user_img">
                    <img :src="item.img" alt="头像">
                </div>
                <div class="acticle_content">
                    <div class="top">
                        <span class="user">{{item.name}}</span>
                        <span class="time">{{item.time}}</span>
                    </div>
                    <div class="bottom">
                        <span>{{item.content}}</span>
                        <el-badge :value="200" :max="99" class="badeg"></el-badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            chatList:[
                {
                    id:'1',
                    img:'../../../static/img/user.jpg',
                    name:'张三',
                    time:'17:42',
                    content:'aaaaaaaaaaaaaaaaaa'
                },
                {
                    id:'2',
                    img:'../../../static/img/user.jpg',
                    name:'张三',
                    time:'17:42',
                    content:'aaaaaaaaaaaaaaaaaa'
                }
            ]
        }
    },
    methods:{
        chatDetail(id) {
            if(id !== undefined) {
                this.$router.push({path:'chatContent',query:{id:id}});
            }
        }
    }

}
</script>
<style scoped>
.acticle{
    display: flex;
    padding: 10px 0;
    cursor: pointer;
    border-bottom: 1px solid #F0F0F0;
}
.chatList_wrap .acticle:last-of-type {
    border: 0;
}
.acticle .user_img{
    width: 50px;
    height: 50px;
}
.acticle .user_img img{
    width: 100%;
}
.acticle .acticle_content{
    margin-left: 10px;
    width: 100%;
}
.acticle .acticle_content .top{
    margin-top: 5px;
    width: 100%;
}
.acticle .acticle_content .top .user{
    font-weight: bold;
    font-family: "宋体";

}
.acticle .acticle_content .top .time{
    font-size: 0.8rem;
    color: #ccc;
    float: right;
}
.acticle .acticle_content .bottom{
    font-size: 0.8rem;
    color: #666;
}
.acticle .acticle_content .bottom .badeg{
    float: right;
}


</style>