<template>
  <li>
    <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <img src="/static/images/photos/user-avatar.png" alt=""/>
      John Doe
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
      <li><a href="#"><i class="fa fa-user"></i> Profile</a></li>
      <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
      <li><a href="/logon/logout"><i class="fa fa-sign-out"></i> Log Out</a></li>
    </ul>
  </li>
</template>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
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
