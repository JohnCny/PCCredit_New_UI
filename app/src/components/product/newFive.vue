<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          完成
        </header>
        <div class="panel-body">
          <form id="org_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-5 col-sm-6 col-xs-12">
                <div class="input-icon right">
                  <h3 style="color:#a0d468;fontweight:bold">
                    <img src="../../../static/images/success.png">
                    保存成功！
                  </h3>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
  <p class="button">
    <a class="btn btn-default" @click="cancelMethod()">返回</a>
  </p>
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
        tOrganization: {
          orgName: '',
          orgDirectorName: '',
          orgLogisticsId: ''
        },
        errors: {
          orgNameError: '',
          orgDirectorNameError: '',
          orgLogisticsIdError: ''
        }
      }
    },
    ready: function () {
      QK.addMethod()
    },
    methods: {
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#org_new",
          rulesMap: {
            orgName: {required: !0, isRightfulString: !0},
            orgDirectorName: {required: !0, isChinese: !0},
            orgLogisticsId: {required: !0}
          }
        })
        //验证结果  true  false
        if (bool) {
          that.$http.post(QK.SERVER_URL + '/organization', that.user, true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              that.$router.go({path: "/system/organization/list"})
            }
          })
        }
        return false
      },
      cancelMethod:function(){
        this.$router.go({path: localStorage.nowurl})
      }
    }
  }

</script>
