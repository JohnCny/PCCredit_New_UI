<style src='../../../static/css/Tabs.css'></style>
<template>
  <form class="content">
    <ul class="myTab">
      <template v-for="todo in infoData">
        <li @click="setTab2" :data-id="todo.id" :class="todo.classname">${todo.text}</li>
      </template>
    </ul>
    <!--*******************************************客户基本信息*******************************************************-->
    <div class="tabContent" id="jbxx">
      <show-basic></show-basic>
    </div>
    <!--*******************************************客户贷款情况*******************************************************-->
    <div class="tabContent" id="dkqk" style="display:none;">
      <show-dkqk></show-dkqk>
    </div>
    <!--*******************************************客户维护记录*******************************************************-->
    <div class="tabContent" id="khwhjl" style="display:none;">
      <show-khwh></show-khwh>
    </div>
    <!--*******************************************贷后监控记录*******************************************************-->
    <div class="tabContent" id="dhjkjl" style="display:none;">
      <show-dhjk></show-dhjk>
    </div>
    <!--*******************************************逾期/不良催收记录*******************************************************-->
    <div class="tabContent" id="csjl" style="display:none;">
      <show-yqbl></show-yqbl>
    </div>
    <!--*******************************************客户移交记录*******************************************************-->
    <div class="tabContent" id="yjjl" style="display:none;">
      <show-khyj></show-khyj>
    </div>
    <div class="row">
      <div class="col-md-12 col-md-offset-5" style="margin-top:30px;margin-bottom:20px;">
        <a @click="cancelMethod()" class="btn btn-success">返回</a>
      </div>
    </div>
  </form>
</template>
<style scoped>

</style>
<script>
  import QK from '../../QK'
  import ShowBasic from './showBasic.vue'
  import ShowDkqk from './showDkqk.vue'
  import ShowKhwh from './showKhwh.vue'
  import ShowDhjk from './showDhjk.vue'
  import ShowYqbl from './showYqbl.vue'
  import ShowKhyj from './showKhyj.vue'
  export default{
    data: function () {
      return {
        infoData: [
          {id: 'jbxx', text: '客户基本信息', classname: 'active'},
          {id: 'dkqk', text: '客户贷款情况', classname: ''},
          {id: 'khwhjl', text: '客户维护记录', classname: ''},
          {id: 'dhjkjl', text: '贷后监控记录', classname: ''},
          {id: 'csjl', text: '逾期/不良催收记录', classname: ''},
          {id: 'yjjl', text: '客户移交记录', classname: ''},
        ]
      }
    },
    ready: function () {
    },
    components: {
       'show-basic': ShowBasic,
       'show-dkqk': ShowDkqk,
       'show-khwh': ShowKhwh,
       'show-dhjk': ShowDhjk,
       'show-yqbl': ShowYqbl,
       'show-khyj': ShowKhyj
    },
    methods: {
      setTab2: function () {
        var that = this
        $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
        var id = $(event.currentTarget).data("id")
        $("#" + id).show().siblings("div.tabContent").hide()
      },
      cancelMethod(){
        this.$router.go({path: localStorage.nowurl})
      }
    }
  }

</script>
