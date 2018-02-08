<template>
    <div class="consult">
        <div class="title">
            <span>
                咨询医生
            </span>
            <span class="refresh">
                <i class="iconfont icon-icon-refresh"></i>
            </span>
        </div>
        <div class="content">
           <div class="left">
                <div class="face">
                    <img src="../../../static/img/doctor.jpg" alt="">
                </div>
                <div class="lang">
                    在下方留言，我会努力加快回复你的哦！
                </div>
           </div>
           <div class="right">
                <div class="face">
                    <img src="../../../static/img/doctor.jpg" alt="">
                </div>
                <div class="lang">
                    在下方留言，我会努力加快回复你的哦！
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
                    <el-button size="small">发送</el-button>
                    <el-button size="small" @click="over" type="danger">结束咨询</el-button>
                </div>
                
            </div>
            <div v-else>
                <p>
                    请选择要咨询的人：
                    <el-select size="small" v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in familyList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </p>
                
                <p>
                    请选择咨询的方式：
                    <el-radio v-model="radio" label="1">匿名</el-radio>
                    <el-radio v-model="radio" label="2">实名</el-radio>
                </p>
    
            
                <div class="start">
                    <el-button @click="next" size="small" type="success" round>点击开始咨询</el-button>
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
        familyList:[
            {
                name:'张三'
            },
            {
                name:'李四'
            }
        ],
        value: '',
        radio: '1',
        steps:true,
        chatState:false,
        textarea:''
      };
    },

    methods: {
      next() {
        this.chatState = true;
      },
      over(){
        this.chatState = false;
      }
    }
  }
</script>
<style scoped>
.refresh{
    float: right;
    color: #32BA58;
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
    height: 350px;
    border-bottom: 1px solid #ccc;
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
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 20px;
    background: #32BA58;
    color: #fff;
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