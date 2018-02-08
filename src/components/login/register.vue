<template>
    <div class="content">
        <h2>注册</h2>

        <div class="login-content">
          <div class="login-face">
            <img src="../../../static/img/user2.png" />
          </div>
          <div class="login-body">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-input class="input" v-model="p_tel" placeholder="手机号"></el-input>
              <el-input class="input" v-model="p_password" placeholder="密码"></el-input>
              <el-select v-model="p_houseNum" class="input" placeholder="请选择居住范围">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="success" class="login-submit" round>注册</el-button>
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
      return {
        options: [{
          value: 'xcfjA15',
          label: '新城枫景A1-5号楼'
        }, {
          value: 'xcfjA610',
          label: '新城枫景A6-10号楼'
        },{
          value: 'xcfjB16',
          label: '新城枫景B1-6号楼'
        }, {
          value: 'xcfjC16',
          label: '新城枫景C1-6号楼'
        }, {
          value: 'xcfjD17',
          label: '新城枫景D1-7号楼'
        }, {
          value: 'xcfjD813',
          label: '新城枫景D8-13号楼'
        },{
          value: 'hbjshyA19',
          label: '湖滨教师花园A1-9号楼'
        }, {
          value: 'hbjshyA1018',
          label: '湖滨教师花园A10-18号楼'
        },{
          value: 'hbjshyA1926',
          label: '湖滨教师花园A19-26号楼'
        }, {
          value: 'hbjshyB17',
          label: '湖滨教师花园B1-7号楼'
        }, {
          value: 'hbjshyB8102123',
          label: '湖滨教师花园B8-10、21-23号楼'
        }, {
          value: 'hbjshyB24-31',
          label: '湖滨教师花园B24-31号楼'
        }, {
          value: 'hbjshyB32-39',
          label: '湖滨教师花园B32-39号楼'
        },{
          value: 'hbjshyB3945',
          label: '湖滨教师花园B39-45号楼'
        }, {
          value: 'hbjshyC16',
          label: '湖滨教师花园C1-6号楼'
        }, {
          value: 'hbjshyC715 ',
          label: '湖滨教师花园C7-15号楼'
        }, {
          value: 'blctE14',
          label: '柏林春天E1-4号楼'
        }, {
          value: 'blctABCDFGH',
          label: '柏林春天ABCDFGH号楼'
        }, {
          value: 'jxhc19',
          label: '锦绣华城1-9号楼'
        }, {
          value: 'jxhc19',
          label: '锦绣华城10-18号楼'
        }, {
          value: 'bhjy19',
          label: '滨湖佳苑1-11号楼'
        }, {
          value: 'bhjy19',
          label: '滨州华府1-11号楼'
        }, {
          value: 'bhjy19',
          label: '滨州华府12-21号楼'
        }, {
          value: 'hmjyA17',
          label: '惠民家园A1-7号楼'
        }, {
          value: 'hmjyA814',
          label: '惠民家园A8-14号楼'
        }, {
          value: 'hmjyB17',
          label: '惠民家园B1-7号楼'
        }, {
          value: 'hmjyB814',
          label: '惠民家园B8-14号楼'
        }, {
          value: 'nsjy110',
          label: '嫩水家园1-10号楼'
        }, {
          value: 'nsjy1120',
          label: '嫩水家园11-20号楼'
        }, {
          value: 'ysw210',
          label: '怡水湾2-10号楼'
        }, {
          value: 'ysw1118',
          label: '怡水湾11-18号楼'
        }, {
          value: 'ysw1926',
          label: '怡水湾19-26号楼'
        }],
        loginForm:{
          p_tel:'',
          p_password:'',
          p_houseNum:''
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