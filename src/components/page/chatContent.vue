<template>
    <div class="consult">
        <div class="title">
            <span>
                聊天记录
            </span>
            <span class="del" @click="del">
                <i class="el-icon-delete"></i>
            </span>
        </div>
        <div class="content">
            <div v-for="item in chatContent" style="margin:5px 0;">
                <div class="left">
                    <div class="face">
                        <img src="../../../static/img/doctor.jpg" alt="">
                    </div>
                    <div class="leftlang ">
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
        

    </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        chatContent:[],
        value: '',
        radio: '1',
        steps:true,
        chatState:false,
        textarea:''
      };
    },
    mounted(){
        this.chat()
    },
    methods: {
      
      chat(){
        var qs = require('qs');
        let info = {};
        info.record_group_id= this.$route.query.record_group_id;
        this.$post('http://127.0.0.1:4000/getChatContent',qs.stringify(info)).then(res => {
            
            //  for(var i = 0;i<res.length;i++){
            //      if(res[i].send == this.getCookie('username')){
            //          res[i].classState = true;
            //      }else{
            //          res[i].classState = false;
            //      }
                 
            //  }
              this.chatContent = res;
            console.log(res)
         });
        
    },
    }
  }
</script>
<style scoped>
.del{
    float: right;
    color: red;
    cursor: pointer;
    margin-top: 5px;
}
.title{
    margin: 15px 0 10px 0;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
     
}
.title span:nth-child(1){
    font-size: 1.2rem;
    font-weight: bold;
    color: #666;
}
.content{
    width: 100%;
    height: 500px;
    overflow: auto;
}
.content .left{
    display: flex;
}
.content .right{
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
}

.content .left .face,.content .right .face{
    width: 35px;
    height: 35px;
}
.content .left .face img,.content .right .face img{
    width: 100%;
}
.content .right .lang{
    max-width: 60%;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 20px;
    background: #32BA58;
    color: #fff;
    border: 0;
}
.content .left .lang{
    max-width: 60%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 20px;
    background: #fff;
    color: #666;
}
.bottom p{
    font-size: 0.8rem;
}
.next{
    margin-top:10px; 
    clear: both;
}
.start{
    width: 200px;
    margin-top: 30px;
}
.start .el-button--success{
    background: #32BA58;
    border-radius: 5px;
}
.start .el-button--success:hover{
    background: rgba(50, 186,88, 0.8);
}
.chatContent{
    margin-top: 10px;
}
.button{
    float: right;
    margin-top: 10px;
}
</style>