<template>
  <table class="table table-bordered" id="zcfzTable">
    <template v-for="var in vars">
      <template v-for="(index,item) in var.groups">
        <thead>
        <tr>
          <th colspan="2" style="text-align:left">${item.groupName}</th>
        </tr>
        </thead>
        <template v-for="temp in item.vars">
          <tr>
            <td style="width:40%;padding-left:20px;">${temp.templateVarName}</td>
            <td style="width:60%;padding-left:20px;">
              <template v-if="temp.templateVarInputType!=5">
                <input type="${temp.templateVarInputType | getType}" class="form-control" @change="updateValue(temp)" v-model="temp.templateVarValue" />
                <img @click="addRow(temp.extras)" src="../../../../static/images/add.png">
                <!--<img @click="delRow(temp.vars)" data-type="2" src="../../../../static/images/del.png">-->
              </template>
              <template v-else>
                <textarea class="form-control" @change="updateValue(temp)">${temp.templateVarValue}</textarea>
              </template>
            </td>
          </tr>
          <template v-for="mini in temp.extras">
            <tr>
              <td style="width:40%;padding-left:60px;">
                <input type="text" class="form-control" v-model="mini.templateVarExtraName"/>
              </td>
              <td style="width:60%;padding-left:20px">
                <input type="number" class="form-control" v-model="mini.templateVarExtraValue"/>
                <button @click="editExtra(mini,temp)" class="btn btn-success btn-xs">保存</button>
                <button @click="delRow(mini,temp.extras)" data-type="2" class="btn btn-warning btn-xs">删除</button>
              </td>
            </tr>
          </template>
          <template v-for="info in temp.vars">
            <tr>
              <td style="width:40%;padding-left:40px;">${info.templateVarName}</td>
              <td style="width:60%;padding-left:20px">
                <input type="${temp.templateVarInputType|getType}" step="${temp.templateVarInputType|getNumType}" class="form-control" @change="updateValue(info)" v-model="info.templateVarValue"/>
                <img @click="addRow(info.extras)" src="../../../../static/images/add.png">
                <!--<img @click="delRow(info.extras)" data-type="2" src="../../../../static/images/del.png">-->
              </td>
            </tr>
            <template v-for="mini in info.extras">
              <tr>
                <td style="width:40%;padding-left:60px;">
                  <input type="text" class="form-control" v-model="mini.templateVarExtraName"/>
                </td>
                <td style="width:60%;padding-left:20px">
                  <input type="number" class="form-control" v-model="mini.templateVarExtraValue"/>
                  <button @click="editExtra(mini,info)" class="btn btn-success btn-xs">保存</button>
                  <button @click="delRow(mini,info.extras)" data-type="2" class="btn btn-warning btn-xs">删除</button>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </template>
    </template>
  </table>
</template>
<style scope>
  #zcfzTable{
    width:90%;
    margin:20px auto
  }
  #zcfzTable th,#zcfzTable td{
    border:1px solid #ddd;
    height:40px
  }
  #zcfzTable input{
    float:left;
    width:40%;
    height:24px
  }
  #zcfzTable img,#zcfzTable button{
    float:left;
    margin-left:5px;
    height:20px
  }
</style>
<script>
  import QK from '../../../QK'
  export default{
    data(){
      return{
        vars:[{
          groupName:''  ,
          templateVarName: '',
          templateVarValue: '',
          applicationTemplateVarId: '',
          groups:[{
            groupName:''
          }]
        }],
        addSendData: {ipcCRUDType:2,applicationId:'',templateVarId:'',templateVarExtraName:'',templateVarExtraValue:''}
      }
    },
    ready :function(){
      //this.init()
    },
    created: function () {
      QK.vector.$on('getfromchild', this.init)
    },
    beforeDestroy: function () {
      QK.vector.$off('getfromchild', this.init)
    },
    methods:{
      init:function(vars) {
        var that = this
        that.$set("vars", vars)
      },
      addRow: function(row){
        row.push({})
      },
      delRow: function(mini,info){
        var that = this,ipcCRUDType=$(event.currentTarget).data("type")
        if(ipcCRUDType == 2){
          that.$http.delete(QK.SERVER_URL + '/api/application/ipc?ipcCRUDType='+ipcCRUDType+'&extraVarId='+mini.extraVarId,true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              info.pop()
            }
          })
        }else{
          that.$http.delete(QK.SERVER_URL + '/api/application/ipc?ipcCRUDType='+ipcCRUDType+'&applicationTemplateVarId='+mini.applicationTemplateVarId,true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              info.pop()
            }
          })
        }
      },
      //新增一行数据
      addRowData: function(info){
        var that = this
        var inputs = $(event.currentTarget).parents("tr").find("input")
        that.$set("addSendData.applicationId",that.$route.params.appliId)
        that.$set("addSendData.templateVarId",info.templateVarId)
        that.$set("addSendData.templateVarExtraName",$(inputs[0]).val())
        that.$set("addSendData.templateVarExtraValue",$(inputs[1]).val())
        that.$http.post(QK.SERVER_URL + '/api/application/ipc',that.addSendData, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            alert("新增成功")
          }else{
            alert("新增失败")
          }
        })
      },
      //更新新增子项
      editRowData: function(mini){
        var that = this
        var sendData = {
          "ipcCRUDType" : 2,
          "extraVarId" : mini.extraVarId,
          "templateVarExtraName" : mini.templateVarExtraName,
          "templateVarExtraValue" : mini.templateVarExtraValue
        }
        that.$http.put(QK.SERVER_URL + '/api/application/ipc',sendData, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            alert("更新成功")
          }
        })
      },
      //更新主项
      updateValue: function(info){
        var that = this
        var sendData = {
          "ipcCRUDType" : 1,
          "applicationTemplateVarId" : info.applicationTemplateVarId,
          "templateVarValue" : $(event.currentTarget).val()
        }
        that.$http.put(QK.SERVER_URL + '/api/application/ipc',sendData, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
          }
        })
      },
      editExtra: function(mini,info){
        //如果该行有id就执行新增一行数据方法  如果没有则执行更新新增子项方法
        if(mini.extraVarId){
          this.editRowData(mini)
        }else{
          this.addRowData(info)
        }
      }
    }
  }

</script>
