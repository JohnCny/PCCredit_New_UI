<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理级别信息
        </header>
        <div class="panel-body">
          <form  id="managerLevelNew" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="collectionType">催收方式：</label>
                  <div class="input-icon right">
                    <select id="collectionType" type="text" name="collectionType" v-model="infos.collectionType" class="form-control">
                      <option value="-1" selected = "selected">--请选择--</option>
                      <option value="0">电话</option>
                      <option value="1">上门</option>
                      <option value="2">其他</option>
                    </select>
                    <div class="message">${errors.collectionTypeError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="collectionResult">催收结果：</label>
                  <div class="input-icon right">
                    <select id="collectionResult" type="text" name="collectionResult" v-model="infos.collectionResult" class="form-control">
                      <option value="-1" selected = "selected">--请选择--</option>
                      <option value="0">成功</option>
                      <option value="1">失败</option>
                      <option value="2">待定</option>
                      <option value="3">其他</option>
                    </select>
                    <div class="message">${errors.collectionResultError}</div>
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
                  collectionType: '',
                  collectionResult: '',
                  badCustomerId:''
                },
                errors:{
                  collectionTypeError: '',
                  collectionResultError: '',
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
                  collectionType:{required: !0,downList: !0},
                  collectionType:{required: !0,downList: !0},
              }
            })

            //验证结果  true  false
            if(bool){
              var id = that.$route.params.id
              that.infos.badCustomerId = id
              that.$http.post(QK.SERVER_URL+'/api/BadDebtCustomer', that.infos , true).then(function (data) {
                var id = that.$route.params.id
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                 if (result.state) {
                        var optionObj = {
                            'that' : that,
                            'title' : '成功!',
                            'listUrl' : '/system/loanafter/overduecus'
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
