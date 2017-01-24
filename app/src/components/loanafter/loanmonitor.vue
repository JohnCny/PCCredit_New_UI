<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          贷后监控信息
        </header>
        <div class="panel-body">
          <form  id="LoanMonitor" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="tPostLoanMonitorType">贷后监控方式：</label>
                  <div class="input-icon right">
                    <select id="tPostLoanMonitorType" type="text" name="tPostLoanMonitorType" v-model="infos.tPostLoanMonitorType" class="form-control">
                      <option value="-1" selected = "selected">--请选择--</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <div class="message">${errors.nodeTypeError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="taskStatus">贷后监控结果：</label>
                  <div class="input-icon right">
                    <select id="taskStatus" type="text" name="taskStatus" v-model="infos.taskStatus" class="form-control">
                      <option value="-1" selected = "selected">--请选择--</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <div class="message">${errors.preNodeIdError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="other">其它：</label>
                  <div class="input-icon right">
                    <textarea class="form-control" v-model="infos.other" name="other" id="other"></textarea>
                    <div class="message">${errors.approveRolesError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-md-offset-5">
                <button id="btn_submit" class="btn btn-success">保存</button>
                <a href="javascript:void (0);" v-link="{path:'/system/product/list'}"  class="btn btn-default">返回</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  .message{
    color:#a94442;
    height:20px;
  }
</style>
<script>
    import QK from '../../QK'
    import jQueryValidation from 'jquery-validation'
    import swal from 'sweetalert'
    export default{
        data:function(){
           return {
                infos:{
                  tPostLoanMonitorType: '',
                  taskStatus: '',
                  other: ''
                },
                errors:{
                  tPostLoanMonitorTypeError: '',
                  taskStatusError: '',
                  otherError: ''
                },
                approveRoles:[{
                  id:'',
                  roleNameZh:''
                }],
           }
        },
        ready:function(){
          QK.addMethod()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#LoanMonitor",
              rulesMap:{
                  tPostLoanMonitorType:{required: !0,downList: !0},
                  taskStatus:{required: !0,downList: !0},
                  other:{required: !0}
              }
            })

            //验证结果  true  false
            if(bool){
              var id = that.$route.params.id
              console.log(id)
              that.infos.id = id
              that.$http.put(QK.SERVER_URL+'/api/loanMonitor',that.infos, true).then(function (data) {
                var id = that.$route.params.id
                var data = $.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                  if (result.state) {
                        var optionObj = {
                            'that' : that,
                            'title' : '成功!',
                            'listUrl' : '/system/loanafter/loanafterdo'
                          }
                          QK.successSwal(optionObj)
                      }else{
                        var optionObj = {
                            'that' : that,
                            'title' : '失败!',
                            'text' : result.msg+"！",
                          }
                          QK.errorSwal(optionObj)
                      }
              })
            }
            return false
          }
        }
    }
</script>
