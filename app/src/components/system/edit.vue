<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          系统参数编辑
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <form id="para_edit" @submit.prevent="handleSubmit">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="parameterName">参数名称</label>
                <div class="input-icon right">
                  <input id="parameterName" type="text" class="form-control" name="parameterName" v-model="tSysParameter.parameterName">
                  <div class="message">${parameterNameError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="parameterValue">参数值</label>
                <div class="input-icon right">
                  <input id="parameterValue" type="text" class="form-control" name="parameterValue" v-model="tSysParameter.parameterValue">
                  <div class="message">${errors.parameterValueError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="parameterNameZn">参数中文名</label>
                <div class="input-icon right">
                  <input id="parameterNameZn" type="text" class="form-control" name="parameterNameZn" v-model="tSysParameter.parameterNameZn">
                  <div class="message">${errors.parameterNameZnError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="parameterDescription">参数描述</label>
                <div class="input-icon right">
                  <input id="parameterDescription" type="text" class="form-control" name="parameterDescription" v-model="tSysParameter.parameterDescription">
                  <div class="message">${errors.parameterDescriptionError}</div>
                </div>
              </div>
              <div class="col-xs-12 col-md-offset-5 contain" style="margin-top: 50px;">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a v-on:click="cancelMethod()" type="reset" class="btn btn-default">取消</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
   .message{
      color:#a94442;
      height:20px;
  }
</style>
<script>
  import QK from '../../QK.js'
  import jQueryValidation from 'jquery-validation'
  export default{
    data: function () {
      return {
        tSysParameter: {
          parameterName: '',
          parameterValue: '',
          parameterNameZn: '',
          parameterDescription: ''
        },
        errors: {
          parameterNameError: '',
          parameterValueError: '',
          parameterNameZnError: '',
          parameterDescriptionError: ''
        }
      }
    },
    ready: function () {
        QK.addMethod()
        this.getInfo()
    },
    methods: {
       handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#para_edit",
          rulesMap: {
            parameterName: {required: !0},
            parameterValue: {required: !0},
            parameterNameZn: {required: !0, isChinese: !0},
            parameterDescription: {required: !0}
          }
        })
          //验证结果  true  false
           if (bool) {
            //发送请求
                var tSysParameter = that.tSysParameter
                delete tSysParameter["createBy"]
                delete tSysParameter["createTime"]
                delete tSysParameter["modifyBy"]
                delete tSysParameter["modifyTime"]
                that.$http.put(QK.SERVER_URL+'/api/system', tSysParameter, true).then(function (data) {
                  var data = jQuery.parseJSON(data.body)
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                   that.$router.go({path:'/system/parameter/list'})
                  }
                })
              }
              return false
         },
       getInfo:function() {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL+'/api/system/'+id, true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("tSysParameter", data.data)
              }
           })
        },
        cancelMethod(){
           this.$router.go({path:localStorage.nowurl})
      }
    }
  }
</script>
