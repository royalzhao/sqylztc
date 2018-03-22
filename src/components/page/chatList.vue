<template>
    <div>
        <h3>咨询记录</h3>
        <div class="chatList_wrap">
            <div class="acticle" @click="chatDetail(item.record_group_id,item.send)" v-for="item in chatList">
                <div class="user_img">
                    <img :src="item.face" alt="头像">
                </div>
                <div class="acticle_content">
                    <div class="top">
                        <span class="user">{{item.name}}</span>
                        <span class="time">{{item.TIME}}</span>
                    </div>
                    <div class="bottom">
                        <span>{{item.content}}</span>
                        <span v-if="item.state=='true'"></span>
                        <span v-else class="badeg"></span>
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
                
            ],
            info:{
                username:''
            }
        }
    },
    mounted(){
        this.list()
    },
    methods:{
        chatDetail(record_group_id,send) {
            if(record_group_id !== undefined) {
                this.$router.push({path:'chatContent',query:{record_group_id:record_group_id,send:send}});
            }
        },
        list(){
            var qs = require('qs');
            let user = this.getCookie('username');
            this.info.username = user
            let userType = this.getCookie('userType');
            if(userType == '1'){
                this.$post('http://www.spn365.cn:4000/getGroupList',qs.stringify(this.info)).then(res => {
                    //console.log(typeof(res[0].state))
                    var a = res;
                    this.$post('http://www.spn365.cn:4000/getGroupState',qs.stringify(this.info)).then(res => {
                        console.log(res)
                        var _this = res;
                        for(var j = 0;j<_this.length;j++){
                            for(var i = 0;i<a.length;i++){
                            
                                if(_this[j].record_group_id == a[i].record_group_id){
                                    a[i].state = _this[j].state;
                                    continue;
                                }else{
                                    a[i].state = 'true'
                                }
                            }
                        }
                        this.chatList = a
                        console.log(this.chatList[0])
                    });
                });
            }else if(userType == '2'){
                console.log(2)
                this.$post('http://www.spn365.cn:4000/getDoctorGroupList',qs.stringify(this.info)).then(res => {
                    //console.log(typeof(res[0].state))
                    var a = res;
                    this.$post('http://www.spn365.cn:4000/getDoctorGroupState',qs.stringify(this.info)).then(res => {
                        console.log(res)
                        var _this = res;
                        for(var j = 0;j<_this.length;j++){
                            for(var i = 0;i<a.length;i++){
                            
                                if(_this[j].record_group_id == a[i].record_group_id){
                                    a[i].state = _this[j].state;
                                    continue;
                                }else{
                                    a[i].state = 'true'
                                }
                            }
                        }
                        this.chatList = a
                        console.log(this.chatList[0])
                    });
                });
            }
            
            
        }
    },
    computed:{
        
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
    width: 10px;
    height: 10px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 50%;
    box-sizing: border-box;
    background: #f56c6c;
}


</style>