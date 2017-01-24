<template>
  <div class="container">
    <div class="row" style="margin-top:20%">
      <div class="col-sm-12">
        <section class="panel">
          <header class="panel-heading">
            忘记密码
          </header>
          <div class="panel-body">
            <div class="flow">
              <div class="flow_all">
                <ul class="line_flow">
                  <li>
                    <div class="flow_index checked one">
                      <img class="oneImg" v-bind:src="image.imgOne" alt="">
                      <span>请输入用户名</span>
                    </div>
                  </li>
                  <li>
                    <div class="flow_index two">
                      <img class="twoImg" v-bind:src="image.imgTwo" alt="">
                      <span>安全验证</span>
                    </div>
                  </li>
                  <li>
                    <div class="flow_index three">
                      <img class="threeImg" v-bind:src="image.imgThree" alt="">
                      <span>重置密码</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div style="clear: both;margin-top: 20px">
                <p class="errorMsg" style="display:block"></p>
              </div>
              <div id="nameDiv" class="usernameput usernameputone">
                <p> 请输入您需要找回的用户名</p>
                <div class="message">${message.userNameMsg}</div>
                <input type="text" placeholder="用户名" class="userName" v-model="userName">
                <a v-on:click="forgetPass" class="button_a"><span class="btn btn-info button_next sure_btn"
                                                                  style="">下一步</span></a>
              </div>

              <div class="usernameput usernameputtwo" style="display: none">
                <p>为了您的账号安全，请完成身份验证</p>
                <p style="font-size: 16px;margin: 30px 0 0 0;color: rgb(51,51,51);">手机号码或绑定邮箱号：</p>

                <div class="message">${message.emailErrorMsg}</div>
                <p><input type="text" class="address" v-model="address" placeholder="请输入绑定的邮箱或手机号"></p>

                <div class="message">${message.codeErrorMsg}</div>
                <p><input type="text" class="inpttext" v-model="checkCodeData.code"><input type="hidden"
                                                                                           v-model="checkCodeData.userId">
                </p>

                <button v-on:click="sendCode" type="button" class="get btn btn-info"
                        style="background-color:rgb(17,148,229)">${message.sendCodeMsg}
                </button>
                <p style="font-size: 14px;margin-top: 30px;color: rgb(153,153,153);">邮箱不可用?<a href=""
                                                                                              style="text-decoration: none">请使用手机验证</a>
                </p>
                <button v-on:click="checkCode" type="button" class="btn btn-info button_b"
                        style="background-color:rgb(17,148,229);width:250px">下一步
                </button>
              </div>
              <div class="usernameput passwordChange" style="display: none">
                <form id="passwordReset" @submit.prevent="handleSubmit">
                  <div class="row" style="margin-bottom:16px;margin-top:50px;">
                    <div class="row">
                      <div class="col-xs-12">
                        <div class="form-group">
                          <label for="password" class="pwdText">新密码<font class="red">*</font>：</label>
                          <div class="input-icon right">
                            <input type="password" class="form-control" id="password" name="password"
                                   v-model="password"/>
                            <div class="message" style="float:left;">${errors.passwordError}</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-12">
                        <div class="form-group">
                          <label for="newPassword1" class="pwdText">确认新密码<font class="red">*</font>：</label>
                          <div class="input-icon right">
                            <input type="password" class="form-control" id="newPassword1" name="password1"/>
                            <div class="message" style="float:left;">${errors.password1Error}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-12" style="text-align:center">
                        <button class="btn btn-info" style="background-color:rgb(17,148,229);width:250px">完 成</button>
                      </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .message {
    color: #a94442;
    height: 20px;
  }

  font.red {
    color: #c7254e;
    font-size: 18px;
    font-weight: bold;
  }

  .pwdText {
    color: #7a7676;
    font-weight: normal;
    text-align: right;
    width: 30%;
  }

  input {
    border-radius: 5px;
  }

  .flow {
    padding: 30px 0 30px 30px;
  }

  .flow_index {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: rgba(153, 153, 153, 0.2);
  }

  .checked {
    background-color: rgba(17, 148, 299, 0.2);
  }

  .usernameput {
    margin-top: 20px;
  }

  .usernameput input {
    width: 250px;
    height: 35px;
    border: 1px solid rgba(153, 153, 153, 0.5);
    padding: 5px;
  }

  .button_next {
    width: 250px;
    height: 30px;
    background-color: rgb(17, 148, 229);
    display: block;
    margin-top: 20px;
    text-decoration: none;
  }

  .button_a {
    text-decoration: none !important;
  }

  .line_flow li {
    float: left;
    list-style: none;
  }

  .editor-label label {
    width: 300px;
  }

  #formUl li label {
    float: left;
    font-size: 14px;
    font-weight: lighter;
    font-family: 微软雅黑;
    text-align: right;
    width: 100px;
    line-height: 35px;
  }

  #formUl li input {
    height: 35px;
  }

  #formUl li {
    list-style: none;
  }

  #formUl {
    margin-top: 50px;
  }

  @media screen and (max-width: 920px) {
    .line_flow li {
      list-style: none;
      margin-top: 20px;
      float: none;
    }

    .inpttext {
      margin-left: 0px;
    }
  }

  .changepass {
    margin-left: 100px;
  }

  @media screen and (max-width: 635px) {
    .changepass {
      margin-left: 0px;
    }
  }
