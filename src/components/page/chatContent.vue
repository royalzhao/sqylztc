<template>
    <div class="consult">
        <div class="title">
            <span>
                聊天记录
            </span>
            <span class="title_right">

                <span class="del" @click="del">
                    <i class="el-icon-delete" style="color:red;"></i>
                </span>
                <span class="info" @click="dialogVisible = true">
                        <i class="iconfont icon-jilu"></i>
                </span>
                <span class="refresh" @click="refresh">
                    <i class="iconfont icon-icon-refresh"></i>
                </span>
            </span>
            
        </div>
        <el-dialog
            class="dialogMessage"
            title="患者信息"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <span style="margin-top:10px;">
                <el-form  label-width="80px" :model="form">
                    <el-form-item label="姓名">
                        {{form.name}}
                    </el-form-item>
                    <el-form-item label="年龄">
                        {{form.age}}
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身高">
                        {{form.height}}
                    </el-form-item>
                    <el-form-item label="体重">
                        {{form.weight}}
                    </el-form-item>
                    <el-form-item label="职业">
                        {{form.profession}}
                    </el-form-item>
                    <el-form-item label="病史">
                        {{form.history}}
                    </el-form-item>
                    
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="content" id="content">
            <div v-for="item in chatContent" style="margin:5px 0;">
                <div class="left" v-bind:class="{ right: item.classState }">
                    <div class="face">
                        <img :src="item.face | replace" alt="">
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
        textarea:'',
        dialogVisible: false,
        form:{
            name:'',
            age:'',
            height:'',
            weight:'',
            history:'',
            sex:'',
            profession:'',
        }
      };
    },
    created(){
        this.chat()
        setInterval(this.chat, 1000);
    },
    watch: {
        chatContent: function(){
            this.$nextTick(() => {
                var div = document.getElementById('content')
                div.scrollTop = div.scrollHeight
            })  
        }
    },
    filters:{
        replace (input){
            return input.replace(/%3A/g, ':')
        }
       
    },
    beforeDestory(){
        clearInterval(this.chat)
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        chat(){
            var qs = require('qs');
            let info = {};
            info.record_group_id= this.$route.query.record_group_id;
            info.receiver= this.getCookie('username');
            this.$post('http://www.spn365.cn:4000/getChatContent',qs.stringify(info)).then(res => {
                


                for(var i = 0;i<res.length;i++){
                    if(res[i].send == this.getCookie('username')){
                        res[i].classState = true;
                    }else{
                        res[i].classState = false;
                    }
                    
                    
                }
                this.chatContent = res;
                //console.log(this.chatContent)
                


            // console.log(res)
            });
            this.$post('http://www.spn365.cn:4000/changeState',qs.stringify(info)).then(res => {
                
                //console.log(res.message)
            });
            this.$post('http://www.spn365.cn:4000/getPatientInfo',qs.stringify(info)).then(res => {
                
                //console.log(res[0].chatState)
                if(res[0].chatState == '1'){
                    this.form.name = '匿名用户'
                }else{
                    this.form.name = res[0].name;
                }
                
                this.form.age = res[0].age;
                this.form.height = res[0].height;
                this.form.weight = res[0].weight;
                this.form.history = res[0].history;
                this.form.sex = res[0].sex;
                this.form.profession = res[0].profession;
            });
        
        },
        
        send(){
            var qs = require('qs');
            if(this.getCookie('userType') == '1'){
                let detail = {};
                detail.record_group_id= this.$route.query.record_group_id;
                detail.content = this.textarea;
                detail.receiver = this.getCookie('d_tel');
                detail.send = this.getCookie('username');
                detail.face = this.getCookie('userface');
                //console.log(detail.content)
                if(this.textarea !== '') {
                    this.$post('http://www.spn365.cn:4000/send',qs.stringify(detail)).then(res => {
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
            }else if(this.getCookie('userType') == '2'){
                let detail = {};
                detail.record_group_id= this.$route.query.record_group_id;
                detail.content = this.textarea;
                detail.receiver = this.$route.query.send; 
                detail.send = this.getCookie('username');
                detail.face = this.getCookie('userface');
                //console.log(detail)
                if(this.textarea !== '') {
                    this.$post('http://www.spn365.cn:4000/send',qs.stringify(detail)).then(res => {
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
            }
            
            
           
        },
        refresh(){
            this.chat()
        },
        del(){
            var qs = require('qs');
            let del = {};
            del.record_group_id= this.$route.query.record_group_id;
            del.userType =  this.getCookie('userType')
            this.$confirm('确定要删除此聊天记录吗？')
                .then(_ => {
                    this.$post('http://www.spn365.cn:4000/delChatRecord',qs.stringify(del)).then(res => {
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
.title_right .info{
    color: #e99a06;
    cursor: pointer;
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