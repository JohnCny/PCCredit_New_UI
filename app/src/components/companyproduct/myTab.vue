<style src='../../../static/css/Tabs.css'></style>
<template>
  <div class="row">
    <div class="col-md-12">
  <ul class="myTabs">
    <template v-for="todo in infoData">
      <li v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
  </div>
</template>
<style scoped>
  .myTabs{
    display:block
  }
  .myTabs li {
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
  .stepActiveL {
    color: #fff;
    background: url(../../../static/images/stepActiveL.png) no-repeat left center;
  }
  .xzkhNormal,.sqbNormal,.ipcNormal, .dctpNormal,.zxbgNormal{
    background: url(../../../static/images/stepNormal.png) no-repeat left center;
  }
  .stepLast {
    background: url(../../../static/images/stepLast.png) no-repeat left center;
  }
  .stepActiveR {
    color: #fff;
    background: url(../../../static/images/stepActiveR.png) no-repeat left center;
  }
</style>
<script>
  import QK from '../../QK'
  export default{
    data(){
      return {
        infoData: [
          {id: 'sqcp', text: '新增产品信息', classname: 'stepActiveL'},
          {id: 'xzkh', text: '配置产品审批流程', classname: 'xzkhNormal'},
          {id: 'sqb', text: '配置贷后监控规则', classname: 'sqbNormal'},
          {id: 'ipc', text: '配置风险属性', classname: 'ipcNormal'},
          {id: 'dctp', text: '完成', classname: 'stepLast'},
        ]
      }
    },
    methods: {
    }
  }
</script>
