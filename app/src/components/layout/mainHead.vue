<template>
  <div class="header-section">

    <!--侧导航开关 start-->
    <a class="toggle-btn"><i class="fa fa-bars"></i></a>
    <!--侧导航开关 end-->

    <!--顶部搜索 start-->
    <!--<div class="searchform">-->
      <!--<input type="text" class="form-control" name="keyword" placeholder="请输入···"/>-->
    <!--</div>-->
    <!--顶部搜索 end-->

    <!--消息通知 menu start -->
    <div class="menu-right">
      <ul class="notification-menu">
        <top-msg></top-msg>
        <top-info></top-info>
      </ul>
    </div>
    <!--消息通知 menu end -->

  </div>
</template>
<script>
  import TopMsg from './topMsg.vue'
  import TopInfo from './topInfo.vue'
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      TopMsg,
      TopInfo
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {

      }
    }
  }
</script>
