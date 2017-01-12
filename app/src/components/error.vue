<template>
  <div class="wrap">
    <div class="container">
      <div class="leftimg">
        <!--<img v-bind:src="/static/images/${errcode}.png" alt="${errcode}-error">-->
        <span class="errcode">${errcode}</span>
      </div>
      <div class="rightcontent">
        <p style="font: 30px 微软雅黑;">sorry您没有访问权限</p>
        <p style="font: 18px 微软雅黑">您可以通过一下放是继续访问......</p>
        <a  v-link="{path: '/system'}">返回首页</a>
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
    width: 358px;
    height: 408px;
    background: url(/static/images/errorCode.png);
  }
  .leftimg .errcode{
    display: block;
    margin-top: 45px;
    margin-left: 20px;
    width: 220px;
    height: 70px;
    color: #fff;
    text-align: center;
    font-size: 70px;
    line-height: 70px;
    transform:rotate(-10deg);
    -ms-transform:rotate(-10deg); 	/* IE 9 */
    -moz-transform:rotate(-10deg); 	/* Firefox */
    -webkit-transform:rotate(-10deg); /* Safari 和 Chrome */
    -o-transform:rotate(-10deg); 	/* Opera */
  }
  .rightcontent{
    float: right;
    margin-top: 170px;
  }
  .rightcontent>p{
    color: #fff;
  }
  .rightcontent>a{
    display:block;
    width: 273px;
    height: 60px;
    background: url(/static/images/base.png);
    color: #ffffff;font:34px 微软雅黑;
    text-align: center;
    margin-top: 15px;
    line-height: 55px;
    text-decoration: none;
    cursor: pointer;
  }
</style>
<script>
  export default{
    data(){
      return {
        errcode: '404'
      }
    },
    route: {
      canReuse: function () {
        return false
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this
        console.log(that.$route.params.errcode)
        if(that.$route.params.errcode){
          that.$set('errcode',that.$route.params.errcode)
        }else{
          that.$set('errcode','404')
        }

      }
    }
  }
</script>
