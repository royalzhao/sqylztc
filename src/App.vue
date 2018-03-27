<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "../static/css/style.css";
@import url("//at.alicdn.com/t/font_558321_r78o7mpnustqehfr.css");
@import url("../node_modules/social-share.js/dist/css/share.min.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5C5C5C;
}
/*滚动条 start*/  
/* ::-webkit-scrollbar {  
    width: 6px;  
    height: 6px;  
    background-color: #F5F5F5;  
  }   */
  /*定义滚动条轨道 内阴影+圆角*/  
  /* ::-webkit-scrollbar-track {  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    background: #fff ;  
  }   */
  /*定义滑块 内阴影+圆角*/  
  /* ::-webkit-scrollbar-thumb {  
    border-radius: 3px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color:rgba(107, 230, 152, 0.7);  
  }   */
  /* ::-webkit-scrollbar-thumb:hover {  
    border-radius: 3px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color:rgb(107, 230, 152);  
  }      */
  @media only screen and (max-width:600px ) {
	.el-message-box{
        width: 70%;
    }
    .el-message{
        min-width: 70%;
    }
    .dialogMessage{
        width: 80%;
        margin: 0 auto;
    }
    .el-dialog{
        width: 100%;
        margin-top: 10px;
    }
}
</style>
