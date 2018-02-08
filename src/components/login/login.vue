<template>
    <div class="content">
        <h2>登录</h2>

        <div class="login-content">
          <div class="login-face">
            <img src="../../../static/img/user.jpg" />
          </div>
          <div class="login-body">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-input class="input" v-model="p_tel" placeholder="手机号"></el-input>
              <el-input class="input" v-model="p_password" placeholder="密码"></el-input>
              <p>忘记密码？</p>
              <el-button type="success" class="login-submit" round>登录</el-button>
            </el-form>
          </div>
        </div>
        <div class="newUser-box">
          <router-link class="newUser" to="/register">新用户？点击这里注册</router-link>
        </div>
        
    </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm:{
          p_tel:'',
          p_password:''
        }
      };
    },
    methods: {
      
    }
  };
</script>
<style scoped>
    .content{
      max-width:400px;
      margin:0 auto;
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