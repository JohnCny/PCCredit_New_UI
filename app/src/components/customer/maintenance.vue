<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户维护
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <div id="dynamic-table_wrapper" class="dataTables_wrapper form-inline" role="grid">
              <div class="row-fluid">
                <div class="search">
                  <span>客户名称：<input type="text" class="short" name="cname" id="cname"></span>
                  <span>客户证件号码：<input type="text" name="certificateNumber" id="certificateNumber"></span>
                  <input class="searchBtn" type="button" value="搜 索">
                </div>
                <table id="example" class="table table-bordered">
                  <thead>
                  <tr>
                    <th>客户名称</th>
                    <th>客户证件号码</th>
                    <th>联系方式</th>
                    <th colspan="2">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="info in infos">
                    <td>${info.cname}</td>
                    <td>${info.certificateNumber}</td>
                    <td>${info.tel}</td>
                    <td><a class="btn btn-outline dark btn-xs blue"><i class="glyphicon glyphicon-pencil"></i> 新增 </a>
                    </td>
                    <td><a title="删除" class="btn btn-outline dark btn-xs red delete"><i
                      class="glyphicon glyphicon-trash"></i> 查看 </a></td>
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
</template>
<style>
</style>
<script>
  import QK from '../../QK.js'
  export default{
    data: function () {
      return {
        infos: [{
          cname: '',
          certificateNumber: '',
          tel: ''
        }],
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this;
        that.$http.get(QK.SERVER_URL + '/api/customerMaintenance/condition', true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that,data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      }
    }
  }
</script>
