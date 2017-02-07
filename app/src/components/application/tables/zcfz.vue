<template>
  <table class="table table-bordered">
    <template v-for="var in vars">
      <template v-for="item in var.groups">
        <thead>
        <tr>
          <th>${item.groupName}</th>
        </tr>
        </thead>
        <template v-for="temp in item.vars">
          <tr>
            <td>${temp.templateVarName}</td>
            <td><input name="tempValue" id="tempValue" v-on:change="updateValue" v-model="temp.templateVarValue"
                       data-id="${temp.applicationTemplateVarId}" value="${temp.templateVarValue}"/></td>
          </tr>
          <template v-for="info in temp.vars">
            <tr>
              <td class="col-lg-6 col-md-2 col-sm-4">${info.templateVarName}</td>
              <td><input name="tempVarValue" v-on:change="updateValue" id="tempVarValue"
                         data-id="${info.applicationTemplateVarId}" v-model="info.templateVarValue"
                         value="${info.templateVarValue}"/></td>
            </tr>
          </template>
        </template>
      </template>
    </template>
  </table>
</template>
<style scope>
aaa{
  float:left;
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
        }]
      }
    },
    ready :function(){
      this.init()
    },
    methods:{
      init:function() {
        var that = this
        var applicationId = that.$route.params.appliId
        var templateId = that.$route.params.templateId
        that.$http.get(QK.SERVER_URL+'/api/application/ipc/'+applicationId+'/'+templateId, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("vars", data.data)
          }
        })
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
