<template>
  <table class="table table-bordered" id="jcjyTable">
    <thead>
      交叉检验
    </thead>

  </table>
</template>
<style scope>
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
      //var menuid = $("#menu1").find("li.active").data("menuid")
      $(varsArr).each(function(i,v){
        if($(v)[0].groupName == "交叉检验表"){
          that.$set("vars",$(v))
          console.log(that.vars)
        }
      })
      console.log(that.vars)
    },
  }
}

</script>
