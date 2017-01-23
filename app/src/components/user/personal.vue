<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          个人信息
        </header>
        <div class="panel-body">
          <div class="row" style="margin-top:20px;margin-bottom:20px">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-4">姓名</label>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  <p class="form-control-static">
                    ${userSession.userCname | isEmpty}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-4">性别</label>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  <p class="form-control-static">
                    ${userSession.sex | reSex}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="margin-bottom:20px">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-4">联系方式</label>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  <p class="form-control-static">
                    ${userSession.tel}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-4">电子邮件</label>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  <p class="form-control-static">
                    ${userSession.email | isEmpty}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="margin-bottom:20px">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <label class="control-label col-md-3 col-sm-3 col-xs-4">账号状态</label>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  <p class="form-control-static birthday">
                    <span class="label label-sm ${userSession.status | reStatusClass}">${userSession.status | reStatus}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row">
    <my-upload></my-upload>
  </div>
</template>
<script>
  import QK from '../../QK'
  import myUpload from '../upload/uploadImg.vue'
    export default{
       data(){
        return{
          userSession:{},
          show: true,
          params: {
              token: '123456798',
              name: 'avatar'
          },
          imgDataUrl: '', // the datebase64 url of created image
        }
      },
      ready: function () {
        this.init()
      },
      components: {
         'my-upload': myUpload
      },
      methods:{
        init: function() {
          this.$set("userSession",JSON.parse(localStorage.user).user)
        }
      },
    }





</script>
