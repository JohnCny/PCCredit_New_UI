<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          贷款状态正常
        </header>
        <div class="panel-body">
          <form id="org_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">放款后首次贷后监控时间:</label>
                <div class="input-icon right">
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                    <option value="0" v-else>男</option>
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                    <option value="1" v-else>女</option>
                  </select>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">首次贷后监控后监控频率:</label>
                <div class="input-icon right">
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                    <option value="0" v-else>男</option>
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                    <option value="1" v-else>女</option>
                  </select>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">实地回访频率:</label>
                <div class="input-icon right">
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                    <option value="0" v-else>男</option>
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                    <option value="1" v-else>女</option>
                  </select>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          逾期、不良
        </header>
        <div class="panel-body">
          <form id="org_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">电话催收频率:</label>
                <div class="input-icon right">
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                    <option value="0" v-else>男</option>
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                    <option value="1" v-else>女</option>
                  </select>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">上门催收频率:</label>
                <div class="input-icon right">
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                    <option value="0" v-else>男</option>
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                    <option value="1" v-else>女</option>
                  </select>
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
