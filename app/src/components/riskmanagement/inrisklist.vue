<style src='../../../static/css/sweetalert.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          转入风险名单信息
        </header>
        <div class="panel-body">
          <form id="RiskOut" @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
                <div id="emailDiv" class="form-group">
                  <label for="username">转入原因:</label>
                  <div class="input-icon right">
                    <textarea class="form-control" name="riskBlackTransforReason" v-model="infos.riskBlackTransforReason"></textarea>
                    <div class="message">${errors.emailError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
                <button class="btn btn-success">确定</button>
                <button type="reset" class="btn btn-default">取消</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
    import QK from '../../QK'
    import jQueryValidation from 'jquery-validation'
    import swal from 'sweetalert'
    export default{
        data:function(){
           return {
              infos:{
              riskBlackTransforReason:'',
              riskBlackOperationType:'0'
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
              id: "#RiskOut",
              rulesMap:{

                //role:{required: !0},//角色可为空
              }
            })
            //验证结果  true  false
            if(bool){
              var customerId = that.$route.params.id
              that.$http.put(QK.SERVER_URL+'/api/riskBlackCustomerApprove/approve?customerId='+customerId, that.infos, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                  var optionObj = {
                      'that' : that,
                      'title' : '转入成功!',
                      'listUrl' : '/system/riskmanagement/risklist'
                    }
                    QK.successSwal(optionObj)
                }else{
                  var optionObj = {
                      'that' : that,
                      'title' : '转入失败!',
                      'text' : result.msg+"！",
                    }
                    QK.errorSwal(optionObj)
                }
              })
            }
            return false
          },
          init:function() {


          }
        }
    }
</script>
