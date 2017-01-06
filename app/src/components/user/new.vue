<template>
  <div class="row">
    <div class="col-sm-4">
      <org-tree></org-tree>
    </div>
    <div class="col-sm-8">
      <section class="panel">
        <header class="panel-heading">
          填写用户信息
        </header>
        <div class="panel-body">
          <form action="" id="userNew" @submit.prevent="handleSubmit">
            <input type="hidden" name="orgId" v-model="user.orgId"/>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="userCname">姓名</label>
                  <div class="input-icon right">
                    <input v-model="user.userCname" id="userCname" type="text" class="form-control" name="userCname"
                           placeholder="请输入中文名2到10位">
                    <div class="message">${errors.userCnameError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="nameDiv" class="form-group">
                  <label for="username">登录名</label>
                  <div class="input-icon right">
                    <input v-on:change="cnameCheck" v-model="user.username" id="username" type="text"
                           class="form-control" name="username" placeholder="请输入由数字、大小写字母以及下划线组成的3到12位字符">
                    <div class="message">${errors.usernameError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="age">年龄</label>
                  <div class="input-icon right">
                    <input v-model="user.age" id="age" type="text" class="form-control" name="age"
                           placeholder="请输入10-99之间的年龄值">
                    <div class="message">${errors.ageError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="sex">性别</label>
                  <div class="input-icon right">
                    <select id="sex" type="text" name="sex" class="form-control" v-model="user.sex">
                      <option selected value="1">男</option>
                      <option value="0">女</option>
                    </select>
                    <div class="message">${errors.sexError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="tel">电话</label>
                  <div class="input-icon right">
                    <input v-model="user.tel" id="tel" type="text" class="form-control" name="tel"
                           placeholder="请正确填写您的电话号码">
                    <div class="message">${errors.telError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="idNumberDiv" class="form-group">
                  <label for="idCardNumber">证件号码</label>
                  <div class="input-icon right">
                    <input v-model="user.idCardNumber" id="idCardNumber" type="text" class="form-control idNumber"
                           name="idCardNumber" placeholder="请输入正确的身份证号" v-on:change="idNumberCheck">
                    <div class="message">${errors.idNumberError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div id="emailDiv" class="form-group">
                  <label for="username">电子邮件</label>
                  <div class="input-icon right">
                    <input v-on:change="emailCheck" v-model="user.email" id="email" type="text" class="form-control"
                           name="email" placeholder="请输入合法的邮件地址">
                    <div class="message">${errors.emailError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="sex">用户状态</label>
                  <div class="input-icon right">
                    <select v-model="user.status" id="status" type="text" name="status" class="form-control">
                      <option selected value="0">正常</option>
                      <option value="1">锁定</option>
                      <option value="3">待激活</option>
                    </select>
                    <div class="message">${errors.statusError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="role">角色</label>
                  <div class="input-icon right">
                    <select v-model="user.roleId" id="roleId" type="text" name="roleId" class="form-control">
                      <option value="">&#45;&#45;请选择&#45;&#45;</option>
                      <template v-for="role in roles">
                        <option v-bind:value="role.id">${role.roleName}</option>
                      </template>
                    </select>
                    <div class="message">${errors.roleError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a href="" type="reset" class="btn btn-default">取消</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  #userNew input, #userNew select {
    width: 80%
  }

  .message {
    color: #a94442;
    height: 20px;
  }
</style>
<script>
  import QK from '../../QK'
  import jQueryValidation from 'jquery-validation'
  import OrgTree from '../tree/orgTree.vue'
  export default{
    data: function () {
      return {
        user: {
          userCname: '',
          username: '',
          sex: '',
          age: '',
          tel: '',
          status: '',
          idCardNumber: '',
          roleId: '',
          email: '',
          orgId: '1',
        },
        roles: [],
        message: {
          idNmber: '',
        },
        errors: {
          userCnameError: '',
          usernameError: '',
          sexError: '',
          ageError: '',
          telError: '',
          statusError: '',
          idCardNumberError: '',
          roleError: '',
          emailError: '',
        }
      }
    },
    components: {
      OrgTree
    },
    ready: function () {
      this.init()
      QK.addMethod()
    },
    methods: {
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#userNew",
          rulesMap: {
            username: {required: !0, isRightfulString: !0},//登录名
            userCname: {required: !0, isChinese: !0},//中文名
            password: {required: !0},//密码
            sex: {required: !0, downList: !0},//性别
            age: {required: !0, age: !0},//年龄
            tel: {required: !0, tel: !0},//联系方式
            status: {required: !0},//状态
            idCardNumber: {required: !0, idNumber: !0},//证件号码
            email: {required: !0, email: !0},//电子邮件
            //role:{required: !0},//角色可为空
          }
        })
        //验证结果  true  false
        if (bool) {
          that.$http.put(QK.SERVER_URL + '/api/user', that.user, true).then(function (data) {
            var data = jQuery.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              alert("创建成功")
              that.$router.go({path: "/system/user/list"})
            } else {
              alert("创建失败")
            }
          })
        }
        return false
      },
      init: function () {
        var that = this
        that.$http.get(QK.SERVER_URL + '/api/user/add', true).then(function (data) {
          var data = jQuery.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("roles", data.data)
          }
        })
      },
      cnameCheck(){
        var that = this
        var loginName = that.user.username;
        var msg1 = "用户名可用!";
        var msg3 = "请输入正确的登录名!";
        var msg4 = "用户名已存在!";
        var login_name = "^[A-Za-z0-9_-]{4,12}$"
        if (loginName.length > 3 && loginName.match(login_name)) {
          this.$http.get(QK.SERVER_URL + '/api/user/anon/resetPassword/' + loginName, true).then(function (res) {
            var data = jQuery.parseJSON(res.body)
            var result = QK.getStateCode(that, data.code)
            if (data.data) {
              QK.messageFun($("#nameDiv"), msg4)
            } else {
              $("#nameDiv").find("div.message").css("color", "#3c763d").html(msg1)
              $("#nameDiv").find("input").css("border-color", "#3c763d")
              $("#btn_submit").removeAttr("disabled")
            }
          })
        } else {
          QK.messageFun($("#nameDiv"), msg3)
        }
      },
      idNumberCheck(){
        var that = this
        var idCard = that.user.idCardNumber + ''
        var len = idCard.length
        var msg3 = "该证件号码已存在！"
        var msg4 = "证件可用"
        var msg5 = "身份证长度不够！"
        if (len < 14) {
          QK.messageFun($("#idNumberDiv"), msg5)
        } else {
          this.$http.post(QK.SERVER_URL + '/api/user/isIdCard', {"idCard": idCard}, true).then(function (res) {
            var data = jQuery.parseJSON(res.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              if (data.data) {
                QK.messageFun($("#idNumberDiv"), msg3)
              } else {
                $("#idNumberDiv").find("div.message").css("color", "#3c763d").html(msg4)
                $("#idNumberDiv").find("input").css("border-color", "#3c763d")
                $("#btn_submit").removeAttr("disabled")
              }
            } else {
              QK.messageFun($("#idNumberDiv"), result.msg)
            }
          })
        }
      },
      emailCheck(){
        var that = this
        var email = that.user.email + ''
        var msg3 = "该电子邮件已存在！"
        var msg4 = "邮件可用"
        var msg5 = "邮件格式错误！"
        if (email.length > 6 && email.indexOf("@") > -1) {
          this.$http.post(QK.SERVER_URL + '/api/user/isEmail', {"email": email}, true).then(function (res) {
            var data = jQuery.parseJSON(res.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              if (data.data) {
                QK.messageFun($("#emailDiv"), msg3)
              } else {
                $("#emailDiv").find("div.message").css("color", "#3c763d").html(msg4)
                $("#emailDiv").find("input").css("border-color", "#3c763d")
                $("#btn_submit").removeAttr("disabled")
              }
            } else {
              QK.messageFun($("#emailDiv"), result.msg)
            }
          })
        } else {
          QK.messageFun($("#emailDiv"), msg5)
        }
      },
    }
  }
</script>
