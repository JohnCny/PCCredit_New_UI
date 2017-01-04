<template>
  <div class="visible-xs hidden-sm hidden-md hidden-lg">
    <div class="media logged-user">
      <img alt="" src="/static/images/photos/user-avatar.png" class="media-object">
      <div class="media-body">
        <h4><a href="#">John Doe</a></h4>
        <span>"Hello There..."</span>
      </div>
    </div>

    <h5 class="left-nav-title">Account Information</h5>
    <ul class="nav nav-pills nav-stacked custom-nav">
      <li><a href="#"><i class="fa fa-user"></i> <span>Profile</span></a></li>
      <li><a href="#"><i class="fa fa-cog"></i> <span>Settings</span></a></li>
      <li><a href="#"><i class="fa fa-sign-out"></i> <span>Sign Out</span></a></li>
    </ul>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
      ready:function () {
        this.init()
      },
      methods:{
        init: function(){
          //显示用户基本信息(头像/姓名/签名)
        }
      }
    }
</script>
