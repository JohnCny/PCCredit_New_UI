<template>
  <li>
    <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
      <i class="fa fa-bell-o"></i>
      <span class="badge">4</span>
    </a>
    <div class="dropdown-menu dropdown-menu-head pull-right">
      <h5 class="title">消息列表</h5>
      <ul class="dropdown-list normal-list">
        <li class="new">
          <a href="">
            <span class="label label-danger"><i class="fa fa-bolt"></i></span>
            <span class="name">Server #1 overloaded.  </span>
            <em class="small">34 mins</em>
          </a>
        </li>
        <li class="new"><a href="">查看全部消息</a></li>
      </ul>
    </div>
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
