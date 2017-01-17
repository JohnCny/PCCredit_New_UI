<template>
  <li>
    <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
      <i class="fa fa-bell-o"></i>
      <span class="badge" v-if="unreadMessagesCount">${unreadMessagesCount}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-head pull-right">
      <h5 class="title">消息列表</h5>
      <ul class="dropdown-list normal-list">
            <li class="new" v-for="msg in unreadMessages">
              <a v-link="{path:'/system/users/msg/'+msg.id}">
                <span class="details">
                  <span class="label label-danger">
                    <i class="fa fa-bolt"></i>
                  </span> ${msg.title} </span>
              </a>
        <li class="new"><a v-link={path:'/system/message/list'}>查看全部</a></li>
      </ul>
    </div>
  </li>
</template>
<script>
import QK from '../../QK'
  export default{
    data(){
      return {
       unreadMessagesCount: '',
       unreadMessages: [{
           id: '',
           title: ''
       }]
      }
    },
    ready: function () {
      this.getMsg()
    },
    methods: {
      getMsg: function () {
        var that = this
        that.$http.get(QK.SERVER_URL+'/api/message').then(function (data) {
          var data = jQuery.parseJSON(data.body)
          that.$set('unreadMessages', data.data)
            }, function (error) {
          console.log(error)
        })
      },
      message: function () {
        var that = this
        that.$http.get(QK.SERVER_URL+'/api/message?flag=0').then(function (data) {
          var data = jQuery.parseJSON(data.body)
          that.$set('unreadMessages', data.data)
            }, function (error) {
          console.log(error)
        })
      },
    }
  }
</script>
