<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          系统参数配置浏览
          <span class="tools pull-right">
             </span>
        </header>

        <div class="panel-body">
          <div class="table-responsive">
            <table id="example" class="table table-bordered">
              <thead>
              <tr>
                <th>参数名称</th>
                <th>参数值</th>
                <th>参数中文名</th>
                <th>参数描述</th>
                <th>创建人</th>
                <th>创建时间</th>
                <th>修改人</th>
                <th>修改时间</th>
                <th>操作</th>
              </tr>
              </thead>
              <tr v-for="info in infos">
                <td>${info.parameterName}</td>
                <td>${info.parameterValue}</td>
                <td>${info.parameterNameZn}</td>
                <td>${info.parameterDescription}</td>
                <td>${info.createBy}</td>
                <td>${info.createTime}</td>
                <td>${info.modifyBy}</td>
                <td>${info.modifyTime}</td>
                <td><a class="btn btn-outline dark btn-xs blue"><i class="glyphicon glyphicon-pencil"></i> 编辑 </a></td>
              </tr>
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
          parameterName: '',
          parameterValue: '',
          parameterNameZn: ''
          parameterDescription: ''
          createBy: ''
          createTime: ''
          modifyBy: ''
          modifyTime: ''
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
          var data = jQuery.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      }
    }
  }
</script>
