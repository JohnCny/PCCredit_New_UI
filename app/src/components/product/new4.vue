<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          配置风险属性
        </header>
        <div class="panel-body">
          <form id="org_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">逾期超过__期转入风险名单：</label>
                <div class="input-icon right">
                  <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName" placeholder="请输入负责人">
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">不良转入黑名单:</label>
                <div class="input-icon right">
                  <input id="roleId" type="radio" name="roleId" value="${temp.id}">
                  <label onclick="setRadio(this)"class=" radio_a">
                    是
                  </label>
                  <input id="roleId" type="radio" name="roleId" value="${temp.id}">
                  <label onclick="setRadio(this)"class=" radio_a">
                    否
                  </label>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">逾期率高于___%时预警:</label>
                <div class="input-icon right">
                  <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName" placeholder="请输入负责人">
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">不良率高于___%时预警:</label>
                <div class="input-icon right">
                  <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName" placeholder="请输入负责人">
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">行业逾期率高于___%时预警:</label>
                <div class="input-icon right">
                  <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName" placeholder="请输入负责人">
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">行业不良率高于___%时预警:</label>
                <div class="input-icon right">
                  <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName" placeholder="请输入负责人">
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">行业拒件率高于___%时预警:</label>
                <div class="input-icon right">
                  <input v-model="tOrganization.orgDirectorName" id="orgDirectorName" type="text" class="form-control" name="orgDirectorName" placeholder="请输入负责人">
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
  <p class="button">
    <a class="btn btn-success">保存</a>
    <a class="btn btn-success">保存保存并继续</a>
    <a class="btn btn-default">返回</a>
  </p>
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
