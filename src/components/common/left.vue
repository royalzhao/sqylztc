<template>
    <div>
        <div class="left hidden-xs-only">
            <el-menu class="el-menu-vertical-demo" unique-opened router>
               
                <el-menu-item index="healthy" @click="healthy">
                    <span class="sb-icon"><i class="iconfont icon-toutiao"></i></span>
                    <span class="sb-cn">健康头条</span>
                </el-menu-item>
                <span v-if="userType == 1">
                    <el-menu-item index="family" @click = "family">
                        <span class="sb-icon"><i class="iconfont icon-kehuqunzu"></i></span>
                        <span class="sb-cn">家庭成员</span>
                    </el-menu-item>
                    <el-menu-item index="chatList" @click="chatList">
                        <span class="sb-icon"><i class="iconfont icon-jilu"></i></span>
                        <span class="sb-cn">咨询记录</span>
                    </el-menu-item>
                </span>
                
                <span v-else>
                    <el-menu-item index="chatList" @click = "chatList">
                        <span class="sb-icon"><i class="iconfont icon-jilu"></i></span>
                        <span class="sb-cn">查看留言</span>
                    </el-menu-item>
                    <el-menu-item index="orderList" @click="orderList">
                        <span class="sb-icon"><i class="iconfont icon-yuyue"></i></span>
                        <span class="sb-cn">查看预约</span>
                    </el-menu-item>
                </span>
                
            </el-menu>
            <div class="doctor">
                <div class="doctor-head">
                    <i class="iconfont icon-yisheng"></i>
                    责任医师
                </div>
                <div class="doctor-body">
                    <div class="body-content">
                        <div class="body-img">
                            <img :src="d_face" alt="">
                        </div>
                        <div class="body-info">
                            <p style="margin-top: 0px;">姓名：{{d_name}}</p> 
                            <p>职称：{{d_technicalTitle}}</p> 
                            <p>居委：{{d_committee}}</p> 
                            <p>电话：{{d_tel}}</p> 
                            <p>服务患者：{{d_patientNum}}</p> 
                            
                        </div>
                    </div>
                    <div class="doctor-abstract">
                        <p style="margin-top:0;">简介:</p>
                        <p>
                            {{d_abstract}}
                        </p>
                    </div>
                    <div class="button" v-if="userType == 1">
                        <el-button class="talk" @click="talk">咨询</el-button>
                        <el-button class="order" @click="order">预约</el-button>
                    </div>
                    <div class="button" v-else>
                        <el-button class="update" @click="update">编辑个人信息</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal"></div>
        <div class="left leftXs hidden-sm-and-up" id="leftXs" >
            
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
                <el-menu-item index="healthy" @click="healthy">
                    <span class="sb-icon"><i class="iconfont icon-toutiao"></i></span>
                    <span class="sb-cn">健康头条</span>
                </el-menu-item>
                <span v-if="userType == 1">
                    <el-menu-item index="family" @click = "family">
                        <span class="sb-icon"><i class="iconfont icon-kehuqunzu"></i></span>
                        <span class="sb-cn">家庭成员</span>
                    </el-menu-item>
                    <el-menu-item index="chatList" @click="chatList">
                        <span class="sb-icon"><i class="iconfont icon-jilu"></i></span>
                        <span class="sb-cn">咨询记录</span>
                    </el-menu-item>
                </span>
                
                <span v-else>
                    <el-menu-item index="chatList" @click = "chatList">
                        <span class="sb-icon"><i class="iconfont icon-jilu"></i></span>
                        <span class="sb-cn">查看留言</span>
                    </el-menu-item>
                    <el-menu-item index="orderList" @click="orderList">
                        <span class="sb-icon"><i class="iconfont icon-yuyue"></i></span>
                        <span class="sb-cn">查看预约</span>
                    </el-menu-item>
                </span>
            </el-menu>
            <div class="doctor">
                <div class="doctor-head">
                    <i class="iconfont icon-yisheng"></i>
                    责任医师
                </div>
                <div class="doctor-body">
                    <div class="body-content">
                        <div class="body-img">
                            <img :src="d_face" alt="">
                        </div>
                        <div class="body-info">
                            <p style="margin-top: 0px;">姓名：{{d_name}}</p> 
                            <p>职称：{{d_technicalTitle}}</p> 
                            <p>居委：{{d_committee}}</p> 
                            <p>电话：{{d_tel}}</p> 
                            <p>服务患者：{{d_patientNum}}</p> 
                            
                        </div>
                    </div>
                    <div class="doctor-abstract">
                        <p style="margin-top:0;">简介:</p>
                        <p>
                            {{d_abstract}}
                        </p>
                    </div>
                    <div class="button" v-if="userType == 1">
                        <el-button class="talk" @click="talk">咨询</el-button>
                        <el-button class="order" @click="order">预约</el-button>
                    </div>
                    <div class="button" v-else>
                        <el-button class="update" @click="update">编辑个人信息</el-button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
    import store from '../vuex/store'
    export default {
        data(){
            return{
                d_id:'',
                d_name:'',
                d_technicalTitle:'',
                d_committee:'',
                d_tel:'',
                d_patientNum:'',
                d_abstract:'',
                d_face:'',
                info:{
                    username:'',
                    userType:''
                },
                userType:''
            }
        },
        store,
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            myValue() {
                return this.$store.state.show
            }
        },
        mounted() {
             //初始化
             this.init()
        },
        methods:{
            family(){
                this.$router.push({name:'family'})
            },
            healthy(){
                this.$router.push({name:'healthy'})
            },
            chatList(){
                this.$router.push({name:'chatList'})
            },
            orderList(){
                this.$router.push({name:'orderList'})
            },
            update(){
                this.$router.push({name:'me'})
            },
            init(){
                var left = document.getElementById('leftXs');
                var modal = document.getElementById('modal');
                if(store.state.show){
                    left.style.marginLeft = '0';
                    modal.style.display = 'block';
                }else{
                    left.style.marginLeft = '-300px';
                    modal.style.display = 'none';
                }

                var qs = require('qs');

                let user = this.getCookie('username');
                let userType = this.getCookie('userType');
                this.info.username = user
                this.userType = userType
                this.info.userType = userType
                console.log(this.info.username)
                console.log(this.info.userType)
                this.$post('http://www.spn365.cn:4000/getDoctorInfo',qs.stringify(this.info)).then(res => {
                    console.log(res)
                    this.d_name = res[0].d_name;
                    this.d_technicalTitle = res[0].d_technicalTitle
                    this.d_committee = res[0].d_committee
                    this.d_tel = res[0].d_tel
                    this.d_patientNum = res[0].d_patientNum
                    this.d_abstract = res[0].d_abstract
                    this.d_face = res[0].d_face
                    this.d_id = res[0].d_id

                    let expireDays = 1000 * 60 * 60 * 24 * 15;
                    this.setCookie('d_tel',res[0].d_tel,expireDays);
                   
                });
                
            },
            talk(){
                this.$router.push({name:'consult'});
            },
            order(){
                this.$router.push({name:'myOrderList'});
            }
        },
        watch: {
            myValue: function(newVal) {
                var left = document.getElementById('leftXs');
                var modal = document.getElementById('modal');
                //其他业务代码
                if(store.state.show){
                    left.style.marginLeft = '0';
                    modal.style.display = 'block';
                }else{
                    left.style.marginLeft = '-300px';
                    modal.style.display = 'none';
                }
            },
            onRoutes:function(){
                var left = document.getElementById('leftXs');
                var modal = document.getElementById('modal');
                left.style.marginLeft = '-300px';
                modal.style.display = 'none';
                store.commit('hide');
            }
        }
        
    }
