<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          角色权限管理
        </header>
        <div class="panel-body">
          <div class="table-responsive" style="margin:50px auto; width:95%;">
            <table id="example" class="table table-bordered" style="width: 100%">
              <thead>
              <tr>
                <th>角色名称</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.roleName}</td>
                <td><a class="btn btn-outline dark btn-xs blue"><i class="glyphicon glyphicon-pencil"></i> 编辑 </a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
</style>
<script>
  export default{
    data: function () {
      return {
        infos: [{
          id: '',
          roleName: ''
        }],
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this;
        that.$http.get(QK.SERVER_URL + '', true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      }
    }
  }
</script>
