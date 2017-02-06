<style src='../../../static/css/Tabs.css'></style>
<template>
  <ul class="myTab">
    <template v-for="todo in infoData">
      <li v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
  <section class="panel">
    <header class="panel-heading custom-tab">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#home3">
            <i class="fa fa-user"></i>
            个人客户列表
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#about3">
            <i class="fa fa-university"></i>
            企业客户列表
          </a>
        </li>
      </ul>
    </header>
    <div class="panel-body">
      <div class="tab-content">
        <div id="home3" class="tab-pane active">
          <select-person-cus></select-person-cus>
        </div>
        <div id="about3" class="tab-pane">
          <select-team-cus></select-team-cus>
        </div>
      </div>
    </div>
  </section>
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
    import myTab from './myTab.vue'
    import selectPersonCus from './selectPersonCus.vue'
    import selectTeamCus from './selectTeamCus.vue'
    export default{
        data(){
            return{
            todo: {
                text: ''
            },
            infoData: [
                {id: 'sqcp', text: '选择申请产品', classname: 'stepActiveL'},
                {id: 'xzkh', text: '选择申请客户', classname: 'stepActive'},
                {id: 'sqb', text: '填写申请表', classname: 'stepNormal'},
                {id: 'ipc', text: '填写IPC调查报告', classname: 'stepNormal'},
                {id: 'dctp', text: '上传调查图片', classname: 'stepNormal'},
                {id: 'zxbg', text: '上传征信报告', classname: 'stepNormal'},
                {id: 'xxzl', text: '信息总览', classname: 'stepLast'}
              ]
            }
        },
        ready: function () {
           this.initActive()
        },

        initActive: function(){
           $(".xzkhNormal").css({"background":"url(../../../static/images/stepActive.png) no-repeat left center","color":"#fff"})
      },
        components: {
            selectPersonCus,
            selectTeamCus,
            myTab
        }
    }
</script>
