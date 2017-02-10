<template>
  <section class="panel">
    <header class="panel-heading custom-tab">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#home3">
            <i class="fa fa-user"></i>
            头像上传
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#about3">
            <i class="fa fa-edit"></i>
            资料编辑
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#contact3">
            <i class=""></i>
            其他
          </a>
        </li>
      </ul>
    </header>
    <div class="panel-body">
      <div class="tab-content">
        <div id="home3" class="tab-pane active">
          <my-upload></my-upload>
        </div>
        <div id="about3" class="tab-pane">
          <form id="userEdit" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="orgName">机构</label>
                  <div class="input-icon right orgNameDiv">
                    <input id="orgName" v-model="userSession.orgName" type="text" class="form-control" readonly>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div id="nameDiv" class="form-group">
                  <label for="username">登录名</label>
                  <div class="input-icon right">
                    <input v-model="userSession.username" id="username" type="text" class="form-control" name="username"
                           readonly>
                    <div class="message">${errors.usernameError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="userCname">姓名</label>
                  <div class="input-icon right">
                    <input v-model="userSession.userCname" id="userCname" type="text" class="form-control"
                           name="userCname" placeholder="请输入中文名2到10位">
                    <div class="message">${errors.userCnameError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="age">年龄</label>
                  <div class="input-icon right">
                    <input v-model="userSession.age" id="age" type="text" class="form-control" name="age"
                           placeholder="请输入10-99之间的年龄值">
                    <div class="message">${errors.ageError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="sex">性别</label>
                  <div class="input-icon right">
                    <select id="sex" type="text" name="sex" class="form-control" v-model="userSession.sex">
                      <option value="1" v-if="userSession.sex==1" selected>男</option>
                      <option value="1" v-else>男</option>
                      <option value="0" v-if="userSession.sex==0" selected>女</option>
                      <option value="0" v-else>女</option>
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
                    <input v-model="userSession.tel" id="tel" type="text" class="form-control" name="tel"
                           placeholder="请正确填写您的电话号码">
                    <div class="message">${errors.telError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="idCardNumber">证件号码</label>
                  <div class="input-icon right">
                    <input v-model="userSession.idCardNumber" id="idCardNumber" type="text" class="form-control"
                           name="idCardNumber" readonly>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div id="emailDiv" class="form-group">
                  <label for="username">电子邮件</label>
                  <div class="input-icon right">
                    <input v-model="userSession.email" id="email" type="text" class="form-control" name="email">
                    <div class="message">${errors.emailError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="sex">用户状态</label>
                  <div class="input-icon right">
                    <input v-model="userSession.status" id="status" type="text" class="form-control" name="status"
                           readonly>
                    <div class="message">${errors.statusError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class=row>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="roleId">角色</label>
                  <div class="input-icon right">
                    <select v-model="userSession.roleType" id="roleId" type="text" name="roleId" class="form-control"
                            disabled>
                      <option value="-1">&#45;&#45;请选择&#45;&#45;</option>
                      <template v-for="role in roles">
                        <option v-bind:value="role.id" v-if="userSession.roleType==role.id" selected>
                          ${role.roleNameZh}
                        </option>
                        <option v-bind:value="role.id" v-else>${role.roleNameZh}</option>
                      </template>
                    </select>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a class="btn btn-default">取消</a>
              </div>
            </div>
          </form>
        </div>
        <div id="contact3" class="tab-pane ">Else</div>
      </div>
    </div>
  </section>
</template>
<script>
  import QK from '../../QK'
  import myUpload from '../upload/uploadImg.vue'
  import jQueryValidation from 'jquery-validation'
  export default{
    data(){
      return {
        userSession: {
          username: '',
          email: '',
          tel: '',
          status: '',
          userCname: '',
          sex: '',
          age: '',
          idCardNumber: '610527198808043212',
          roleType: '',
        },
        roles: [],
        show: true,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        imgDataUrl: '', // the datebase64 url of created image
        errors: {
          emailError: '',
          telError: '',
          userCnameError: '',
          sexError: '',
          ageError: '',
        },
      }
    },
    ready: function () {
      this.init()
      QK.addMethod()
    },
    components: {
      'my-upload': myUpload
    },
    methods: {
      init: function () {
        var that = this
        that.$http.get(QK.SERVER_URL + '/api/user/add', true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("roles", data.data)
          }
        })
        var userData = JSON.parse(localStorage.user)
        that.$set("userSession.id", userData.user.id)
        that.$set("userSession.username", userData.user.username)
        that.$set("userSession.email", userData.user.email)
        that.$set("userSession.tel", userData.user.tel)
        that.$set("userSession.status", userData.user.status)
        that.$set("userSession.userCname", userData.user.userCname)
        that.$set("userSession.sex", userData.user.sex)
        that.$set("userSession.age", userData.user.age)
        that.$set("userSession.idCardNumber", userData.user.idCardNumber)
        that.$set("userSession.roleType", userData.roleType)
        //that.$set("userSession.orgId",userData.org.id)
        that.$set("userSession.orgName", userData.org.orgName)
        console.log(that.userSession)
      },
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#userEdit",
          rulesMap: {
            userCname: {required: !0, isChinese: !0},//中文名
            sex: {required: !0, downList: !0},//性别
            age: {required: !0, age: !0},//年龄
            tel: {required: !0, tel: !0},//联系方式
            email: {required: !0, email: !0},//电子邮件
          }
        })
        //验证结果  true  false
        if (bool) {
          delete that.userSession["orgName"]
          delete that.userSession["roleType"]
          that.$set("userSession.orgId", "")
          that.$set("userSession.roleId", "")
          console.log(that.userSession)
          that.$http.put(QK.SERVER_URL + '/api/user', that.userSession, true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              var optionObj = {
                'that': that,
                'title': '修改成功!',
                'listUrl': '/system/user/list'
              }
              QK.successSwal(optionObj)
            } else {
              var optionObj = {
                'that': that,
                'title': '修改失败!',
                'text': result.msg + "！",
              }
              QK.errorSwal(optionObj)
            }
          })
        }
        return false
      },
    }
  }
</script>
