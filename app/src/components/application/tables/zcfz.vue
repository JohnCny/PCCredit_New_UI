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
                <input type="${temp.templateVarInputType | getType}" class="form-control" name="tempValue" v-on:change="updateValue" v-model="temp.templateVarValue" data-id="${temp.applicationTemplateVarId}"/>
                <template v-if="!temp.vars.length">
                  <img @click="addRow(temp)" src="../../../../static/images/add.png">
                  <img @click="delRow(temp)" src="../../../../static/images/del.png">
                </template>
            </td>
          </tr>
          <template v-for="info in temp.vars">
            <tr>
              <td style="width:40%;padding-left:40px;">${info.templateVarName}</td>
              <td style="width:60%;padding-left:20px">
                <input  type="${temp.templateVarInputType | getType}" class="form-control" name="tempVarValue" v-on:change="updateValue" data-id="${info.applicationTemplateVarId}" v-model="info.templateVarValue"/>
                <img @click="addRow(info)" src="../../../../static/images/add.png">
                <img @click="delRow(info)" src="../../../../static/images/del.png">
              </td>
            </tr>
            <template v-for="mini in info.vars">
              <tr>
                <td style="width:40%;padding-left:60px;">
                  <span></span>
                  <input type="text" class="form-control" name="templateVarExtraName" v-model="mini.templateVarExtraName"/>
                </td>
                <td style="width:60%;padding-left:20px">
                  <input type="${mini.templateVarInputType | getType}" class="form-control" name="templateVarExtraValue" data-id="${mini.applicationTemplateVarId}" v-model="mini.templateVarValue"/>
                  <button @click="updateAddRow(info)" class="btn btn-success btn-xs">保存</button>
                  <button @click="editAddRow()" class="btn btn-info btn-xs">编辑</button>
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
    line-height:40px
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
      this.init()
    },
    methods:{
      init:function() {
        var that = this
        var applicationId = that.$route.params.aId
        var templateId = that.$route.params.templateId
        that.$http.get(QK.SERVER_URL+'/api/application/ipc/'+applicationId+'/'+templateId, true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("vars", data.data)
          }
        })
      },
      addRow: function(row){
        row.vars.push({})
      },
      delRow: function(row){
        row.vars.pop()
      },
      updateAddRow: function(info){
        var that = this
        var inputs = $(event.currentTarget).parents("tr").find("input")
        that.$set("addSendData.applicationId",that.$route.params.aId)
        that.$set("addSendData.templateVarId",info.applicationTemplateVarId)
        that.$set("addSendData.templateVarExtraName",$(inputs[0]).val())
        that.$set("addSendData.templateVarExtraValue",$(inputs[1]).val())
        that.$http.post(QK.SERVER_URL + '/api/application/ipc',that.addSendData, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            $(event.currentTarget).hide()
            $(event.currentTarget).parents("tr").find("input").eq(0).hide()
            $(event.currentTarget).parents("tr").find("td").eq(0).find("span").html(that.addSendData.templateVarExtraName)
          }else{
            alert("新增失败")
          }
        })

      },
      editAddRow: function(){
        $(event.currentTarget).hide()
        $(event.currentTarget).parents("tr").find("input").eq(0).show()
        $(event.currentTarget).parents("tr").find("td").eq(0).find("span").html("")
      },
      updateValue: function(){
        var that = this
        var applicationTemplateVarId = $(event.currentTarget).data("id")
        var templateVarValue = $(event.currentTarget).val()
        that.$http.put(QK.SERVER_URL + '/api/application/ipc/normal',{applicationTemplateVarId:applicationTemplateVarId,templateVarValue:templateVarValue}, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
          }
        })
      }
    }
  }

</script>
