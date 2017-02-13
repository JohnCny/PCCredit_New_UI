<template>
  <table class="table table-bordered" id="xjlTable">
    <thead>
    <tr>
      <template v-for="var in vars">
        <template v-for="temp in var.vars">
        <th>${temp.templateVarName}</th>
        <th><input style="width:100px" class="form-control" type="text" v-model="temp.varMonthOne" @blur="updataMon(temp)" placeholder="2016年6月"/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthTwo" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthThree" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthFour" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthFive" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthSix" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthSeven" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthEight" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthNine" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthTen" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthEleven" readonly/></th>
        <th><input class="form-control" type="text" v-model="temp.varMonthTwelve" readonly/></th>
        <th>调查当月（至<input style="width:30px" class="form-control" type="text" v-model="temp.varSurveyCurrentMonth" @change="updataValue(temp)"/>日）</th>
      </template>
     </template>
      <th>合计</th>
      <th>月平均</th>
    </tr>
    </thead>
    <tbody>
      <template v-for="var in vars">
        <template v-for="temp in var.vars">
          <template v-for="info in temp.vars">
          <tr>
            <td v-if="info.vars.length>0" style="text-align:left;font-weight:bold" v-bind:data-id="info.templateVarId">${info.templateVarName}</td>
            <td v-else  style="text-align:right;font-weight:bold" v-bind:data-id="info.templateVarId">${info.templateVarName}</td>
            <td><input class="form-control" type="text" v-model="info.varMonthOne" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthTwo" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthThree" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthFour" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthFive" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthSix" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthSeven" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthEight" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthNine" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthTen" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthEleven" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varMonthTwelve" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varSurveyCurrentMonth" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varCrossValidateAll" readonly/></td>
            <td><input class="form-control" type="text" v-model="info.varCrossValidateMonthAvg" readonly /></td>
          </tr>
            <template v-for="tempInfo in info.vars">
              <tr>
                <td v-if="tempInfo.vars.length>0"  style="text-align:left;font-weight:bold" v-bind:data-id="tempInfo.templateVarId">${tempInfo.templateVarName}</td>
                <td v-else v-bind:data-id="tempInfo.templateVarId"  style="text-align:left">${tempInfo.templateVarName}</td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthOne" readonly/></td>
                <td v-else ><input class="form-control" type="text" v-model="tempInfo.varMonthOne" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthTwo" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthTwo"  @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthThree" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthThree"  @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthFour" readonly/></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthFour" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthFive" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthFive" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthSix" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthSix" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthSeven" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthSeven" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthEight" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthEight" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthNine" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthNine" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthTen" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthTen" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthEleven" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthEleven" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varMonthTwelve" readonly /></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varMonthTwelve" @blur="updataValue(tempInfo)"/></td>
                <td v-if="tempInfo.vars.length>0"><input class="form-control" type="text" v-model="tempInfo.varSurveyCurrentMonth" readonly/></td>
                <td v-else><input class="form-control" type="text" v-model="tempInfo.varSurveyCurrentMonth" @blur="updataValue(tempInfo)"/></td>
                <td><input class="form-control" type="text" v-model="tempInfo.varCrossValidateAll" readonly/></td>
                <td><input class="form-control" type="text" v-model="tempInfo.varCrossValidateMonthAvg" readonly /></td>
              </tr>
              <template v-for="mini in tempInfo.vars">
                <tr>
                  <td v-if="mini.vars.length>0"  style="text-align:left;font-weight:bold" v-bind:data-id="mini.templateVarId">${mini.templateVarName}</td>
                  <td v-else v-bind:data-id="mini.templateVarId" style="text-align:left">${mini.templateVarName}</td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthOne" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthTwo" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthThree" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthFour" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthFive" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthSix" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthSeven" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthEight" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthNine" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthTen" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthEleven" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varMonthTwelve" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varSurveyCurrentMonth" @change="updataValue(mini)"/></td>
                  <td><input class="form-control" type="text" v-model="mini.varCrossValidateAll" readonly/></td>
                  <td><input class="form-control" type="text" v-model="mini.varCrossValidateMonthAvg" readonly /></td>
                </tr>
              </template>
            </template>
          </template>
        </template>
      </template>
    </tbody>
  </table>
</template>
<style scope>
  #xjlTable{
    width:110%
  }
  #xjlTable td{
    padding:5px
  }
  #xjlTable input{
    width:90px;
    display:inline-block;
    height:24px;
    padding: 2px;
  }
</style>
<script>
import QK from '../../../QK'
export default{
  data(){
    return{
      vars:[],
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
        if($(v)[0].groupName == "现金流表"){
          that.$set("vars",$(v))
        }
      })
    },
    updataValue: function(data){
      var that = this
      data.ipcCRUDType = 3
      that.$http.put(QK.SERVER_URL + '/api/application/ipc',data, true).then(function (data) {
        var data = $.parseJSON(data.body)
        var result = QK.getStateCode(that, data.code)
        if (result.state) {
          console.log("更新成功")
        }
      })
    },
    updataMon: function(data){
      var that = this
      var time = $(event.currentTarget).val()
      if(time.indexOf("年")==-1){
        swal({
          title: " ",
          text: "请输入正确的日期！",
          confirmButtonColor: "#EF5350",
          type: "error"
        })
        return
      }
      var timeArr = time.split('年')
      for (var i = 0; i < timeArr.length-1; i++) {
        if (isNaN(parseInt(timeArr[i])) && timeArr.length!=2) {
          swal({
            title: " ",
            text: "请输入正确的日期！",
            confirmButtonColor: "#EF5350",
            type: "error"
          })
          return
        }
      }
      var year = parseInt(timeArr[0])
      var month = parseInt(timeArr[1])
      var arr = $(event.currentTarget).parents("tr").find("input")
      var newArr = []
      for(var i=0;i<arr.length-1;i++){
        if (month <= 12) {
          var value = year + '年' + month + '月'
        } else {
          var value = (year + 1) + '年' + (month % 12) + '月'
        }
        month = month + 1
        newArr.push(value)
      }
      var arrKey = ["varMonthOne","varMonthTwo","varMonthThree","varMonthFour","varMonthFive","varMonthSix","varMonthSeven","varMonthEight","varMonthNine","varMonthTen","varMonthEleven","varMonthTwelve"]
      for(var i=0;i<arr.length;i++){
        data[arrKey[i]] = newArr[i]
      }
      data.ipcCRUDType = 3
      that.$http.put(QK.SERVER_URL + '/api/application/ipc',data, true).then(function (data) {
        var data = $.parseJSON(data.body)
        var result = QK.getStateCode(that, data.code)
        if (result.state) {
          console.log("更新成功")
        }
      })
    },
  }
}
</script>
