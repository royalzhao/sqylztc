<template>
    <div class="content">
        <h2>注册</h2>

        <div class="login-content">
          <div class="login-face">
            <img src="../../../static/img/user2.png" />
          </div>
          <div class="login-body">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-form-item prop="p_tel">
                  <el-input class="input" v-model="loginForm.p_tel" placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item prop="p_password">
                  <el-input class="input" type="password" v-model="loginForm.p_password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="p_houseNum">
                <el-select v-model="loginForm.p_houseNum" class="input" placeholder="请选择居住范围">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>

              </el-form-item>
              <el-form-item>
                  <el-button type="success" @click="onSubmit" class="login-submit" round>注册</el-button>
              </el-form-item>
              
              
              
            </el-form>
          </div>
        </div>
        <div class="newUser-box">
          <router-link class="newUser" to="/login">已经有账号了？点击登录</router-link>
        </div>
        
    </div>
</template>

<script>
  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else if(!value) {
          
          callback(new Error('手机号不能为空'));
        }else{
          callback();
        }
      };
      return {
        options: [],
        loginForm:{
          p_tel:'',
          p_password:'',
          p_houseNum:''
        },
         //表单验证
        rules: {
          p_tel: [
              {validator:validatePhone, trigger: 'blur'}
          ],
          p_password: [
              {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          p_houseNum: [
              {required: true, message: '请选择居住范围', trigger: 'blur'}
          ]
        }
       
      };
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
        this.$fetch('http://www.spn365.cn:4000/getAddress').then(res => {
            //console.log(res)
            this.options = res
          });
      },
      onSubmit(){
        var qs = require('qs');
        this.$refs.loginForm.validate((valid) => {
            if(valid) {
              this.$post('http://www.spn365.cn:4000/check',qs.stringify(this.loginForm)).then(res => {
                  if(res.message == 'OK') {
                      this.$post('http://www.spn365.cn:4000/register',qs.stringify(this.loginForm)).then(res => {
                        //console.log(res.message)
                          if(res.message == 'OK') {
                              this.$message({
                                  message: "注册成功，请登录！",
                                  type: 'success'
                              });
                              this.$router.go(-1);
                          } else {
                              this.$message({
                                  message:  "注册失败",
                                  type:'error'
                              });
                              this.$router.go(-1);
                          }
                      });
                    } else {
                        this.$message({
                            message:  "账号已存在！",
                            type:'error'
                        });
                        this.$router.go(-1);
                  
                   }
              });
                
            }
        });
        
    }
    }
  };
</script>
<style scoped>
    .content{
      max-width:400px;
      margin:0 auto;
      text-align: center;
    }

    .login-content{
      border: 1px solid #ccc;
      box-shadow:0px 0px 10px #999;
      border-radius:10px;
      padding: 2.5rem 1.5rem;
      margin-top:3rem;
    }
    .login-content .login-face img{
      width:100px;
      height:100px;
      border-radius:50%;
    }
    .login-content .login-body{
      margin-top:1rem;
    }
    .login-content .login-body .input{
      width:100%;
    }
    .login-content .login-body p{
      text-align:left;
      margin-left:1rem;
      font-size:0.75rem;
      color:#ccc;
    }
    .login-content .login-body .login-submit{
      width:100%;
      font-size:1.2rem;
      background:#32BA58;
      margin-top:2rem;
    }
    .newUser-box{
      margin-top:3rem;
    }
    .newUser{
      text-decoration:none;
      color:#ccc;
      font-size:0.9rem;
    }
    
    
</style>