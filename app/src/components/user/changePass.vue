<style src='../../../static/css/sweetalert.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          填写新密码
        </header>
        <div class="panel-body">
          <form id="passwordReset" @submit.prevent="handleSubmit" >
            <div class="row">
              <div class="col-xs-offset-5 col-xs-7 errorMessage isHidden">
                <img style="border:0" v-bind:src="message.errorImg" /><span>${message.msg}</span>
              </div>
            </div>
            <div class="row" style="margin-bottom:16px;">
              <div class="col-xs-12" style="text-align:center;">
                <label for="oldPassword" class="pwdText">原始密码<font class="red">*</font>：</label>
                <div class="input-icon right" style="display:inline-block;width:60%">
                  <input type="password" class="form-control" id="oldPassword" name="oldPassword" v-model="password.oldPassword" />
                  <div class="message">${errors.oldPasswordError}</div>
                </div>
              </div>
            </div>
            <div class="row" style="margin-bottom:16px">
              <div class="col-xs-12" style="text-align:center;">
                <label for="newPassword" class="pwdText">新密码<font class="red">*</font>：</label>
                <div class="input-icon right" style="display:inline-block;width:60%">
                  <input type="password" class="form-control" id="newPassword" name="newPassword" v-model="password.newPassword" />
                  <div class="message">${errors.newPassword}</div>
                </div>
              </div>
            </div>
            <div class="row" style="margin-bottom:16px">
              <div class="col-xs-12" style="text-align:center;">
                <label for="newPassword1" class="pwdText">确认新密码<font class="red">*</font>：</label>
                <div class="input-icon right" style="display:inline-block;width:60%">
                  <input type="password" class="form-control" id="newPassword1" name="newPassword1" v-model="password.newPassword1" />
                  <div class="message">${errors.newPassword1Error}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" style="text-align:center;">
                <button style="width: 90px;margin-right:10px;" class="btn btn-success" type="submit">提 交</button>
                <input style="width: 90px;" class="btn btn-success" type="reset" value="重 置">
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  font.red {
    color: #c7254e;
    font-size: 18px;
    font-weight: bold;
  }
  .pwdText{
    color:#7a7676;
    font-weight:normal;
    text-align:right;
    width: 30%;
  }
  input[type="password"]{
    width: 70%;
  }
  input[type="password"]:focus{
    border : 1px solid #c7254e;
  }
  /*错误提示信息*/
  .errorMessage {
    width: 100%;
    text-align: left;
    color: #e4393c;
    line-height: 25px;
    height: 25px;
    font-size: 14px;
  }
  .errorMessage img {
    vertical-align: text-bottom;
    width:16px;
    height:16px;
    margin-right:5px;
  }
  .isHidden{
    visibility:hidden
  }
  .message{
    color:#a94442;
    height:20px;
    float:left
  }
</style>
<script>
  import QK from '../../QK'
  import jQueryValidation from 'jquery-validation'
  import swal from 'sweetalert'
  export default{
    data: function(){
      return {
        password : {
          oldPassword : '',
          newPassword : ''
        },
        message:{
          msg : '',
          errorImg : ''
        },
        errors :{
          oldPasswordError : '',
          newPasswordError : '',
          newPassword1Error : '',
        }
      }
    },
    ready : function(){
      QK.addMethod()
    },
    methods : {
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#passwordReset",
          rulesMap: {
              oldPassword:{required: !0},
              newPassword:{required: !0},
              newPassword1:{required: !0, equalTo:"#newPassword"},
          }
        })
        //验证结果  true  false
        if(bool){
          //发送请求
          that.$http.post(QK.SERVER_URL+'/api/user/updatePassword', that.password, true).then(function (data) {
            var data = jQuery.parseJSON(data.body)
            var result = QK.getStateCode(that,data.code)
            if (result.state) {
              $(".errorMessage").addClass("isHidden")
              that.$router.go({path:"/system/login"})
            }else{
              that.message.msg = result.msg
              that.message.errorImg = '/static/images/error1.png'
              $(".errorMessage").removeClass("isHidden")
            }
          })
        }
        return false
      }
    }
  }

</script>