</script>
<style scoped>
    .left{
        width: 300px;
        text-align: left;
    }
    .leftXs{
        transition: all 0.45s;
        position: fixed;
        z-index: 999;
        background: #FAFAFA;
        height: 100%;
        box-shadow:3px 0px 5px 1px #ccc;
    }
    #modal{
        position: fixed;
        top: 48.39px;
        bottom: 0;
        left: 0;
        right:0;
        background: rgba(243, 241, 241, 0.8);
        z-index: 998;
    }
    .el-menu{
        border: 0;
        background-color:transparent;
    }
    .el-menu span i{
        font-size: 1.3rem;
        margin-right: 5px;
    }
    .el-menu-item:focus, .el-menu-item:hover{
        background-color: #fff; 
    }
    .doctor{
        width: 100%;
        margin-top: 20px;
    }
    .doctor .doctor-head{
        background: rgba(50, 186, 88, 0.58);
        font-size: 0.9rem;
        padding: 0.5rem 1.2rem;
        color: #fff;
        box-sizing: border-box;
    }
    .doctor .doctor-head i{
        font-size: 1.3rem;
        margin-right: 5px;
    }
    .doctor .doctor-body{
        padding:0.5rem 1rem;
    }
    .doctor .doctor-body .body-content .body-img{
        width: 50%;
    }
    .doctor .doctor-body .body-content .body-img img{
        width: 100%;
    }
    .doctor .doctor-body .body-content{

        display: flex;
        justify-content: space-between;
    }
    .doctor .doctor-body .body-content .body-info{
        font-size:0.8rem; 
    }
    .doctor .doctor-body .doctor-abstract{
        font-size: 0.8rem;
    }
    .doctor .doctor-body .button{
        display: flex;
        justify-content: space-around; 
        margin-top: 20px;
    }
    .doctor .doctor-body .button .talk{
        background: #32BA58;
        color: #fff;
        border:0;
    }
    .doctor .doctor-body .button .update{
        background: #32BA58;
        color: #fff;
        border:0;
        width: 100%;
    }
    .doctor .doctor-body .button .talk:hover{
        background: rgba(50, 186,88, 0.8);
    }
    .doctor .doctor-body .button .order{
        background: #F95843;
        color: #fff;
        border:0;
    }
    .doctor .doctor-body .button .order:hover{
        background: rgba(249, 88, 67, 0.8);
    }
</style>