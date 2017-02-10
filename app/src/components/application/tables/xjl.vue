<template>
  <table class="table table-bordered" id="xjlTable">
    <thead>
    现金流
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
    QK.vector.$on('getfromchild', this.init)
  },
  beforeDestroy: function () {
    QK.vector.$off('getfromchild', this.init)
  },
  methods: {
    init:function(varsArr) {
      var that = this
      var menuid = $("#menu1").find("li.active").data("menuid")
      $(varsArr).each(function(i,v){
        if($(v)[0].groupId == menuid){
          that.$set("vars",$(v))
        }
      })
    },
  }
}

</script>
