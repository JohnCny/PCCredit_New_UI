<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理级别信息
        </header>
        <div class="panel-body">
          <form action="" id="managerLevelNew" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="levelName">级别名称</label>
                  <div class="input-icon right">
                    <input v-model="infos.levelName" id="levelName" type="text" class="form-control" name="levelName" placeholder="请输入级别名称">
                    <div class="message">${errors.levelNameError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="nameDiv" class="form-group">
                  <label for="levelCredit">对应额度</label>
                  <div class="input-icon right">
                    <input  v-model="infos.levelCredit" id="levelCredit" type="text" class="form-control" name="levelCredit" placeholder="请输入对应额度">
                    <div class="message">${errors.levelCreditError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="overdueTolerateRate">逾期容忍率</label>
                  <div class="input-icon right">
                    <input  v-model="infos.overdueTolerateRate" id="overdueTolerateRate" type="text" class="form-control" name="overdueTolerateRate" placeholder="请输入10-99之间的年龄值" >
                    <div class="message">${errors.overdueTolerateRateError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="badloanTolerateRate">不良容忍率</label>
                  <div class="input-icon right">
                    <input  v-model="infos.badloanTolerateRate" id="badloanTolerateRate" type="text" class="form-control" name="badloanTolerateRate" placeholder="请输入10-99之间的年龄值" >
                    <div class="message">${errors.badloanTolerateRateError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="postloanMonitorTolerateNum">贷后监控容忍量</label>
                  <div class="input-icon right">
                    <input  v-model="infos.postloanMonitorTolerateNum" id="postloanMonitorTolerateNum" type="text" class="form-control" name="postloanMonitorTolerateNum" placeholder="请正确填写您的电话号码">
                    <div class="message">${errors.postloanMonitorTolerateNumError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="loanLimitMin">该级别贷款最小额度</label>
                  <div class="input-icon right">
                    <input v-model="infos.loanLimitMin" id="loanLimitMin" type="text" class="form-control" name="loanLimitMin" placeholder="请输入正确的身份证号" >
                    <div class="message">${errors.loanLimitMinError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="loanNumberMin">该级别贷款最小笔数</label>
                  <div class="input-icon right">
                    <input v-model="infos.loanNumberMin" id="loanNumberMin" type="text" class="form-control" name="loanNumberMin" placeholder="请输入合法的邮件地址">
                    <div class="message">${errors.loanNumberMinError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="overdueRateMin">该级别最小逾期率</label>
                  <div class="input-icon right">
                    <input v-model="infos.overdueRateMin" id="overdueRateMin" type="text" class="form-control" name="overdueRateMin" placeholder="请输入合法的邮件地址">
                    <div class="message">${errors.overdueRateMinError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class=row>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="badloanRateMin">该级别最小不良率</label>
                  <div class="input-icon right">
                    <input v-model="infos.badloanRateMin" id="badloanRateMin" type="text" class="form-control" name="badloanRateMin" placeholder="请输入合法的邮件地址">
                    <div class="message">${errors.badloanRateMinError}</div>
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
  .message{
    color:#a94442;
    height:20px;
  }
  #managerLevelNew input,#managerLevelNew select{
    width:80%
  }
</style>
<script>
    import QK from '../../../QK'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
           return {
                infos:{
                  badloanRateMin: '',
                  badloanTolerateRate: '',
                  levelCredit: '',
                  levelName: '',
                  loanLimitMin: '',
                  loanNumberMin: '',
                  overdueRateMin: '',
                  overdueTolerateRate: '',
                  postloanMonitorTolerateNum: ''
                },
                errors:{
                  badloanRateMinErrors: '',
                  badloanTolerateRateErrors: '',
                  idErrors: '',
                  levelCreditErrors: '',
                  levelNameErrors: '',
                  loanLimitMinErrors: '',
                  loanNumberMinErrors: '',
                  overdueRateMinErrors: '',
                  overdueTolerateRateErrors: '',
                  postloanMonitorTolerateNumErrors: ''
                }
           }
        },
        ready:function(){
          QK.addMethod()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#managerLevelNew",
              rulesMap:{
                  badloanRateMin:{required: !0,isIntGtZero: !0},
                  badloanTolerateRate:{required: !0,isIntGtZero: !0},
                  levelCredit:{required: !0,isIntGtZero: !0},
                  levelName:{required: !0},
                  loanLimitMin:{required: !0,isIntGtZero: !0},
                  loanNumberMin:{required: !0,isIntGtZero: !0},
                  overdueRateMin:{required: !0,isIntGtZero: !0},
                  overdueTolerateRate:{required: !0,isIntGtZero: !0},
                  postloanMonitorTolerateNum:{required: !0,isIntGtZero: !0},
              }
            })
            //验证结果  true  false
            if(bool){
              that.infos.levelName = that.infos.levelName+''
              that.$http.post(QK.SERVER_URL+'/api/customerManagerLevel', that.infos, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                    swal({
                        title: "创建成功!",
                        text: "",
                        confirmButtonColor: "#66BB6A",
                        type: "success",
                        confirmButtonText : '确定'
                    },
                    function(){
                      that.$router.go({path:"/system/managerLevel/list"})
                    })
                  }else{
                    swal({
                        title: "创建失败!",
                        text: result.msg+"！",
                        confirmButtonColor: "#EF5350",
                        type: "error",
                        confirmButtonText : '确定'
                    })
                  }
              })
            }
            return false
          },
        }
    }
</script>
