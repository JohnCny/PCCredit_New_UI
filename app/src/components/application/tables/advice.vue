<template>
  <table class="table table-bordered" id="advice">
    <template v-for="var in vars">
      <template v-for="item in var.groups">
        <thead>
        <tr>
          <th colspan="2">${item.groupName}</th>
        </tr>
        </thead>
        <template v-for="tempGroups in item.groups">
          <tr>
            <td style="padding-left:20px;width:40%">${tempGroups.groupName}</td>
            <td></td>
          </tr>
          <template v-for="tempGroup in tempGroups.vars">
            <tr>
              <td style="padding-left:40px;width:40%">${tempGroup.templateVarName}</td>
              <td>
                <select v-if="tempGroup.options.length>0" class="form-control" @change="updateValue(tempGroup)">
                  <option value="-1">--请选择--</option>
                  <template v-for="var in tempGroup.options">
                     <option v-bind::value="var.templateVarOptionId">${var.templateVarOptionName}</option>
                  </template>
                </select>
                <input v-else class="form-control" v-model="tempGroup.templateVarValue" @change="updateValue(tempGroup)"/>
              </td>
            </tr>
          </template>
        </template>
        <template v-for="tempVars in item.vars">
          <tr>
            <td style="padding-left:20px;width:40%">${tempVars.templateVarName}</td>
            <td>
              <select v-if="tempVars.options.length>0" class="form-control" @change="updateValue(tempVars)">
                <option value="-1">--请选择--</option>
              <template v-for="var in tempVars.options">
                <option v-bind::value="var.templateVarOptionId">${var.templateVarOptionName}</option>
              </template>
              </select>
              <input v-else class="form-control" v-model="tempVars.templateVarValue" @change="updateValue(tempVars)"/>
          </tr>
          <template v-for="tempVar in tempVars.vars">
            <tr>
              <td style="padding-left:40px;width:40%">${tempVar.templateVarName}</td>
              <td>
                <select v-if="tempVar.options.length>0" class="form-control" @change="updateValue(tempVar)">
                  <option value="-1">--请选择--</option>
                  <template v-for="var in tempVar.options">
                    <option v-bind:value="var.templateVarOptionId">${var.templateVarOptionName}</option>
                  </template>
                </select>
                <input v-else class="form-control" v-model="tempVar.templateVarValue" @change="updateValue(tempVar)"/>
              </td>
            </tr>
          </template>
        </template>
      </template>
    </template>
  </table>
</template>
<style scope>
  #advice{
    width:90%;
    margin:20px auto
  }
  #advice th,#advice td{
    border:1px solid #ddd;
    height:40px
  }
  #advice input,#advice select{
    width:auto;
    height:24px;
    padding:2px;
    margin-left:10px
  }
</style>
<script>
import QK from '../../../QK'
export default{
  data(){
    return{
      vars:[],
      sendData:{}
    }
  },
  ready :function(){

  },
  created: function () {
    QK.vector.$on('getfromcwbb', this.init)
  },
  beforeDestroy: function () {
    QK.vector.$off('getfromcwbb', this.init)
  },
  methods: {
    init:function(varsArr) {
      var that = this
      $(varsArr).each(function(i,v){
        if($(v)[0].groupName == "建议"){
          that.$set("vars",$(v))
        }
      })
    },
    updateValue: function(data){
      var that = this
      that.$set("sendData.templateVarId",data.templateVarId)
      that.$set("sendData.templateVarValue",$(event.currentTarget).val())
      that.$set("sendData.ipcCRUDType",1)
      that.$set("sendData.applicationId",that.$route.params.appliId)
      that.$http.put(QK.SERVER_URL + '/api/application/ipc',that.sendData, true).then(function (data) {
        var data = $.parseJSON(data.body)
        var result = QK.getStateCode(that, data.code)
        if (result.state) {
          console.log("更新成功！")
        }
      })
    }
  }
}

</script>
