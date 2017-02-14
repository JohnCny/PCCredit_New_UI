<template>
  <form id="monito_new" @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-md-12">
        <section class="panel">
          <header class="panel-heading" >
            转入(转出)黑(风险)名单信息
          </header>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="">客户名称:</label>
                  <div class="input-icon right">
                    <span><a>${infos.customerName}</a></span>
                    <div class="message">${errors.monitorTimeFirstError}</div>
                  </div>
                </div>
              </div>
              <div class=" col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="">	证件号码:</label>
                  <div class="input-icon right">
                    <span><a>${infos.idCard}</a></span>
                    <div class="message">${errors.monitorTimeRateError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="">进入风险名单日期:</label>
                  <div class="input-icon right">
                    <span><a>${infos.createTime | formatDate}</a></span>
                    <div class="message">${errors.siteVisitsrateError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="">进入原因:</label>
                  <div class="input-icon right">
                    <span><a>${infos.riskBlackTransforReason}</a></span>
                    <div class="message">${errors.siteVisitsrateError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="">申请操作:</label>
                  <div class="input-icon right">
                   <span>
                     <a v-if="infos.riskBlackOperationType == 0">转入黑名单</a>
                     <template v-else>
                       <a v-if="infos.riskBlackOperationType == 1">转出黑名单</a>
                       <template v-else>
                         <a>转出风险名单</a>
                       </template>
                     </template>
                   </span>
                    <div class="message">${errors.siteVisitsrateError}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-md-offset-5">
        <a href="javascript:void (0);" class="btn btn-success" v-on:click="pass">通过</a>
        <a href="javascript:void (0);" class="btn btn-danger" v-on:click="refuse">拒绝</a>
      </div>
    </div>
  </form>
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
  export default{
    data: function () {
      return {
        infos: {
          customerName: '',
          idCard: '',
          createTime: '',
          riskBlackTransforReason: '',
          riskBlackOperationType: ''
        },
      }
    },
    ready: function () {
      this.init()
      QK.addMethod()
    },
    methods: {
      pass:function(){
         var that = this
         var customerId = that.$route.params.id
         that.$http.put(QK.SERVER_URL+'/api/riskBlackCustomerApprove/'+customerId+'?flag=1' , true).then(function (data) {
            var data = jQuery.parseJSON(data.body);
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
               var optionObj = {
              'that': that,
              'title': '成功!',
              'listUrl' : '/system/riskmanagement/riskcusdoc'
            }
            QK.successSwal(optionObj)
            }else{
              var optionObj = {
              'that': that,
              'title': '失败!',
              'text': result.msg + "！",
            }
            QK.errorSwal(optionObj)
            }
         })
      },
      refuse:function(){
        var that = this
         var customerId = that.$route.params.id
         that.$http.put(QK.SERVER_URL+'/api/riskBlackCustomerApprove/'+customerId+'?flag=0' , true).then(function (data) {
            var data = jQuery.parseJSON(data.body);
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
               var optionObj = {
              'that': that,
              'title': '成功!',
              'listUrl' : '/system/riskmanagement/riskcusdoc'
            }
            QK.successSwal(optionObj)
            }else{
              var optionObj = {
              'that': that,
              'title': '失败!',
              'text': result.msg + "！",
            }
            QK.errorSwal(optionObj)
            }
         })
      },
      init:function(){
        var that = this
        var riskBlackApproveId = that.$route.params.riskid
         that.$http.get(QK.SERVER_URL+'/api/riskBlackCustomerApprove/'+riskBlackApproveId , true).then(function (data) {
            var data = jQuery.parseJSON(data.body);
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
                that.$set("infos", data.data)
                console.log(data.data.riskBlackOperationType)
            }
         })
      }
    }
  }

</script>
