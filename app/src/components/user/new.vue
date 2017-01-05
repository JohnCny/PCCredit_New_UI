<template>
  <div class="row">
    <div class="col-sm-3">
      <section class="panel">
        <header class="panel-heading">
          选择机构
        </header>
        <div class="panel-body">

        </div>
      </section>
    </div>
    <div class="col-sm-9">
      <section class="panel">
        <header class="panel-heading">
          填写用户信息
        </header>
        <div class="panel-body">
            <form action="" id="userNew">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="userCname">姓名</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <input v-model="user.userCname" id="userCname" type="text" class="form-control" name="userCname" placeholder="">
                      <div class="message">${errors.userCnameError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="username">登录名</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <input v-model="user.username" id="username" type="text" class="form-control" name="username" placeholder="">
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
                      <i class="fa"></i>
                      <input  v-model="user.age" id="age" type="text" class="form-control" name="age" placeholder="" >
                      <div class="message">${errors.ageError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="sex">性别</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <select id="sex" type="text" name="sex" class="form-control" v-model="user.sex">
                        <option value="1">男</option>
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
                      <i class="fa"></i>
                      <input  v-model="user.tel" id="tel" type="text" class="form-control" name="tel" placeholder="">
                      <div class="message">${errors.telError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div id="idNumberDiv" class="form-group">
                    <label for="idCardNumber">证件号码</label>
                    <div class="input-icon right">
                      <i class="fa checkId"></i>
                      <input v-model="user.idCardNumber" id="idCardNumber" type="text" class="form-control idNumber" name="idCardNumber" placeholder="" v-on:change="idNumberCheck()">
                      <div class="message">${errors.idNumberError}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="sex">用户状态</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <select  v-model="user.status" id="status" type="text" name="status" class="form-control">
                        <option value="0">正常</option>
                        <option value="1">锁定</option>
                        <option value="3">待激活</option>
                      </select>
                      <div class="message">${errors.statusError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="role">角色</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <select  v-model="user.role" id="role" type="text" name="role" class="form-control">
                        <option value="">&#45;&#45;请选择&#45;&#45;</option>
                        <template v-for="role in roles">
                          <option value="role.id">${role.roleName}</option>
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
  #userNew input,#userNew select{
    width:80%
  }
</style>
<script>
    import QK from '../../QK'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
           return {
                user:{
                  userCname: '',
                  username: '',
                  sex: '',
                  age: '',
                  tel: '',
                  status: '',
                  idCardNumber: '',
                  role: '',
                },
                roles:[],
                message : {
                  idNmber: '',
                },
                errors:{
                  userCnameError: '',
                  usernameError: '',
                  sexError: '',
                  ageError: '',
                  telError: '',
                  statusError: '',
                  idCardNumberError: '',
                  roleError: '',
                }
           }
        },
        ready:function(){
          this.init()
          QK.addMethod()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#userNew",
              rulesMap:{
                username:{required: !0,isRightfulString:!0},//登录名
                userCname:{required: !0,isChinese:!0},//中文名
                password:{required: !0},//密码
                sex:{required:!0,downList:!0},//性别
                age:{required:!0},//联系方式
                tel:{required:! 0,tel:!0},//是否激活
                status:{required:!0},//电子邮件
                idCardNumber:{required:!0,idNumber:!0},//证件号码
                homeAddress:{required: !0,isHomeAddress: !0},//家庭地址
                role:{required: !0},//工作地址
              }
            })
            //验证结果  true  false
            if(bool){
              that.$http.post(QK.SERVER_URL+'/api/user', that.user, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                alert("新建成功")
                  that.$router.go({path:"/system/user/list"})
                }
              })
            }
            return false
          },
          init:function() {
            var that = this
            that.$http.get(QK.SERVER_URL+'/api/user/add', true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("roles", data.data)
              }
            })
          },
          messageCname(parent,msg){
            parent.find(".checkId").removeClass("fa-check").addClass("fa-warning").css("color", "#ed6b75")
            parent.find(".message").css("color", "red").html(msg)
            $("#btn_submit").attr("disabled", "true")
          },
          idNumberCheck(){
            var that = this
            var idNumber = that.user.idCardNumber
            var len = idNumber.length
            var msg3 = "身份证已存在或格式不正确！"
            var msg4 = "证件可用"
            var msg5 = "身份证长度不够！"
            if (len < 14) {
              that.messageCname($("#idNumberDiv"),msg5)
            }else {
              this.$http.post(QK.SERVER_URL+'/api/user/isIdCard', idNumber,true).then(function (res) {
              var data = jQuery.parseJSON(res.body)
                    if (!data.data) {
                        that.messageCname($("#idNumberDiv"),msg3)
                    } else {
                        $("#idNumberDiv").find("div.message").css("color", "#32c5d2").html(msg4)
                        $("#idNumberDiv").find("i.checkId").removeClass("fa-warning").addClass("fa-check").css("color", "#32c5d2")
                        $("#btn_submit").removeAttr("disabled")
                  }
              })
            }
          },

        }
    }
</script>
