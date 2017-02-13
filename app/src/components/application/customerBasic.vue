<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          <i class="fa fa-th-list"></i>
          客户基本信息
        </header>
        <div class="panel-body" style="height:100px;">
          <div class="table-responsive">

            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.cname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.certificateNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.homeAddress | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.tel | isEmpty}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scope>
</style>
<script>
    import QK from '../../QK'
    export default{
        data: function(){
            return{
                tCustomerBasic: {
                cname: '',
                certificateNumber: '',
                homeAddress: '',
                tel: ''
              }
            }
        },
        ready: function(){
           this.init()
        },
        methods:{
          init: function () {
            var that = this
            var id = that.$route.params.customerId
            that.$http.get(QK.SERVER_URL + '/api/customerBasic/' + id, true).then(function (data) {
              var data = $.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("tCustomerBasic", data.data)
              }
            })
          }
        }
    }
</script>
