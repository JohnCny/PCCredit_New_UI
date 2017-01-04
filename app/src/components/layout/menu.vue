<template>
  <!--侧导航 start-->
  <ul class="nav nav-pills nav-stacked custom-nav"  id="leftNav">
    <li class="active"><a href="index.html"><i class="fa fa-home"></i> <span>我的工作台</span></a></li>
    <li class="menu-list"><a href=""><i class="fa fa-laptop"></i> <span>客户管理</span></a>
      <ul class="sub-menu-list">
        <li><a href="blank_page.html"> 新建客户</a></li>
        <li><a href="boxed_view.html"> 客户信息查询</a></li>
        <li><a href="leftmenu_collapsed_view.html"> 客户维护</a></li>
        <li><a href="horizontal_menu.html"> 客户移交</a></li>
      </ul>
    </li>
    <li><a href="login.html"><i class="fa fa-sign-in"></i> <span>Login Page</span></a></li>
  </ul>
  <!--侧导航 end-->
</template>
<style scoped>
    body{
        background-color:#ff0000;
    }
</style>

<script>
  import QK from '../../QK'
  export default{
    components: {

    },
     data(){
      return {
        menuList: [],
      }
    },
    ready: function () {
      this.showMenu()
    },
    methods: {
      showMenu: function () {
      var that = this
        that.$http.get(QK.SERVER_URL+'/api/menu/all').then(function(res){
          var data = $.parseJSON(res.body)
          console.log(data)
        })
      }
    }
  }

</script>
