<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理列表
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <table id="customerManagerLevelList" class="table table-bordered">
              <thead>
              <tr>
                <th>级别名称	</th>
                <th>对应额度	</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.levelName}</td>
                <td>${info.levelCredit}</td>
                <td> <a class="btn btn-outline dark btn-xs blue"><i
                  class="glyphicon glyphicon-pencil"></i> 管理 </a></td>
                <td><a title="删除" class="btn btn-outline dark btn-xs red delete"><i
                  class="glyphicon glyphicon-trash"></i> 删除 </a></td>
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
  import $ from 'jquery'
    export default{
        data:function(){
             return {
              infos: [{
                id: '',
                levelName: '',
                levelCredit: ''
              }],
            }
        },
        methods:{
         getInfos:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'', true).then(function (data) {
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
