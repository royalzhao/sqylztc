<template>
    <div class="consult">
        <div class="title">
            <span>
                聊天记录
            </span>
            <span class="title_right">
                <span class="del" @click="del">
                    <i class="el-icon-delete"></i>
                </span>
                <span class="refresh" @click="refresh">
                    <i class="iconfont icon-icon-refresh"></i>
                </span>
            </span>
            
        </div>
        <div class="content" id="content">
            <div v-for="item in chatContent" style="margin:5px 0;">
                <div class="left" v-bind:class="{ right: item.classState }">
                    <div class="face">
                        <img src="../../../static/img/doctor.jpg" alt="">
                    </div>
                    <div class="leftlang " v-bind:class="{ rightlang: item.classState }">
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="chatContent">
                <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
            </div>
            <div class="button">
                <el-button size="small" @click="send">发送</el-button>
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
    watch: {
        chatContent: function(){
            this.$nextTick(() => {
                var div = document.getElementById('content')
                div.scrollTop = div.scrollHeight
            })  
        }
    },
    methods: {
      
      chat(){
        var qs = require('qs');
        let info = {};
        info.record_group_id= this.$route.query.record_group_id;
        info.receiver= this.getCookie('username');
        this.$post('http://127.0.0.1:4000/getChatContent',qs.stringify(info)).then(res => {
            
             for(var i = 0;i<res.length;i++){
                 if(res[i].send == this.getCookie('username')){
                     res[i].classState = true;
                 }else{
                     res[i].classState = false;
                 }
                 
             }
              this.chatContent = res;
           // console.log(res)
         });
        this.$post('http://127.0.0.1:4000/changeState',qs.stringify(info)).then(res => {
            
            console.log(res.message)
         });
        
        },
        
        send(){
            var qs = require('qs');
            let detail = {};
            detail.record_group_id= this.$route.query.record_group_id;
            detail.content = this.textarea;
            detail.receiver = this.getCookie('d_tel');
            detail.send = this.getCookie('username');
            console.log(detail.content)
            if(this.textarea !== '') {
                this.$post('http://127.0.0.1:4000/send',qs.stringify(detail)).then(res => {
                    if(res.message == 'OK') {
                        this.chatState = true;
                        this.textarea = '';
                        this.chat()
                    } else {
                        this.$message({
                            message:  "网络开小差了哦！",
                            type:'error'
                        });
                    
                    }
                    
                });
            } else {
                this.$message({
                    message:  "发送内容不能为空！",
                    type:'error'
                });
            
            }
            
           
        },
        refresh(){
            this.chat()
        },
        del(){
            var qs = require('qs');
            let del = {};
            del.record_group_id= this.$route.query.record_group_id;
            this.$confirm('确定要删除此聊天记录吗？')
                .then(_ => {
                    this.$post('http://127.0.0.1:4000/delChatRecord',qs.stringify(del)).then(res => {
                        if(res.message == 'OK') {
                            this.$message({
                                message:  "删除成功！",
                                type:'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message({
                                message:  "出错了哦！",
                                type:'error'
                            });
                        
                        }
                        
                    });
                })
                .catch(_ => {
                this.$message({
                        message: "用户取消",
                        type: 'error'
                    });
                });
            
        }
    }
  }
</script>
<style scoped>
.title_right{
    float: right;
    margin-top: 5px;
    
}
.refresh{
    color: #32BA58;
    cursor: pointer;
    margin-left: 5px;
}
.del{
    color: red;
    cursor: pointer;

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
    height: 350px;
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
.leftlang{
    max-width: 60%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 20px;
    background: #fff;
    color: #666;
}
.rightlang{
    max-width: 60%;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 20px;
    background: #32BA58;
    color: #fff;
}
</style>