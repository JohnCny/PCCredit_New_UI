<style src='../../../static/css/Tabs.css'></style>
<template>
  <my-tab></my-tab>
  <customer-basic></customer-basic>
  <appli-table></appli-table>
</template>
<style scoped>
  .myTab li {
    width: 150px;
    float: left;
    text-align: center;
    list-style: none;
    line-height: 50px;
    margin-bottom: 10px;
  }

  .activePro {
    background-color: #dff0d8 !important;
    border: 1px solid
  }

  .stepActive {
    color: #fff;
    background: url(../../../static/images/stepActive.png) no-repeat left center;
  }

  .stepActiveL {
    color: #fff;
    background: url(../../../static/images/stepActiveL.png) no-repeat left center;
  }

  .stepActiveR {
    color: #fff;
    background: url(../../../static/images/stepActiveR.png) no-repeat left center;
  }

  .stepLast {
    background: url(../../../static/images/stepLast.png) no-repeat left center;
  }

  .stepNormal {
    background: url(../../../static/images/stepNormal.png) no-repeat left center;
  }
</style>
<script>
  import QK from '../../QK'
  import myTab from './myTab.vue'//导航
  import customerBasic from './customerBasic.vue'//客户基本信息
  import appliTable from './appliTable.vue'//申请表的填写(目前不需要)
  export default{
    components: {
        customerBasic,
        appliTable,
        myTab
      },
    data: function(){
      return {

      }
    },
    ready: function () {
      this.initActive()
    },
    methods: {
      initActive: function(){
        $(".xzkhNormal,.sqbNormal").css({"background":"url(../../../static/images/stepActive.png) no-repeat left center","color":"#fff"})
      }
    }
  }
</script>
