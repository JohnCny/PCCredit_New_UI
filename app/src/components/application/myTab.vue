<style src='../../../static/css/Tabs.css'></style>
<template>
  <ul class="myTab">
    <template v-for="todo in infoData">
      <li v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
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
</style>
<script>
  import QK from '../../QK'
  export default{
    data(){
      return {
        infoData: [
          {id: 'sqcp', text: '选择申请产品', classname: 'stepActiveL'},
          {id: 'xzkh', text: '选择申请客户', classname: 'xzkhNormal'},
          {id: 'sqb', text: '填写申请表', classname: 'sqbNormal'},
          {id: 'ipc', text: '填写IPC调查报告', classname: 'ipcNormal'},
          {id: 'dctp', text: '上传调查图片', classname: 'dctpNormal'},
          {id: 'zxbg', text: '上传征信报告', classname: 'zxbgNormal'},
          {id: 'xxzl', text: '信息总览', classname: 'stepLast'}
        ]
      }
    },
    methods: {
    }
  }
</script>
