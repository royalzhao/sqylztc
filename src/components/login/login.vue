<template>
    <div class="content">
        <h2>登录</h2>

        <div class="login-content">
          <div class="login-face">
            <img src="../../../static/img/user.jpg" />
          </div>
          <div class="login-body">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-form-item prop="p_tel"> 
                  <el-input class="input" v-model="loginForm.p_tel" placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item prop="p_password"> 
                  <el-input class="input" type="password" v-model="loginForm.p_password" placeholder="密码"></el-input>
              </el-form-item>
              <p>忘记密码？</p>
              <el-button type="success" class="login-submit" @click="login" round>登录</el-button>
            </el-form>
          </div>
        </div>
        <div class="newUser-box">
          <router-link class="newUser" to="register">新用户？点击这里注册</router-link><br>
          <router-link class="newUser" to="DLogin">我是医生</router-link>
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
        loginForm:{
          p_tel:'',
          p_password:'',
          loginState:1
        },
         //表单验证
         rules: {
          p_tel: [
              {validator:validatePhone, trigger: 'blur'}
          ],
          p_password: [
              {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        
      };
    },
    methods: {
      login(){
        var qs = require('qs');
        this.$refs.loginForm.validate((valid) => {
            if(valid) {
                this.$post('http://127.0.0.1:4000/login',qs.stringify(this.loginForm)).then(res => {
                    
                    if(res.message == 'OK') {
                        this.$message({
                            message: "登录成功",
                            type: 'success'
                        });
                        let expireDays = 1000 * 60 * 60 * 24 * 15;
                        this.setCookie('username',this.loginForm.p_tel,expireDays);
                        this.setCookie('userType',this.loginForm.loginState,expireDays);
                
                
                        this.$router.push('/');
                    } else {
                        this.$message({
                            message:  "登录失败",
                            type:'error'
                        });
                        this.$router.go(0);
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