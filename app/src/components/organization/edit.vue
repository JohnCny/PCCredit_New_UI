<template>
  <div class="row">
    <div class="col-sm-4">
      <section class="panel">
        <header class="panel-heading">
          编辑机构
        </header>
        <div class="panel-body">

        </div>
      </section>
    </div>
    <div class="col-sm-8">
      <section class="panel">
        <header class="panel-heading">
          编辑用户信息
        </header>
        <div class="panel-body">
          <form id="org_edit" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="orgName">机构名称</label>
                  <div class="input-icon right">
                    <input v-model="tOrganization.orgName" id="orgName" type="text" class="form-control" name="orgName">
                    <div class="message">${errors.userCnameError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="nameDiv" class="form-group">
                  <label for="orgDirectorName">负责人</label>
                  <div class="input-icon right">
                    <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName">
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
                    <input  v-model="tOrganization.orgLogisticsId" id="orgLogisticsId" type="text" class="form-control" name="orgLogisticsId">
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
          this.init()
          QK.addMethod()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#org_edit",
              rulesMap:{
                orgName:{required: !0,isRightfulString:!0},
                orgDirectorName:{required: !0,isChinese:!0},
                orgLogisticsId:{required: !0}
              }
            })
            //验证结果  true  false
            if(bool){
              that.$http.put(QK.SERVER_URL+'/organization', that.tOrganization, true).then(function (data) {
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
      },
          init:function() {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL+'/api/organization/'+id, true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("tOrganization", data.data)
              }
           })
        }
     }
  }

</script>
