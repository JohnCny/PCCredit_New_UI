<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          数据字典编辑
        </header>
        <div class="panel-body">
          <form id="dict_edit" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="dataType">字典类别：</label>
                  <div class="input-icon right">
                    <input v-model="dataDictionary.dataType" id="dataType" type="text" class="form-control" name="dataType">
                    <div class="message">${errors.dataTypeError}</div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="dataCode">字典代码：</label>
                  <div class="input-icon right">
                    <input v-model="dataDictionary.dataCode" id="dataCode" type="text" class="form-control" name="dataCode">
                    <div class="message">${errors.dataCodeError}</div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="dataName">字典名称：</label>
                  <div class="input-icon right">
                    <input v-model="dataDictionary.dataName" id="dataName" type="text" class="form-control" name="dataName">
                    <div class="message">${errors.userCnameError}</div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="bankCode">银行代码：</label>
                  <div class="input-icon right">
                    <input v-model="dataDictionary.bankCode" id="bankCode" type="text" class="form-control" name="bankCode">
                    <div class="message">${errors.userCnameError}</div>
                  </div>
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-md-12">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a v-on:click="cancelMethod" type="reset" class="btn btn-default">取消</a>
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
    export default{
        data:function(){
           return {
                dataDictionary:{
                  dataType: '',
                  dataCode: '',
                  dataName: '',
                  bankCode: ''
                },
                errors:{
                  dataTypeError: '',
                  dataCodeError: '',
                  dataNameError: '',
                  bankCodeError: ''
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
              id: "#dict_edit",
              rulesMap:{
                dataType:{required: !0},
                dataCode:{required: !0},
                dataName:{required: !0},
                bankCode:{required: !0}
                }
            })
            //验证结果  true  false
            if(bool){
              that.$http.put(QK.SERVER_URL+'/api/dataDictionary', that.dataDictionary, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                 console.log(data)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                  that.$router.go({path:"/system/dictionary/list"})
                }
              })
            }
            return false
          },
          init:function() {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL+'/api/dataDictionary/'+id, true).then(function (data) {
              var data = jQuery.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("dataDictionary", data.data)
              }
            })
           },
           cancelMethod(){
           this.$router.go({path:localStorage.nowurl})
      }
    }
 }
</script>
