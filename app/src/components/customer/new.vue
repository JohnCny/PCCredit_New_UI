<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          新建客户
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <form id="form_customer_new" @submit.prevent="handleSubmit">
              <!--<template v-for="dropDown in dropDownList">-->
              <div class="col-md-2"></div>
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="cname">客户名称</label>
                  <div class="input-icon right">
                    <input id="cname" type="text" class="form-control" name="cname" v-model="tCustomerBasic.cname"
                           placeholder="请输入至少2-10位汉字">
                    <div class="message">${errors.cnameError}</div>
                  </div>
                </div>
                <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                  <label for="sex">性别</label>
                  <div class="input-icon right">
                    <select id="sex" type="text" name="sex" class="form-control" v-model="tCustomerBasic.sex">
                      <option value="0" v-if="tCustomerBasic.sex==0" selected>男</option>
                      <option value="0" v-else>男</option>
                      <option value="1" v-if="tCustomerBasic.sex==1" selected>女</option>
                      <option value="1" v-else>女</option>
                    </select>
                    <div class="message">${errors.sexError}</div>
                    </div>
                </div>

                <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                  <label for="certificateType">证件类型</label>
                  <div class="input-icon right">
                    <select id="certificateType" type="text" name="certificateType" class="form-control" v-model="tCustomerBasic.certificateType">
                      <template v-for="cert in certificate">
                        <option  value="${cert.id}" checked>${cert.value}</option>
                      </template>
                    </select>
                    <div class="message">${errors.certificateTypeError}</div>
                    </div>
                </div>

              <div class="col-md-2"></div>
                <div  id="idNumberDiv" class="form-group col-md-3  col-sm-6 col-xs-12">
                  <label for="certificateNumber">证件号码</label>
                  <div class="input-icon right">
                    <input data-error="${idNumberError}" id="certificateNumber" type="text" class="form-control idNumber"
                           name="certificateNumber" v-model="tCustomerBasic.certificateNumber" placeholder="请输入有效证件号码" v-on:change="idNumberCheck()">
                    <div class="message">${errors.certificateNumberError}</div>
                  </div>
                </div>


                <div class="form-group col-md-3  col-md-offset-2 col-sm-6 col-xs-12">
                  <label for="tel">联系方式</label>
                  <div class="input-icon right">
                    <input data-error="${telError}" id="tel" type="text" class="form-control" name="tel" v-model="tCustomerBasic.tel" placeholder="请输入正确的手机号码">
                    <div class="message">${errors.telError}</div>
                  </div>
                </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="native">籍贯</label>
                <div class="input-icon right">
                  <input id="native" type="text" class="form-control" name="native" v-model="tCustomerBasic.native" placeholder="请输入有效地址">
                  <div class="message">${errors.nativeError}</div>
                </div>
              </div>


                <div class="form-group col-md-8 col-md-offset-2 col-sm-6 col-xs-12">
                  <label for="homeAddress">家庭住址</label>
                  <div class="input-icon right">
                    <input id="homeAddress" type="text" class="form-control" name="homeAddress" v-model="tCustomerBasic.homeAddress" placeholder="请输入有效地址">
                    <div class="message">${errors.homeAddressError}</div>
                  </div>
                </div>

              <div class="form-group col-md-8 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="industry">所属行业</label>
                <div class="input-icon right">
                  <select id="industry" type="text" name="industry" v-model="tCustomerBasic.industry" class="form-control">
                    <template v-for="industry in customerIndustry">
                      <option  value="${industry.id}" checked>${industry.industryName}</option>
                    </template>
                  </select>
                  <div class="message">${errors.industryError}</div>
                </div>
              </div>

                <div class="form-group col-md-3  col-md-offset-2 col-sm-6 col-xs-12">
                  <label for="marriageStatus">婚姻状况</label>
                  <div class="input-icon right">
                    <select id="marriageStatus" type="text" name="marriageStatus" v-model="tCustomerBasic.marriageStatus" class="form-control">
                        <template v-for="marriageStatus in marriage">
                        <option  value="${marriageStatus.id}" checked>${marriageStatus.value}</option>
                        </template>
                    </select>
                    <div class="message">${errors.marriageError}</div>
                  </div>
                </div>
                <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                  <label for="educationDegree">文化程度</label>
                  <div class="input-icon right">
                    <select id="educationDegree" type="text" class="form-control" name="educationDegree" v-model="tCustomerBasic.educationDegree">
                      <template v-for="educationDegree in education">
                      <option value="${educationDegree.id}" checked>${educationDegree.value}</option>
                      </template>
                    </select>
                    <div class="message">${errors.eductionError}</div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-offset-5 contain" style="margin-top: 50px;">
                  <button id="btn_submit" class="btn btn-success">确定</button>
                  <a v-link={path:'/system/customer/list'} type="reset" class="btn btn-default">取消</a>
                </div>
              <!--</template>-->
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  .message{
      color:#a94442;
      height:20px;
  }
