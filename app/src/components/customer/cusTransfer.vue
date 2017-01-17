<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户移交
        </header>
        <div class="panel-body">
          <div class="table-responsive col-md-offset-3" >
            <table class="center">
              <tr>
                <td style="width:45%"><b>现有客户</b></td>
                <td style="width:10%">&nbsp;</td>
                <td style="width:45%"><b>移交客户</b></td>
              </tr>
              <tr>
                <td>
                  <select name="" multiple="multiple" size="10" id="xykh" style="width: 80%; margin-left: 5%;height:200px;">
                      <template v-for="cus in queryCustomer">
                         <option value="${cus.id}" id="${cus.id}">${cus.name}</option>
                      </template>
                  </select>
                </td>
                <td>
                  <input type="button" class="edit info" value=">>" v-on:click="addroles('xykh','yjkh')" style="width:70px;margin-left:-15px;"><br>
                  <input type="button" class="edit info" value="<<" v-on:click="addroles('yjkh','xykh')" style="width:70px;margin-left:-15px;">
                </td>
                <td>
                  <select multiple="multiple" size="10" style="width:80%;margin-left: 5%" id="yjkh" name="roles">

                  </select>
                </td>
              </tr>
            </table>

            <form class="form-horizontal" role="form" style="margin-top:30px;">
              <div class="form-group">
                <label for="reso" class="col-sm-2 control-label">移交原因</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control"  name="reso" v-model="reso" id = "reso">
                </div>
              </div>
              <div class="form-group">
                <label for="manager" class="col-sm-2 control-label">客户经理列表</label>
                <div class="col-sm-3">
                  <select class="form-control" id="manager" v-model="manager">
                    <option value="">--请选择--</option>
                    <template v-for="manager in managerList">
                      <option  name="manager"  value="${manager.userId}">${manager.userCname}</option>
                    </template>
                  </select>
                </div>
              </div>
            </form>


            <div class="col-md-5 col-md-offset-2 contain" style="margin-top: 50px;">
              <button id="btn_submit" class="btn btn-success" v-on:click="transfer">确定</button>
              <a v-link={path:'/system/customer/list'}  type="reset" class="btn btn-default">取消</a>
            </div>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import QK from '../../QK'
  import jQuery from 'jquery'
  import $ from 'jquery'
   export default{
    data: function () {
      return {
           manager: '',
           reso: '',
        queryCustomer: [{
           id: '',
           name: '',
           selectedIndex: ''
        }],
        managerList:[{
           userId: '',
           userCname : ''
        }]
      }
    },
        ready:function(){
          this.trans()
          this.manage()
        },
        methods:{
         addroles:function(id1,id2){
            var select=document.getElementById(id1)
            var roles=document.getElementById(id2)
            if(select.selectedIndex!=-1){//选取值不为空时执行
                $("<option id='"+ select.options[select.selectedIndex].id+"'>"+select.options[select.selectedIndex].text+"</option>").appendTo("#"+id2)//添加option项
                $("#"+id1+" option:selected").remove()
            }
            else
                alert("请先选择职能，然后再添加！！")
        },

            manage:function(){
                  var that = this
                  that.$http.get(QK.SERVER_URL+'/api/customerManager/pageList', true).then(function (data) {
                    var data = $.parseJSON(data.body)
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                    that.$set("managerList", data.data)

                  }
              })
            },
            trans:function(){
                  var that = this
                  that.$http.get(QK.SERVER_URL+'/api/customerTransfer', true).then(function (data) {
                    var data = $.parseJSON(data.body)
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                    that.$set("queryCustomer", data.data)
                  }
              })
            },

            transfer:function(){
              var that = this
              var obj={}
              var id = $("#yjkh option")
              var arrAjax = ""
              $.each(id,function (i,item) {
                  if (!i) {
                      arrAjax += item.id
                  } else {
                      arrAjax += "," + item.id
                  }
              })
              obj.customerIds = arrAjax
              that.$http.put(QK.SERVER_URL+'/api/customerTransfer',{customerIds:arrAjax,reason:that.reso,managerId:that.manager}, true).then(function (data) {
              var data = $.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
                 if (result.state) {
                     swal({
                      title: "修改成功!",
                      text: "",
                      confirmButtonColor: "#66BB6A",
                      type: "success",
                      confirmButtonText : '确定'
                  },
                  function(){
                   document.location.reload()
                  })
              }else{
                    swal({
                      title: "修改失败！",
                      text: result.msg+"！",
                      confirmButtonColor: "#EF5350",
                      type: "error",
                      confirmButtonText : '确定'
                   },
                   function(){
                     document.location.reload()
                   })
              }

          })
       }
     }
  }
</script>