</style>
<script>
  import QK from '../../QK'
  import jQueryValidation from 'jquery-validation'
  export default{
    components: {},
    data: function () {
      return {
        userName: '',
        address: '',
        image: {
          imgOne: '../../../static/images/onecheck.png',
          imgTwo: '../../../static/images/two.png',
          imgThree: '../../../static/images/three.png',
        },
        checkCodeData: {
          userId: '',
          code: '',
        },
        password: '',
        checkedCode: '',
        message: {
          userNameMsg: '',
          sendCodeMsg: '免费获取验证码',
          emailErrorMsg: '',
          codeErrorMsg: ''
        },
        errors: {
          passwordError: '',
          password1Error: ''
        }
      }
    },
    ready: function () {
      this.loadBg()
      QK.addMethod()
    },
    methods: {
      loadBg: function () {
        $('body').css({
          'background': 'url("../../static/css/img/login-bg.jpg") no-repeat fixed',
          'background-size': 'cover',
          'width': '100%',
          'height': '100%'
        })
      },
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#passwordReset",
          rulesMap: {
            password: {required: !0},
            newPassword1: {required: !0, equalTo: "#password"},
          }
        })
        //验证结果  true  false
        if (bool) {
          //发送请求
          var sendData = {
            "checkedCode": that.checkedCode,
            "password": that.password
          }
          that.$http.post(QK.SERVER_URL + '/api/anon/resetPassword?checkedCode=' + that.checkedCode, sendData, true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              $(".errorMessage").addClass("isHidden")
              that.$router.go({path: "/system/login"})
            } else {
              that.message.msg = result.msg
              that.message.errorImg = '/static/images/error1.png'
              $(".errorMessage").removeClass("isHidden")
            }
          })
        }
        return false
      },
      //验证用户名是否存在
      forgetPass: function () {
        var that = this
        if (that.userName.length > 2) {
          that.$http.get(QK.SERVER_URL + '/api/user/anon/resetPassword/' + that.userName, true).then(function (res) {
            var data = $.parseJSON(res.body)
            var result = QK.getStateCode(that, data.code)
            if (data.data) {
              that.message.userNameMsg = "存在该用户"
              //得到该用户的id
              that.userId = data.data
              //显示发送验证码模块  隐藏当前模块
              $(".usernameputtwo").show().siblings("div.usernameput").hide()
              $(".flow_index.two").addClass("checked").parent("li").siblings("li").find(".flow_index").removeClass("checked")
              that.image.imgOne = '../../../static/images/one.png'
              that.image.imgTwo = '../../../static/images/twocheck.png'
            } else {
              that.message.userNameMsg = "不存在该用户"
            }
          })
        } else {
          that.message.userNameMsg = "用户名长度不够"
        }
      },
      //输入邮箱地址，验证邮箱是否为改用户绑定邮箱，发送验证码
      sendCode: function () {
        var that = this
        var address = that.address + ''
        if (that.address.length > 6 && that.address.indexOf("@") > -1) {
          that.$http.post(QK.SERVER_URL + '/api/user/anon/resetPassword/sendCode', {"address": address}, true).then(function (res) {
            var data = $.parseJSON(res.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              $(".get").attr("disabled", "false")
              that.$set('checkCodeData.userId', data.userId)
            } else {
              that.message.sendCodeMsg = "发送失败，再次发送？"
              that.$set('message.emailErrorMsg', result.msg)
            }
          })
        } else {
          that.message.emailErrorMsg = '邮箱错误'
        }
      },
      checkCode: function () {
        var that = this
        that.$http.post(QK.SERVER_URL + '/api/user/anon/resetPassword?userId=' + that.checkCodeData.userId, that.checkCodeData, true).then(function (res) {
          var data = $.parseJSON(res.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            $(".get").attr("disabled", "false")
            $(".passwordChange").show().siblings("div.usernameput").hide()
            $(".flow_index.three").addClass("checked").parent("li").siblings("li").find(".flow_index").removeClass("checked")
            that.$set('image.imgTwo', '../../../static/images/two.png')
            that.$set('image.imgThree', '../../../static/images/threecheck.png')
            that.$set('checkedCode', data.data)
          } else {
            that.$set('message.codeErrorMsg', result.msg)
          }
        })
      },
    }
  }
</script>