</style>
<script>
    import QK from '../../QK.js'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
             return {
              tCustomerBasic: {
                cname: '',
                sex: '',
                certificateType: '0',
                certificateNumber: '',
                tel: '',
                homeAddress: '',
                industry:'',
                marriageStatus: '0',
                educationDegree: '0',
                native: ''
              },
              certificate:[
              {
                 id: '',
                 value: ''
              },
              {
                 id: '',
                 value: ''
              }],
              marriage:[{
                 id: '',
                 value: ''
              }],
              education:[{
                 id: '',
                 value: ''
              }],
              customerIndustry:[{
                 id: '',
                 industryName: ''
              }],
              errors:{
                cnameError: '',
                sexError: '',
                certificateTypeError: '',
                telError: '',
                homeAddressError: '',
                marriageError: '',
                eductionError: '',
                industryError: '',
                nativeError: '',
                certificateNumberError: ''
              }
            }
        },
        ready:function(){
            QK.addMethod()
            this.searchId()
            this.industry()
        },
        methods:{
         handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#form_customer_new",
          rulesMap: {
            cname: {required: !0, isChinese: !0},
            sex: {required: !0},
            certificateType: {required: !0,downList: !0},
            certificateNumber: {required: !0, isIdCardNo: !0},
            homeAddress: {required: !0, isHomeAddress: !0},
            tel: {required: !0, tel: !0},
            marriageStatus: {required: !0, downList: !0},
            educationDegree: {required: !0,downList: !0},
            industry: {required: !0},
            native: {required: !0}
          }
        })
          //验证结果  true  false
           if (bool) {
            //发送请求
                var tCustomerBasic = that.tCustomerBasic
                //tCustomerBasic.industry = $("#industry").val().join(",")
                that.$http.post(QK.SERVER_URL+'/api/customerBasic', tCustomerBasic, true).then(function (data) {
                  var data = jQuery.parseJSON(data.body)
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$router.go({path:'/system/customer/list'})
                  }
                })
              }
              return false
            },
              searchId:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/api/customerBasic/allStatus', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("certificate", data.data.cert)
                    that.$set("marriage", data.data.marriageStatus)
                    that.$set("education", data.data.educationDegree)
                  }
                })
              },
             industry:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/api/customerIndustry', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("customerIndustry", data.data)
                  }
                })
              },
          idNumberCheck(){
            var that = this
            var idCard = that.tCustomerBasic.certificateNumber+''
            var len = idCard.length
            var msg3 = "该证件号码已存在！"
            var msg4 = "证件可用"
            var msg5 = "身份证长度不够！"
            if (len < 14) {
              QK.messageFun($("#idNumberDiv"),msg5)
            }else {
              this.$http.get(QK.SERVER_URL+'/api/customerBasic/idCardExist?identityCard='+idCard,true).then(function (res) {
                var data = jQuery.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  if(data.data){
                     QK.messageFun($("#idNumberDiv"),msg3)
                  }else{
                     $("#idNumberDiv").find("div.message").css("color", "#3c763d").html(msg4)
                     $("#idNumberDiv").find("input").css("border-color","#3c763d")
                     $("#btn_submit").removeAttr("disabled")
                  }
                }else{
                  QK.messageFun($("#idNumberDiv"),result.msg)
                }
              })
            }
          }
      }
   }
</script>
