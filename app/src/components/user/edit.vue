<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          新建客户经理
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <form action="">
              <template v-for="dropDown in dropDownList">
                <div class="form-group">
                  <label for="userCname">中文名</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <input id="userCname" type="text" class="form-control" name="userCname" v-model="user.userCname"
                           placeholder="">
                    <div class="message">${userCnameError}</div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="username">用户名</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <input id="username" type="text" class="form-control" name="username" v-model="user.username"
                           placeholder="">
                    <div class="message">${usernameError}</div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="sex">性别</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <select id="sex" type="text" name="sex" class="form-control" v-model="user.sex">
                      <option value="">&#45;&#45;请选择&#45;&#45;</option>
                      <option value="1">男</option>
                      <option value="0">女</option>
                    </select>
                    <div class="message">${sexError}</div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="age">年龄</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <input id="age" type="text" class="form-control" name="age" v-model="user.age"
                           placeholder="">
                    <div class="message" id="ageMessage"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="tel">电话</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <input id="tel" type="text" class="form-control" name="tel" v-model="user.tel"
                           placeholder="">
                    <div class="message" id="telMessage"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="sex">用户状态</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <select id="status" type="text" name="status" class="form-control" v-model="user.status">
                      <option value="">&#45;&#45;请选择&#45;&#45;</option>
                      <option value="0">正常</option>
                      <option value="1">锁定</option>
                      <option value="3">待激活</option>
                    </select>
                    <div class="message">${statusError}</div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="idCardNumber">证件号码</label>
                  <div class="input-icon right">
                    <i class="fa checkId"></i>
                    <input data-error="" id="idCardNumber" type="text" class="form-control"
                           name="idCardNumber" v-model="user.idCardNumber" placeholder="">
                    <div class="message" id="idMessage"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="sex">角色</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <select id="role" type="text" name="role" class="form-control" v-model="user.role">
                      <option value="">&#45;&#45;请选择&#45;&#45;</option>
                    </select>
                    <div class="message">${roleError}</div>
                  </div>
                </div>
                <div class="col-xs-12 contain">
                  <button id="btn_submit" class="btn btn-success">确定</button>
                  <a href="/customer/customer" type="reset" class="btn btn-default">取消</a>
                </div>
              </template>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
</style>
<script>
    export default{
        data:function(){
             return {
              user: {
                userCname: '',
                username: '',
                sex: '',
                age: '',
                tel: '',
                status: '',
                idCardNumber: '',
              },
              roles:[],
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

        },
        methods:{
              getInfos:function() {
                var that = this
                that.$http.post(QK.SERVER_URL+'/api/user/add', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("infos", data.data)
                  }
                })
              },
              searchId:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/api/customerBasic/cert', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("certificate", data.data)
                  }
                })
              },
              marCondition:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/api/customerBasic/marriageStatus', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("marriage", data.data)
                  }
                })
              },
              degree:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/api/customerBasic/educationDegree', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("education", data.data)
                  }
                })
              }
            }
        }
</script>
