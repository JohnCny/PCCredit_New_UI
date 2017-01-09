<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          填写机构信息
        </header>
        <div class="panel-body">
          <form id="org_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="orgName">机构名称</label>
                  <div class="input-icon right">
                    <input v-model="tOrganization.orgName" id="orgName" type="text" class="form-control" name="orgName" placeholder="请输入机构名称">
                    <div class="message">${errors.userCnameError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="nameDiv" class="form-group">
                  <label for="orgDirectorName">负责人</label>
                  <div class="input-icon right">
                    <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName" placeholder="请输入负责人">
                    <div class="message">${errors.orgDirectorNameError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="orgLogisticsId">后勤</label>
                  <div class="input-icon right">
                    <input  v-model="tOrganization.orgLogisticsId" id="orgLogisticsId" type="text" class="form-control" name="orgLogisticsId" placeholder="请输入后勤">
                    <div class="message">${errors.orgLogisticsIdError}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a v-on:click="cancelMethod" type="reset" class="btn btn-default">取消</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>

  </div>
</template>
<style scoped>
  #userNew input,#userNew select{
    width:80%
  }
  .message{
    color:#a94442;
    height:20px;
  }
</style>
<script>
    import QK from '../../QK'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
           return {
                tOrganization:{
                  orgName: '',
                  orgDirectorName: '',
                  orgLogisticsId: ''
                },
                errors:{
                  orgNameError: '',
                  orgDirectorNameError: '',
                  orgLogisticsIdError: ''
                }
           }
        },
        ready:function(){
          QK.addMethod()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#org_new",
              rulesMap:{
                orgName:{required: !0,isRightfulString:!0},
                orgDirectorName:{required: !0,isChinese:!0},
                orgLogisticsId:{required: !0}
              }
            })
            //验证结果  true  false
            if(bool){
              that.$http.post(QK.SERVER_URL+'/organization', that.user, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                 that.$router.go({path:"/system/organization/list"})
                }
              })
            }
            return false
          },
            cancelMethod(){
           this.$router.go({path:localStorage.nowurl})
        }
     }
  }

</script>
