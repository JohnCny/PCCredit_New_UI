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
                         <option value="" id="${cus.id}">${cus.name}</option>
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
            <!-- <table style="margin-top:-20px;padding-top:20px;">
                 <tr>
                     <td style="float:none;width:10%;text-align:right;padding-right:10px;">移交原因：</td>
                     <td id="reason"><input type="text" id = "reso"/></td>
                 </tr>
             </table>-->
            <div class="col-xs-12 col-md-3  col-md-offset-1 contain" style="margin-top: 50px;margin-left:200px;">
              <button id="btn_submit" class="btn btn-success">确定</button>
              <a href="/system/customer/list" type="reset" class="btn btn-default">取消</a>
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
        queryCustomer: [{
           id: '',
           name: '',
           selectedIndex: ''
        }]
      }
    },
        ready:function(){
          this.transfer()
          this.trans()
        },
        methods:{
         addroles:function(id1,id2){
            var select=document.getElementById(id1)
            var roles=document.getElementById(id2)
            if(select.selectedIndex!=-1){//选取值不为空时执行
                $("<option id='"+ select.options[select.selectedIndex].id+"'>"+select.options[select.selectedIndex].text+"</option>").appendTo("#"+id2); //添加option项
                $("#"+id1+" option:selected").remove();
            }
            else
                alert("请先选择职能，然后再添加！！");
        },

            trans:function(){
                  var that = this
                  that.$http.get(QK.SERVER_URL+'/api/customerTransfer', true).then(function (data) {
                    var data = $.parseJSON(data.body);
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                    that.$set("queryCustomer", data.data)
                  }
              })
            },

            transfer:function(){
                  var that = this
                   var obj={}
                    $("#btn_submit").click(function () {
                        var id = $("#yjkh option")
                        var arrAjax = ""
                        $.each(id,function (i,item) {
                            if (!i) {
                                arrAjax += item.id;
                            } else {
                                arrAjax += "," + item.id
                            }
                        })
                        obj.customerIds = arrAjax
                        //var reaso = $("#reso").val()
                        //obj.reason = reason
                        that.$http.put(QK.SERVER_URL+'/api/customerTransfer', true).then(function (data) {
                        var data = $.parseJSON(data.body);
                        var result = QK.getStateCode(that, data.code)
                           if (result.state) {
                              this.$router.go({path:'/system'})
                        }
                    })
                  })
               }
             }
          }
    </script>

