<template>
  <h1 class="titleText">登 录</h1>
  <div class="login-box">

    <img src="../../static/images/login-logo1.png"/>
    <form id="loginForm">
      <!--错误信息提示-->
      <div class="errorMessage isHidden" >
        <img v-bind:src="message.errorImg"/><span>${message.msg}</span>
      </div>
      <input id="user" name="userName" type="text" class="login-input" placeholder="用户名" v-model="user.userName">
      <input id="password" name="password" type="password" class="login-input" placeholder="密码" v-model="user.password">

      <a v-on:click="login" class="login-button">登&nbsp;&nbsp;录</a>
      <div class="codeImg">

      </div>
      <div class="forgetPwd">
        <a href="/user/anon/resetPasswordPage">忘记密码？</a>
      </div>
    </form>
  </div>
</template>
<style scoped>
  .isHidden{
    visibility:hidden
  }
  .titleText{
    font-size: 24px;
    color: #fff;
    text-align:center;
    margin-top:60px
  }
  .login-box {
    background: #fff;
    margin: 0 auto;
    margin-top: 2em;
    width: 24em;
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
    width: 100%;
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
    width: 100%;
    text-align: left;
    color: #e4393c;
    line-height: 30px;
    height: 30px;
    font-size: 14px;
  }
  .errorMessage img {
    vertical-align: text-bottom;
    width:16px;
    height:16px;
    margin-right:5px;
  }
  .forgetPwd {
    margin-top: 50px;
    text-align: right;
    font-size: 12px;
    color: #aaa;

  }
</style>
<script>
  import QK from '../QK'
  export default{
    components: {

    },
    data: function () {
      return {
        user: {
          userName: '',
          password: ''
        },
        message:{
          msg : '',
          errorImg : ''
        }
      }
    },
    ready: function () {
      this.focus()
      this.loadBg()
    },
    methods: {
       focus: function () {
          $('input:text:first').focus()
       },
       loadBg: function () {
        $('body').css({'background':'url("../../static/css/img/login-bg.jpg") no-repeat fixed','background-size':'cover','width':'100%','height':'100%'})
       },
       login:function(){
          var that = this
          var userName = that.user.userName+''
          var password = that.user.password+''
          that.$http.post(QK.SERVER_URL+'/api/logon/login',that.user,true).then(function(res){
            var data = $.parseJSON(res.body)
            var result = QK.getStateCode(that,data.code)
            if(result.state){
              $(".errorMessage").addClass("isHidden")
              console.log("登陆成功")
              localStorage.user = JSON.stringify(data.data)
              that.$router.go({path: '/system'})
            }else{
              that.message.msg = result.msg
              that.message.errorImg = '/static/images/error1.png'
              $(".errorMessage").removeClass("isHidden")
            }
          })
       },
    }
  }
</script>
