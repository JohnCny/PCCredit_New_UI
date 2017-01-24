<template>
  <div class="row" style="height:700px;">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户维护
        </header>
        <form class="form-horizontal" role="form"  @submit.prevent="handleSubmit" id="form_customerMain_new">
          <input type="hidden" name="id" id="id" v-model="tCustomerMaintenance.id" />
          <div class="form-group" style="margin-top:30px;">
            <label for="maintenanceType" class="col-sm-2 control-label">维护类型</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <select class="form-control"  v-model="tCustomerMaintenance.maintenanceType" >
                  <option value="">--请选择--</option>
                  <template v-for="type in maintenanceType">
                    <option  name="maintenanceType" id="maintenanceType" value="${type.id}">${type.value}</option>
                  </template>
                </select>
                <div class="message">${errors.maintenanceError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="height:150px;">
            <label for="maintennaceSummary" class="col-sm-2 control-label">维护纪要内容</label>
            <div class="col-sm-10">
              <div class="input-icon right">
                <textarea  name="maintennaceSummary" id="maintennaceSummary" v-model="tCustomerMaintenance.maintennaceSummary" class="form-control" style="width:45%;height:130px;"></textarea>
                <div class="message">${errors.maintennaceSummaryError}</div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-3 col-sm-10" style="margin-bottom:20px;">
              <button id="btn_submit" class="btn btn-success">确定</button>
              <a v-link="{path:'/system/customer/mainList'}" type="reset" class="btn btn-default">取消</a>
            </div>
          </div>
        </form>
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
               tCustomerMaintenance:{
                id: '',
                maintenanceType: '',
                maintennaceSummary: ''
             },
             maintenanceType:[{
                id: '',
                value: ''
             }],
             errors:{
                maintenanceError: '',
                maintennaceSummaryError: ''
              }
            }
        },
        ready:function(){
            QK.addMethod()
            this.type()
        },
        methods:{
         handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#form_customerMain_new",
          rulesMap: {
            maintenanceType: {required: !0, downList: !0},
            maintennaceSummary: {required: !0}
            }
        })
          //验证结果  true  false
           if (bool) {
            //发送请求
                var tCustomerMaintenance = that.tCustomerMaintenance
                var id = that.$route.params.id
                tCustomerMaintenance.id=id
                that.$http.post(QK.SERVER_URL+'/api/customerMaintenance',tCustomerMaintenance, true).then(function (data) {
                  var data = $.parseJSON(data.body)
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$router.go({path:'/system/customer/mainList'})
                  }
                })
              }
              return false
            },
            type:function() {
                var that = this
                that.$http.get(QK.SERVER_URL+'/api/customerMaintenance/maintenanceType', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("maintenanceType", data.data)
                  }
                })
              }
        }
    }
</script>
