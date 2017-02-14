<template>
  <table class="table table-bordered" id="advice">
    <template v-for="var in vars">
      <template v-for="item in var.groups">
        <thead>
        <tr>
          <th colspan="2">${item.groupName}</th>
        </tr>
        </thead>
        <template v-for="temp in item.vars">
          <tr>
            <td class="col-md-3">${temp.templateVarName}</td>
            <td class="col-md-3"><input class="form-control" v-model="temp.templateVarValue" /></td>
          </tr>
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
  #advice input{
    float:left;
    width:20%;
    height:24px
  }
  #advice img,#advice button{
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
      vars:[],
      changeData:{
        groupName: '',
        templateVarName: ''
      }
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
      //var menuid = $("#menu1").find("li.active").data("menuid")
      $(varsArr).each(function(i,v){
        if($(v)[0].groupName == "建议"){
          that.$set("vars",$(v))
        }
      })
      console.log(that.vars)
    },
  }
}

</script>
