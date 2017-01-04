<template>
  <li>
    <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <img src="/static/images/photos/user-avatar.png" alt=""/>
      ${uname}
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
      <li><a href="#"><i class="fa fa-user"></i> 个人中心</a></li>
      <li><a href="#"><i class="fa fa-cog"></i> 个人设置</a></li>
      <li><a href="/logon/logout"><i class="fa fa-sign-out"></i> 注销</a></li>
    </ul>
  </li>
</template>
<script>
  export default{
    data(){
      return {
        uname: ''
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        this.uname = localStorage.user.roleNameZh
      }
    }
  }
</script>
