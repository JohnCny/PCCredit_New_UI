<template>
  <div class="row">
    <div class="portlet light bordered">
      <div class="portlet-body form">
        <!-- BEGIN FORM-->
        <form class="form-horizontal" role="form" >
          <div class="form-body">
            <h3 class="form-section">基本资料</h3>
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-4">登录名</label>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    <p class="form-control-static" >
                      ${userSession.username | isEmpty}
                    </p>
                  </div>
                </div>
              </div>
              <!--/span-->
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-4">姓名</label>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    <p class="form-control-static">
                      ${userSession.cname | isEmpty}
                    </p>
                  </div>
                </div>
              </div>
              <!--/span-->
            </div>
            <!--/row-->
            <div class="row">
              <!--/span-->
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-4">性别</label>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    <p class="form-control-static">
                      ${userSession.sex}
                    </p>
                  </div>
                </div>
              </div>
              <!--/span-->
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-4">证件号码</label>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    <p class="form-control-static">
                      ${userSession.idNumber | isEmpty}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!--/row-->
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-4">联系方式</label>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    <p class="form-control-static">
                      ${userSession.age}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label class="control-label col-md-3 col-sm-3 col-xs-4">出生日期</label>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    <p class="form-control-static birthday">
                      ${userSession.tel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!-- END FORM-->
      </div>
    </div>
  </div>
</template>
<script>
  import QK from '../../QK'
    export default{
        data(){
            return{
              userSession:{
                username:'',
                age:'',
                cname:'',
                sex: '',
                idNumber:'',
                tel:''
              }
            }
        },
      ready: function () {

      },
      methods:{

      }
    }

</script>
