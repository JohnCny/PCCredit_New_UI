<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          新建用户
        </header>
        <div class="panel-body">
            <form action="" id="userAdd">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="userCname">中文名</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <input id="userCname" type="text" class="form-control" name="userCname" placeholder="">
                      <div class="message">${userCnameError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="username">用户名</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <input id="username" type="text" class="form-control" name="username" placeholder="">
                      <div class="message">${usernameError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="sex">性别</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <select id="sex" type="text" name="sex" class="form-control">
                        <option value="">&#45;&#45;请选择&#45;&#45;</option>
                        <option value="1">男</option>
                        <option value="0">女</option>
                      </select>
                      <div class="message">${sexError}</div>
                    </div>
                  </div>
              </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="age">年龄</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <input id="age" type="text" class="form-control" name="age" placeholder="">
                      <div class="message" id="ageMessage"></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="tel">电话</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <input id="tel" type="text" class="form-control" name="tel" placeholder="">
                      <div class="message" id="telMessage"></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="sex">用户状态</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <select id="status" type="text" name="status" class="form-control">
                        <option value="">&#45;&#45;请选择&#45;&#45;</option>
                        <option value="0">正常</option>
                        <option value="1">锁定</option>
                        <option value="3">待激活</option>
                      </select>
                      <div class="message">${statusError}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="idCardNumber">证件号码</label>
                    <div class="input-icon right">
                      <i class="fa checkId"></i>
                      <input v-on:blur="validIdNumber" data-error="" id="idCardNumber" type="text" class="form-control" name="idCardNumber" placeholder="">
                      <div class="message">${message.idNumber}</div>
                    </div>
                  </div>
                </div> 
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="sex">角色</label>
                    <div class="input-icon right">
                      <i class="fa"></i>
                      <select id="role" type="text" name="role" class="form-control">
                        <option value="">&#45;&#45;请选择&#45;&#45;</option>
                        <template v-for="role in roles">
                          <option value="role.id">${role.roleName}</option>
                        </template>

                      </select>
                      <div class="message">${roleError}</div>
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
  #userAdd input,#userAdd select{
    width:80%
  }
</style>
<script>
    import QK from '../../QK'
    export default{
        data:function(){
           return {
                roles:[],
                message : {
                  idNmber: '',
                },
                errors:{
                  userCnameErroe: '',
                  usernameErroe: '',
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
        },
        methods:{
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
             validIdNumber: function(){
                var that = this
                var idCard = $("#idCardNumber").val()
                that.$http.post(QK.SERVER_URL+'/api/user/isIdCard',idCard,true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.message.idNumber = data.data?"身份证已存在":"身份证可用"
                  }else{
                    that.message.idNumber = data.msg
                  }
                })
             }
        }
    }
</script>
