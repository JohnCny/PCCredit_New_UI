<template>
  <div class="left-side sticky-left-side">

    <!--logo and iconic logo start-->
    <div class="logo">
      <a href="index.html"><img src="/static/images/logo.png" alt=""></a>
    </div>

    <div class="logo-icon text-center">
      <a href="index.html"><img src="/static/images/logo_icon.png" alt=""></a>
    </div>
    <!--logo and iconic logo end-->

    <div class="left-side-inner">

      <!-- 隐藏的用户信息，在导航收缩后显示 only -->
      <visible></visible>

      <!--侧导航 start-->
      <menu></menu>
      <!--侧导航 end-->
    </div>
  </div>
</template>
<script>
  import Visible from './visible.vue'
  import Menu from './menu.vue'
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      Visible,
      Menu
    }
  }
</script>
