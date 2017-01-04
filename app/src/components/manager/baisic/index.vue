<template>
  <div class="row">
    <div class="col-sm-12">

      <section class="panel">
        <header class="panel-heading">
          客户经理列表
        </header>

        <div class="panel-body">
          <div class="table-responsive">
            <div id="dynamic-table_wrapper" class="dataTables_wrapper form-inline" role="grid">
              <div class="row-fluid">

                <div class="search" >
                  <span>客户经理名称：<input type="text" class="short" name="userCname" id="userCname" ></span>
                  <span>工号：<input type="text" name="employeeNumber" id="employeeNumber"></span>
                  <span>级别：
                        <select name="levelId" id="levelId">
                            <option id="-1" value="-1">所有级别</option>
                            <#list customerManagerLevel as cml>
                                <option id="${cml.id}" value="${cml.id}">${cml.value}</option>
                            </#list>
                        </select>
                    </span>
                  <input class="searchBtn" type="button" value="搜 索">
                </div>
                <table id="customerManagerList" class="table table-bordered" style="width: 100%" >
                  <thead>
                  <tr>
                    <th>客户经理</th>
                    <th>工号</th>
                    <th>当前级别	</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="info in infos">
                    <td>${info.userCname}</td>
                    <td>${info.employeeNumber}</td>
                    <td>${info.levelName}</td>
                    <td><a class="btn btn-outline dark btn-xs blue"><i class="glyphicon glyphicon-pencil"></i> 管理 </a></td>
                    <td><a title="删除" class="btn btn-outline dark btn-xs red delete"><i
                      class="glyphicon glyphicon-trash"></i> 删除 </a></td>
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
                userId: '',
                userCname: '',
                employeeNumber: '',
                levelName: ''
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
