<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理日报信息
        </header>
        <div class="panel-body">
          <form action="" id="managerLevelEdit">
            <div class="row">
              <div class="col-md-3 col-md-offset-1">
                <div class="form-group">
                  <div class="input-icon right">
                    <div class="message"></div>
                    拜访/新增客户数:
                    <span><a>${infos.visitNewNumber}</a></span>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-1">
                <div class="form-group">
                  <div class="input-icon right">
                    <div class="message"></div>
                    客户维护数:
                    <span><a>${infos.maintenanceNumber}</a></span>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-1">
                <div class="form-group">
                  <div class="input-icon right">
                    <div class="message"></div>
                    新申请贷款数:
                    <span><a>${infos.loanNewNumber}</a></span>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-1">
                <div class="form-group">
                  <div class="input-icon right">
                    <div class="message"></div>
                    贷前调查数量:
                    <span><a>${infos.preLoanNumber}</a></span>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-1">
                <div class="form-group">
                  <div class="input-icon right">
                    <div class="message"></div>
                    贷后监控数量:
                    <span><a>${infos.postLoanNumber}</a></span>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" style="text-align:center">
                <a @click="cancelMethod()" class="btn btn-default">返回</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  #managerLevelEdit input, #managerLevelEdit select {
    width: 80%
  }

  .message {
    color: #a94442;
    height: 20px;
  }
</style>
<script>
  import QK from '../../../QK'
  import jQueryValidation from 'jquery-validation'
  export default{
    data: function () {
      return {
        infos:{
          visitNewNumber:'',
          preLoanNumber:'',
          postLoanNumber:'',
          maintenanceNumber:'',
          loanNewNumber:''
        }
      }
    },
    ready: function () {
      this.init()
      QK.addMethod()
    },
    methods: {
      init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/customerManagerDay?customerManagerId='+ id +'', true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      },
      cancelMethod:function(){
         this.$router.go({path:localStorage.nowurl})
      },
    }
  }
</script>
