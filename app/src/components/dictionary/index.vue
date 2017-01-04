<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          数据字典列表
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <div id="dynamic-table_wrapper" class="dataTables_wrapper form-inline" role="grid">
              <div class="row-fluid">
                <div class="search">
                  <span>字典类别：<input type="text" class="form-control" aria-controls="dynamic-table" name="dataType" id="dataType"></span>
                  <span>数据字典代码： <input type="text" class="form-control" aria-controls="dynamic-table" name="dataCode" id="dataCode"></span>
                  <span>字典名称：<input type="text" class="form-control" aria-controls="dynamic-table" name="dataName" id="dataName"></span>
                  <input class="searchBtn" type="button" value="搜 索">
                </div>

                <table id="example" class="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>字典类别</th>
                    <th>字典代码</th>
                    <th>字典名称</th>
                    <th>银行代码</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="info in infos">
                    <td>${info.dataType}</td>
                    <td>${info.dataCode}</td>
                    <td>${info.dataName}</td>
                    <td>${info.bankCode}</td>
                    <td><a class="btn btn-outline dark btn-xs blue"><i class="glyphicon glyphicon-pencil"></i> 编辑 </a></td>
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
  import $ from 'jquery'
    export default{
        data:function(){
             return {
              infos: [{
                dataId: '',
                dataType: '',
                dataCode: '',
                dataName: '',
                bankCode: ''
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
