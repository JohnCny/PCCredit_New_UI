<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          企业客户
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
                  <select name="" multiple="multiple" size="10" id="xyqykh" style="width: 80%; margin-left: 5%;height:200px;">
                    <template v-for="cus in queryCustomer">
                      <option value="${cus.id}" id="${cus.id}">${cus.name}</option>
                    </template>
                  </select>
                </td>
                <td>
                  <input type="button" class="edit info" value=">>" v-on:click="addroles('xyqykh','yjqykh')" style="width:70px;margin-left:-15px;"><br>
                  <input type="button" class="edit info" value="<<" v-on:click="addroles('yjqykh','xyqykh')" style="width:70px;margin-left:-15px;">
                </td>
                <td>
                  <select multiple="multiple" size="10" style="width:80%;margin-left: 5%" id="yjqykh" name="roles">

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
              <button id="btn_submit" class="btn btn-success" @click="transfer">确定</button>
              <a @click="cancleMethod()" class="btn btn-default">取消</a>
            </div>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
    import QK from '../../QK'
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
                }],
                sendData: {}
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
                }else{
                    alert("请先选择企业客户，然后再添加！！")
                }
            },
            manage:function(){
                var that = this
                that.$http.get(QK.SERVER_URL+'/api/customerManager/pageList', true).then(function (data) {
                    var data = $.parseJSON(data.body)
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                        that.$set("managerList", data.data)
                        var arr = []
                        for(var i=0;i<that.managerList.length;i++){
                            if(JSON.parse(localStorage.user).user.id != that.managerList[i].userId){
                                arr.push(that.managerList[i])
                            }
                        }
                        that.$set("managerList",arr)
                    }
                })
            },
            trans:function(){
                var that = this
                that.$http.get(QK.SERVER_URL+'/api/customerTransfer/list/1', true).then(function (data) {
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
                var ids = $("#yjqykh option")
                var arrAjax = ""
                $.each(ids,function (i,item) {
                    if (!i) {
                        arrAjax += item.id
                    } else {
                        arrAjax += "," + item.id
                    }
                })
                obj.customerIds = arrAjax
                if(that.reso.length>0){
                    var sendData = {
                        customerIds:arrAjax,
                        reason:that.reso,
                        managerId:that.manager,
                        customerType:1
                    }
                    that.$set("sendData",sendData)
                    that.$http.put(QK.SERVER_URL+'/api/customerTransfer',that.sendData, true).then(function (data) {
                        var data = $.parseJSON(data.body)
                        var result = QK.getStateCode(that, data.code)
                        if (result.state) {
                            swal({
                              title: "移交成功!",
                              text: "",
                              confirmButtonColor: "#66BB6A",
                              type: "success",
                              confirmButtonText : '确定'
                            },
                            function(){
                                that.$router.go({path:localStorage.nowurl})
                            })
                        }else{
                            swal({
                                title: "移交失败！",
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
                }else{
                    swal({
                        title: "",
                        text: "请填写移交原因！",
                        confirmButtonColor: "#EF5350",
                        type: "error",
                        confirmButtonText : '确定'
                    })
                }
            },
            cancleMethod: function(){
                this.$router.go({path:localStorage.nowurl})
            }
        }
    }
</script>

