<template>
  <div class="container">
    <form class="form-signin" id="loginForm">
      <div class="form-signin-heading text-center">
        <h1 class="sign-title">登 录</h1>
        <img src="/static/images/login-logo.png" alt=""/>
      </div>
      <div class="login-wrap">
        <div class="registration isHidden">
          <img v-bind:src="message.errorImg"/><span>${message.msg}</span>
        </div>
        <input id="user" name="userName" type="text" class="form-control login-input" placeholder="用户名"
               v-model="user.userName" autofocus>
        <input id="password" name="password" type="password" class="form-control  login-input" placeholder="密码"
               v-model="user.password">

        <a class="btn btn-lg btn-login btn-block" v-on:click="login">
          <i class="fa fa-check"></i>
        </a>
        <label class="checkbox">
          <input type="checkbox" value="remember-me"> 记住我
          <span class="pull-right">
                    <a v-on:click="forgetPass"> 忘记密码？</a>
           </span>
        </label>
      </div>
      <!-- Modal -->
      <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal"
           class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title">忘记密码 ?</h4>
            </div>
            <div class="modal-body">
              <p>请输入你注册时使用的邮箱</p>
              <input type="text" name="email" placeholder="Email" autocomplete="off"
                     class="form-control placeholder-no-fix">

            </div>
            <div class="modal-footer">
              <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
              <button class="btn btn-primary" type="button">提交</button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal -->

    </form>
  </div>
</template>
<style scoped>
  .isHidden {
    visibility: hidden
  }

  .login-input {
    display: block;
    width: 100%;
    border-radius: 5px;
    border: none;
    outline: none;
    background: #eaeaec url("../../static/css/img/yhm.png") no-repeat left center !important;
    box-shadow: none;
    font-size: 0.9em;
    padding: 10px 13%;
    margin-bottom: 15px;
  }

  input[type=password] {
    background: #eaeaec url("../../static/css/img/mm.png") no-repeat left center !important;
  }

  /*错误提示信息*/
  .registration img {
    vertical-align: text-bottom;
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
</style>
<script>
  import QK from '../QK'
  export default{
    components: {},
    data: function () {
      return {
        user: {
          userName: '',
          password: ''
        },
        message: {
          msg: '',
          errorImg: ''
        }
      }
    },
    ready: function () {
      this.loadBg()
      this.focus()
    },
    methods: {
      focus: function () {
        $('input:text:first').focus()
      },
      loadBg: function () {
        $('body').css({
          'background': 'url("../../static/css/img/login-bg.jpg") no-repeat fixed',
          'background-size': 'cover',
          'width': '100%',
          'height': '100%'
        })
      },
      login: function () {
        var that = this
        var userName = that.user.userName
        var password = that.user.password
        if (userName.length < 3) {
          that.message.msg = "用户名错误"
          that.message.errorImg = '/static/images/error1.png'
          $(".registration").removeClass("isHidden")
        } else if (password.length < 3) {
          that.message.msg = "密码错误"
          that.message.errorImg = '/static/images/error1.png'
          $(".registration").removeClass("isHidden")
        } else {
          that.$http.post(QK.SERVER_URL + '/api/logon/login', that.user, true).then(function (res) {
            var data = $.parseJSON(res.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              //设置缓存当前登录用户信息
              localStorage.user = JSON.stringify(data.data)
              $(".registration").addClass("isHidden")
              if(data.data.roleType == 2){
                that.$router.go({path: '/system/admin'})
              }else if(data.data.roleType == 3){
                that.$router.go({path: '/system/manager'})
              }else if(data.data.roleType == 1){
                that.$router.go({path: '/system/admin'})
              }

              // $('body').css({'background':'#424f63'})
            } else {
              that.message.msg = result.msg
              that.message.errorImg = '/static/images/error1.png'
              $(".registration").removeClass("isHidden")
            }
          })
        }
      },
      forgetPass: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/forgetPass'})
      },
    }
  }
</script>
