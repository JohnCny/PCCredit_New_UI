<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户维护记录
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <div id="dynamic-table_wrapper" class="dataTables_wrapper form-inline" role="grid">
              <div class="row-fluid">
                <table id="example" class="table table-bordered">
                  <thead>
                  <tr>
                      <th>选择</th>
                      <th>维护类型</th>
                      <th>维护时间</th>
                      <th>维护人</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-on:click="showInfo(info,$index)" v-for="info in infos" >
                      <td><span class="hideInput"><input type="radio" name="radio0"><label class="radio"></label></span></td>
                      <td>${info.maintenanceType}</td>
                      <td>${info.operationTime}</td>
                      <td>${info.operationName  | isEmpty}</td>
                  </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  </div>

  <div id="message" class="row">
      <div class="report common" style="display:none" id="infor">
        <section class="panel">
          <header class="panel-heading">
            客户维护信息
          </header>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="form-group">
              <div class="control-label col-md-3 col-sm-3 col-xs-4">维护类型</div>
              <div class="col-md-9 col-sm-9 col-xs-8">
                ${temptCustomerMaintenance.maintenanceType}
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="form-group">
              <div class="control-label col-md-3 col-sm-3 col-xs-4">维护时间</div>
              <div class="col-md-9 col-sm-9 col-xs-8">
                ${temptCustomerMaintenance.operationTime}
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="form-group">
              <div class="control-label col-md-3 col-sm-3 col-xs-4">维护人</div>
              <div class="col-md-9 col-sm-9 col-xs-8">
                ${temptCustomerMaintenance.operationName | isEmpty}
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="form-group">
              <div class="control-label col-md-3 col-sm-3 col-xs-4">维护纪要</div>
              <div class="col-md-9 col-sm-9 col-xs-8">
                ${temptCustomerMaintenance.maintennaceSummary}
              </div>
            </div>
          </div>
        </section>
      </div>
  </div>
</template>
<style scoped>
      .radio{
          background:url(../../../static/images/radio.png) no-repeat left center;
          padding-left:30px;
          padding-right:10px;
          display:inline-block;
          line-height:24px;
          height:24px
      }
      .radio_a{
          background:url(../../../static/images/radio_a.png) no-repeat left center
      }
      .hideInput input{
         visibility:hidden
      }
      .center .radio{
          vertical-align:middle;
          padding-right:0
      }
</style>
<script>
    import QK from '../../QK.js'
    export default{
        data:function(){
             return {
              infos: [{
                  id: '',
                  maintenanceType: '',
                  operationTime: '',
                  operationName: ''
            }],
             temptCustomerMaintenance:{
                maintenanceType: '',
                operationTime: '',
                operationName: '',
                maintennaceSummary: ''
              }
           }
        },
        ready:function(){
            this.type()

        },
        methods:{
            type:function() {
                var that = this
                var id = that.$route.params.id
                that.$http.get(QK.SERVER_URL+'/api/customerMaintenance/'+id, true).then(function (data) {
                  var data = $.parseJSON(data.body)
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                  that.$set("infos", data.data)
                  }
               })
            },
            showInfo:function(info,index){
                var that = this
                var id = info.id
                that.$http.get(QK.SERVER_URL+'/api/customerMaintenance/'+id, true).then(function (data) {
                  var data = $.parseJSON(data.body)
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                   console.log(data.data)
                   that.$set("temptCustomerMaintenance", data.data[0])
                    $("#message #infor").eq(index-1).show()
                    $("#message #infor").eq(index-1).siblings().hide()
                    $(info).parent().find("").removeAttr("checked")
                    $(info).parent().find("label").attr("class", "radio")
                    $(info).find("input[type=radio]").attr("checked", "checked")
                    $(info).find("label").attr("class", "radio radio_a")

                  }
               })
            }
        }
    }
</script>
