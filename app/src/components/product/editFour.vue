<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          配置风险属性
        </header>
        <div class="panel-body">
          <form id="property_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="overPeriodLimit">逾期超过__期转入风险名单:</label>
                  <div class="input-icon right">
                    <input v-model="overdue.overPeriodLimit" id="overPeriodLimit" type="text" class="form-control" name="overPeriodLimit" placeholder="">
                    <div class="message">${errors.overPeriodLimitError}</div>
                  </div>
                </div>
              </div>
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="isLoanBadToBlack">不良转入黑名单:</label>
                  <div class="input-icon right">
                    <input id="isLoanBadToBlack" type="radio" name="isLoanBadToBlack" value="1" v-model="overdue.isLoanBadToBlack">
                    <label onclick="setRadio(this)"class=" radio_a">
                      是
                    </label>
                    <input id="isLoanBadToBla" type="radio" name="isLoanBadToBlack" value="0" v-model="overdue.isLoanBadToBlack">
                    <label onclick="setRadio(this)"class=" radio_a">
                      否
                    </label>
                    <div class="message">${errors.isLoanBadToBlackError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="overdueWarningLimit">逾期率高于___%时预警:</label>
                  <div class="input-icon right">
                    <input v-model="overdue.overdueWarningLimit" id="overdueWarningLimit" type="text" class="form-control" name="overdueWarningLimit" placeholder="">
                    <div class="message">${errors.overdueWarningLimitError}</div>
                  </div>
                </div>
              </div>
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="badloanWarningLimit">不良率高于___%时预警:</label>
                  <div class="input-icon right">
                    <input v-model="overdue.badloanWarningLimit" id="badloanWarningLimit" type="text" class="form-control" name="badloanWarningLimit" placeholder="">
                    <div class="message">${errors.badloanWarningLimitError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="industryOverdueWarningLimit">行业逾期率高于___%时预警:</label>
                  <div class="input-icon right">
                    <input v-model="overdue.industryOverdueWarningLimit" id="industryOverdueWarningLimit" type="text" class="form-control" name="industryOverdueWarningLimit" placeholder="请输入负责人">
                    <div class="message">${errors.industryOverdueWarningLimitError}</div>
                  </div>
                </div>
              </div>
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="industryBadloanWarningLimit">行业不良率高于___%时预警:</label>
                  <div class="input-icon right">
                    <input v-model="overdue.industryBadloanWarningLimit" id="industryBadloanWarningLimit" type="text" class="form-control" name="industryBadloanWarningLimit" placeholder="请输入负责人">
                    <div class="message">${errors.industryBadloanWarningLimitError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="rejectionRate">行业拒件率高于___%时预警:</label>
                  <div class="input-icon right">
                    <input v-model="overdue.rejectionRate" id="rejectionRate" type="text" class="form-control" name="rejectionRate" placeholder="">
                    <div class="message">${errors.rejectionRateError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-md-offset-5">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a href="" v-link={path:'/system/product/list'} class="btn btn-default">取消</a>
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
  .message{
    color:#a94442;
    height:20px;
  }
</style>
<script>
    import QK from '../../QK'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
           return {
                overdue:{
                  overPeriodLimit: '',
                  isLoanBadToBlack: '',
                  industryOverdueWarningLimit: '',
                  industryBadloanWarningLimit:'',
                  overdueWarningLimit:'',
                  badloanWarningLimit:'',
                  rejectionRate:''
                },
                errors:{
                  overPeriodLimitError: '',
                  isLoanBadToBlackError: '',
                  industryOverdueWarningLimitError: '',
                  industryBadloanWarningLimitError:'',
                  overdueWarningLimitError:'',
                  badloanWarningLimitError:'',
                  rejectionRateError:''
                }
           }
        },
        ready:function(){
          QK.addMethod()
          this.init()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#property_new",
              rulesMap:{
                overPeriodLimit:{required: !0,isIntGtZero: !0},
                isLoanBadToBlack:{required: !0},
                industryOverdueWarningLimit:{required: !0,isIntGtZero: !0},
                industryBadloanWarningLimit:{required: !0,isIntGtZero: !0},
                overdueWarningLimit:{required: !0,isIntGtZero: !0},
                badloanWarningLimit:{required: !0,isIntGtZero: !0},
                rejectionRate:{required: !0,isIntGtZero: !0}
              }
            })
            //验证结果  true  false
            if(bool){
            var overdue = that.overdue
            var productId = that.$route.params.id
              that.$http.put(QK.SERVER_URL+'/api/productRisk',{
                  overPeriodLimit:overdue.overPeriodLimit,
                  isLoanBadToBlack:overdue.isLoanBadToBlack,
                  industryOverdueWarningLimit:overdue.industryOverdueWarningLimit,
                  industryBadloanWarningLimit:overdue.industryBadloanWarningLimit,
                  overdueWarningLimit:overdue.overdueWarningLimit,
                  badloanWarningLimit:overdue.badloanWarningLimit,
                  rejectionRate:overdue.rejectionRate,
                  productId:productId,
                  id:overdue.id
              } , true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var id = that.$route.params.id
                var result = QK.getStateCode(that,data.code)
                 if (result.state) {
                        var optionObj = {
                            'that' : that,
                            'title' : '修改成功!',
                            'listUrl' : '/system/product/list'
                          }
                          QK.successSwal(optionObj)
                      }else{
                        var optionObj = {
                            'that' : that,
                            'title' : '修改失败!',
                            'text' : result.msg+"！",
                          }
                          QK.errorSwal(optionObj)
                      }
              })
            }
            return false
          },
          init:function(){
                var that = this
                  var id = that.$route.params.id
                  that.$http.get(QK.SERVER_URL+'/api/productRisk?productId='+id,true).then(function (data) {
                    var data = jQuery.parseJSON(data.body);
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                       that.$set("overdue", data.data)
                    }
                  })
          }
     }
  }

</script>
