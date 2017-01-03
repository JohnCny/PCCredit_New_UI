<template>
  <div class="login-box">
    <img src="../../static/images/login-logo1.png"/>
    <form id="loginForm">
      <!--错误信息提示-->
      <div class="errorMessage">
        <img src="../../static/images/icon-warning.png"/>&nbsp;<span></span>
      </div>
      <input id="user" name="userName" type="text" class="login-input" placeholder="用户名">
      <input id="password" name="password" type="password" class="login-input" placeholder="密码">

      <a v-link="{ path: '/system' }" class="login-button">登&nbsp;&nbsp;录</a>
      <div class="codeImg">

      </div>
      <div class="forgetPwd">
        <a href="/user/anon/resetPasswordPage">忘记密码？</a>
      </div>
    </form>
  </div>
</template>
<style scoped>
  body {
    background: #65cea7 url("../../static/css/img/login-bg.jpg") no-repeat fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
  }

  .login-box {
    background: #fff;
    margin: 0 auto;
    margin-top: 8em;
    width: 20em;
    border-radius: 0.5em;
    text-align: center;
    padding: 1em;
  }

  .login-box form {
    width: 85%;
    margin: 0 auto;
    margin-top: 2em;
  }

  .login-input {
    display: block;
    width: 76%;
    border-radius: 5px;
    border: none;
    outline: none;
    background: #eaeaec url("../../static/css/img/yhm.png") no-repeat left center;
    box-shadow: none;
    font-size: 0.9em;
    padding: 10px 13%;
    margin-bottom: 15px;
  }

  input[type=password] {
    background: #eaeaec url("../../static/css/img/mm.png") no-repeat left center;
  }

  .login-button {
    display: block;
    background: #6bc5a4;
    border: none;
    color: #fff;
    width: 100%;
    border-radius: 5px;
    box-shadow: none;
    font-size: 1em;
    padding: 15px;
    margin-top: 20px;
    margin-bottom: 1em;
  }

  .login-button:hover {
    background: #688ac2;
    cursor: pointer;
  }

  /*错误提示信息*/
  .errorMessage {
    display: none;
    width: 100%;
    text-align: left;
    color: #e4393c;
    line-height: 30px;
    font-size: 15px;
  }

  .errorMessage img {
    vertical-align: text-bottom;
  }

  .forgetPwd {
    margin-top: 50px;
    text-align: right;
    font-size: 12px;
    color: #aaa;

  }
</style>
<script>
  //  import '../../static/css/login.css'
</script>
