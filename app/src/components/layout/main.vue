<template>
  <div class="main-content" >

    <!-- 头部 start-->
    <main-head></main-head>
    <!-- 头部 end-->

    <!-- 面包屑 start-->
    <main-crumb></main-crumb>
    <!-- 面包屑 end-->

    <!--内容区域 start-->
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <!--内容区域 end-->

    <!--底部 start-->
    <footer  class="sticky-footer">
      2014-2016 &copy; All Rights Reserved.   <a target="_blank" href="http://www.qkjr.com.cn/">乾康（上海）金融信息服务股份有限公司</a>
    </footer>
    <!--底部 end-->
  </div>
</template>
<script>
    import MainHead from './mainHead.vue'
    import MainCrumb from './mainCrumb.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          MainHead,
          MainCrumb
        }
    }
</script>
