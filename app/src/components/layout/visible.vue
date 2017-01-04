<template>
  <div class="visible-xs hidden-sm hidden-md hidden-lg">
    <div class="media logged-user">
      <img alt="" src="/static/images/photos/user-avatar.png" class="media-object">
      <div class="media-body">
        <h4><a href="#">${user.roleNameZh}</a></h4>
      </div>
    </div>

    <h5 class="left-nav-title">账户信息</h5>
    <ul class="nav nav-pills nav-stacked custom-nav">
      <li><a href="#"><i class="fa fa-user"></i> <span>个人中心</span></a></li>
      <li><a href="#"><i class="fa fa-cog"></i> <span>个人设置</span></a></li>
      <li><a href="#"><i class="fa fa-sign-out"></i> <span>注销</span></a></li>
    </ul>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        user: {
          id: '',
          roleName:'',
          roleNameZh:''
        }
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        this.$set('user', JSON.parse(localStorage.user))
      }
    }
  }
</script>
