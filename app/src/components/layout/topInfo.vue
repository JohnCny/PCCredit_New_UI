<template>
  <li>
    <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <img v-bind:src="userProfile" alt=""/>
      ${userCname}
      <span v-if="roleType == 1">（超级管理员）</span>
      <template v-else>
        <span v-if="roleType == 2">（管理员）</span>
        <template v-else>
          <span v-if="roleType == 3">（客户经理）</span>
          <template v-else>
            <span v-if="roleType == 4">（专家）</span>
          </template>
        </template>
      </template>
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
      <li><a v-on:click="personalInfo"><i class="fa fa-user"></i> 个人中心</a></li>
      <li><a v-on:click="personalInfoSet"><i class="fa fa-cog"></i> 个人设置</a></li>
      <li><a v-on:click="changePwd"><i class="fa fa-edit"></i> 修改密码</a></li>
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
        userCname:'',
        userProfile:'',
        roleType:''
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        this.$set('userCname', JSON.parse(localStorage.user).user["userCname"])
        this.$set('roleType', JSON.parse(localStorage.user).roleType)
        var urlStr = JSON.parse(localStorage.user).user["userProfile"]
        //this.$set('userProfile', QK.SERVER_URL+ '' + urlStr)
         this.$set('userProfile', document.location.protocol + '//192.168.1.118:8091' + urlStr)
      },
      personalInfo: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/user/personal'})
      },
      personalInfoSet: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/user/personalSet'})
      },
      changePwd: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/user/changePass'})
      },
      logout: function () {
        var that = this
        //发送请求
        that.$http.get(QK.SERVER_URL + '/api/logon/logout', true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            this.$router.go({path: '/login'})
          } else {
            alert("退出失败")
          }
        })
      },
    }
  }
</script>
