<template>
  <li>
    <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <img src="/static/images/photos/user-avatar.png" alt=""/>
      ${user.roleNameZh}
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
      <li><a v-on:click="personalInfo"><i class="fa fa-user"></i> 个人中心</a></li>
      <li><a href="#"><i class="fa fa-cog"></i> 个人设置</a></li>
      <li><a v-on:click="changePwd" ><i class="fa fa-edit"></i> 修改密码</a></li>
      <li><a v-on:click="logout"><i class="fa fa-sign-out"></i> 注销</a></li>
    </ul>
  </li>
</template>
<style></style>
<script>
import QK from '../../QK'
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
      },
      personalInfo: function(){
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path:'/system/user/personal'})
      },
      changePwd: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path:'/system/user/changePass'})
      },
      logout: function () {
        var that = this
        //发送请求
        that.$http.get(QK.SERVER_URL+'/api/logon/logout', true).then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(that,data.code)
          if (result.state) {
            this.$router.go({path:'/login'})
          }else{
            alert("退出失败")
          }
        })
      },
    }
  }
</script>
