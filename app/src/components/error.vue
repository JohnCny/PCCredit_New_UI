<template>
  <div class="wrap">
    <div class="container">
      <div class="leftimg">
        <img src="/static/images/${errcode}.png" alt="${errcode}-error">
      </div>
      <div class="rightcontent">
        <p style="font: 30px 微软雅黑;">sorry您没有访问权限</p>
        <p style="font: 18px 微软雅黑">您可以通过一下放是继续访问......</p>
        <div style="width: 273px;height: 60px;background: url(../../../static/images/base.png);color: #ffffff;font:34px 微软雅黑; text-align: center;margin-top: 15px;line-height: 55px" >返回首页</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
  }
  .container{
    width: 800px;
    height: 500px;
    left: 50%;
    position: absolute;
    top: 50%;
    margin-top: -250px;
    margin-left: -400px;
  }
  .leftimg{
    float: left;
    margin-left:0;
  }
  .rightcontent{
    float: right;
    margin-top: 170px;
  }
</style>
<script>
  export default{
    data(){
      return {
        errcode: '404'
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this
        that.$set('errcode',that.$route.params.errcode)
      }
    }
  }
</script>
