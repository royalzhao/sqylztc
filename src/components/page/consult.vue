<template>
    <div class="consult">
        <div class="title">
            <span>
                咨询医生
            </span>
            <span class="refresh" @click="refresh">
                <i class="iconfont icon-icon-refresh"></i>
            </span>
        </div>
        <div class="content" id="content">
            <div class="left">
                <div class="face">
                    <img :src="doctorImage" alt="">
                </div>
                <div class="leftlang">
                    在下方留言，我会努力加快回复你的哦！
                </div>
            </div>
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
            <div v-if="chatState">
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
                    <el-button size="small" @click="over" type="danger">结束咨询</el-button>
                </div>
                
            </div>
            <div v-else>
                <el-form ref="form"  label-position="right" :rules="rules"  :model="form">
                    <el-form-item label="请选择要咨询的人：" prop="value">
                        <el-select size="small" v-model="form.value" placeholder="请选择">
                            <el-option
                                v-for="item in familyList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请选择咨询的方式：" prop="radio">
                        <el-radio-group v-model="form.radio">
                            <el-radio label="1">匿名</el-radio>
                            <el-radio label="0">实名</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <div class="start">
                            <el-button @click="next" size="small" type="success" round>点击开始咨询</el-button>
                        </div>
                    </el-form-item>
                </el-form>

                
            </div>
            
        </div>

    </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        familyList:[],
        chatContent:[],
        form:{
            id:'',
            value: '',
            radio: '1',
            username:'',
            d_id:''
        },
        doctorImage:'',
        steps:true,
        chatState:false,
        textarea:'',
        info:{
            username:'',
            userType:''
        },
        rules: {
            value: [
                {required: true, message: '请选择要咨询的人', trigger: 'blur'}
            ]
        }      
      };
    },
    mounted(){
        this.init()
    },
    filters:{
        replace (input){
            return input.replace(/%3A/g, ':')
        }
       
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
       
        init(){
            
            let chatState = this.getCookie('chatState');
            console.log(chatState)
            if(chatState=='true'){
                this.chatState = true
                console.log(true)

                this.chat()
            }else{
                this.chatState = false
                console.log(false)

                var qs = require('qs');
                let user = this.getCookie('username');
                let userType = this.getCookie('userType');
                this.info.username = user
                this.info.userType = userType
                this.$post('http://127.0.0.1:4000/getDoctorInfo',qs.stringify(this.info)).then(res => {
                    this.doctorImage = res[0].d_face;
                   
                });
                this.$post('http://127.0.0.1:4000/getFamilyInfo',qs.stringify(this.info)).then(res => {
                    console.log(res)
                    this.familyList = res;
                
                });

            }

           
        },
        refresh(){
            this.chat()
        },
        chat(){
            var qs = require('qs');
            let detail = {};
            detail.record_group_id = this.getCookie('record_group_id');
            this.$post('http://127.0.0.1:4000/getChatContent',qs.stringify(detail)).then(res => {
               


                for(var i = 0;i<res.length;i++){
                    if(res[i].send == this.getCookie('username')){
                        res[i].classState = true;
                    }else{
                        res[i].classState = false;
                    }
                   
                }
                this.chatContent = res;

            });
            
        },
        next() {
            var qs = require('qs');
            let user = this.getCookie('username');
            let d_tel = this.getCookie('d_tel');
            
            var timestamp=new Date().getTime();

            this.form.id = timestamp;
            this.form.username = user;
            this.form.d_id = d_tel;

            this.$refs.form.validate((valid) => {
                if(valid) {
                    this.$post('http://127.0.0.1:4000/startChat',qs.stringify(this.form)).then(res => {
                        if(res.message == 'OK') {
                            this.chatState = true;
                            this.setCookie('chatState',true);
                            this.setCookie('record_group_id',this.form.id);

                            this.$post('http://127.0.0.1:4000/updatePatientNum',qs.stringify(this.form)).then(res => {
                                console.log(res)
                            }); 

                        } else {
                            this.$message({
                                message:  "网络开小差了哦！",
                                type:'error'
                            });
                        
                        }
                        
                    });
                }
            });
            
        },
        over(){
            this.chatState = false;
            this.setCookie('chatState',false);
        
        },
        send(){
            var qs = require('qs');
            let detail = {};
            detail.record_group_id = this.getCookie('record_group_id');
            detail.content = this.textarea;
            detail.receiver = this.getCookie('d_tel');
            detail.send = this.getCookie('username');
            detail.face = this.getCookie('userface');
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

    }
  }
</script>
<style scoped>
.refresh{
    float: right;
    color: #32BA58;
    margin-top: 5px;
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
    border-bottom: 1px solid #ccc;
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
.el-form-item{
    margin-bottom: 0px;
    margin-top: 10px;
}
</style>