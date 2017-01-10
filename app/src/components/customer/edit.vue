<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          编辑客户
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <form id="form_customer_edit" @submit.prevent="handleSubmit">
              <div class="col-md-2"></div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="cname">姓名</label>
                <div class="input-icon right">
                  <input id="cname" type="text" class="form-control" name="cname" v-model="customerBasicInfo.cname">
                  <div class="message">${cnameError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">性别</label>
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
                <label for="certificateType">证件类型</label>
                <div class="input-icon right">
                  <select id="certificateType" type="text" name="certificateType" class="form-control"
                          v-model="customerBasicInfo.certificateType">
                    <option value="1" v-if="customerBasicInfo.certificateType==1" selected>身份证</option>
                    <option value="1" v-else>身份证</option>
                  </select>
                  <div class="message">${certificateTypeError}</div>
                </div>
              </div>
              <div class="col-md-2"></div>
              <div id="idNumberDiv" class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="certificateNumber">证件号码</label>
                <div class="input-icon right">
                  <input id="certificateNumber" type="text" class="form-control idNumber" name="certificateNumber"
                         v-model="customerBasicInfo.certificateNumber" v-on:change="idNumberCheck()">
                  <div class="message" id="idMessage"></div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="tel">联系方式</label>
                <div class="input-icon right">
                  <input id="tel" type="text" class="form-control" name="tel" v-model="customerBasicInfo.tel">
                  <div class="message">${telError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="native">籍贯</label>
                <div class="input-icon right">
                  <input id="native" type="text" class="form-control" name="native" v-model="customerBasicInfo.native" placeholder="请输入有效地址">
                  <div class="message">${errors.nativeError}</div>
                </div>
              </div>

              <div class="form-group col-md-8 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="homeAddress">家庭住址</label>
                <div class="input-icon right">
                  <input id="homeAddress" type="text" class="form-control" name="homeAddress"
                         v-model="customerBasicInfo.homeAddress">
                  <div class="message">${homeAddressError}</div>
                </div>
              </div>

              <div class="form-group col-md-8 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="belIndustry">所属行业</label>
                <div class="input-icon right">
                  <select id="belIndustry" type="text" name="belIndustry" v-model="customerBasicInfo.belIndustry" class="form-control">
                    <template v-for="industry in customerIndustry">
                      <option  value="${industry.id}" checked>${industry.industryName}</option>
                    </template>
                  </select>
                  <div class="message">${errors.belIndustryError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="marriageStatus">婚姻状况</label>
                <div class="input-icon right">
                  <select id="marriageStatus" type="text" name="marriageStatus" class="form-control"
                          v-model="customerBasicInfo.marriageStatus">
                    <option value="1" v-if="customerBasicInfo.marriageStatus==1" selected>未婚</option>
                    <option value="1" v-else>未婚</option>
                    <option value="2" v-if="customerBasicInfo.marriageStatus==2" selected>已婚</option>
                    <option value="2" v-else>已婚</option>
                    <option value="3" v-if="customerBasicInfo.marriageStatus==3" selected>离婚</option>
                    <option value="3" v-else>离婚</option>
                    <option value="4" v-if="customerBasicInfo.marriageStatus==4" selected>丧偶</option>
                    <option value="4" v-else>丧偶</option>
                  </select>
                  <div class="message">${marriageError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="educationDegree">教育情况</label>
                <div class="input-icon right">
                  <select id="educationDegree" type="text" class="form-control" name="educationDegree"
                          v-model="customerBasicInfo.educationDegree">
                    <option value="1" v-if="customerBasicInfo.educationDegree==1" selected>本科以上</option>
                    <option value="1" v-else>本科以上</option>
                    <option value="2" v-if="customerBasicInfo.educationDegree==2" selected>本科</option>
                    <option value="2" v-else>本科</option>
                    <option value="3" v-if="customerBasicInfo.educationDegree==3" selected>大专</option>
                    <option value="3" v-else>大专</option>
                    <option value="4" v-if="customerBasicInfo.educationDegree==4" selected>大专</option>
                    <option value="4" v-else>大专</option>
                    <option value="5" v-if="customerBasicInfo.educationDegree==5" selected>初中及以下</option>
                    <option value="5" v-else>初中及以下</option>
                  </select>
                  <div class="message">${eductionError}</div>
                </div>
              </div>

              <div class="col-xs-12 col-md-offset-5 contain" style="margin-top: 50px;">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a v-link={path:'/system/customer/list'}  type="reset" class="btn btn-default">取消</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
   .message{
      color:#a94442;
      height:20px;
  }
</style>
<script>
  import QK from '../../QK.js'
  import jQueryValidation from 'jquery-validation'
  export default{
    data: function () {
      return {
        customerBasicInfo: {
          cname: '',
          sex: '',
          certificateType: '',
          certificateNumber: '',
          tel: '',
          homeAddress: '',
          belIndustry: '',
          marriageStatus: '',
          educationDegree: '',
          native: ''
        },
        customerIndustry:[{
           id: '',
           industryName: ''
        }],
        errors: {
          sexError: '',
          certificateTypeError: '',
          telError: '',
          homeAddressError: '',
          marriageError: '',
          eductionError: '',
          cnameError: ''
        }
      }
    },
    ready: function () {
        QK.addMethod()
        this.init()
        this.industry()
    },
    methods: {
       handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#form_customer_edit",
          rulesMap: {
            cname: {required: !0, isChinese: !0},
            sex: {required: !0},
            certificateType: {required: !0, downList: !0},
            certificateNumber: {required: !0, isIdCardNo: !0},
            homeAddress: {required: !0, isHomeAddress: !0},
            tel: {required: !0, tel: !0},
            marriageStatus: {required: !0, downList: !0},
            educationDegree: {required: !0,downList: !0},
            belIndustry: {required: !0},
            native: {required: !0}
          }
        })
          //验证结果  true  false
           if (bool) {
            //发送请求
                var customerBasicInfo = that.customerBasicInfo
                that.$http.put(QK.SERVER_URL+'/api/customerBasic', customerBasicInfo, true).then(function (data) {
                  var data = jQuery.parseJSON(data.body)
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$router.go({path:'/system/customer/list'})
                  }
                })
              }
              return false
            },
            init:function() {
              var that = this
              var id = that.$route.params.id
              that.$http.get(QK.SERVER_URL+'/api/customerBasic/'+id, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  that.$set("customerBasicInfo", data.data)
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
            messageCname(parent,msg){
            parent.find(".checkId").removeClass("fa-check").addClass("fa-warning").css("color", "#ed6b75")
            parent.find(".message").css("color", "red").html(msg)
            $("#btn_submit").attr("disabled", "true")
          },
          idNumberCheck(){
            var that = this
            var certificateNumber = that.customerBasicInfo.certificateNumber
            var len = certificateNumber.length
            var msg3 = "身份证已存在或格式不正确！"
            var msg4 = "证件可用"
            var msg5 = "身份证长度不够！"
            if (len < 14) {
              that.messageCname($("#idNumberDiv"),msg5)
            }else {
              this.$http.get(QK.SERVER_URL+'/api/customerBasic/idCardExist?identityCard='+certificateNumber, true).then(function (res) {
              var data = jQuery.parseJSON(res.body)
                    if (data.data) {
                        that.messageCname($("#idNumberDiv"),msg3)
                    } else {
                        $("#idNumberDiv").find("div.message").css("color", "#32c5d2").html(msg4)
                        $("#idNumberDiv").find("i.checkId").removeClass("fa-warning").addClass("fa-check").css("color", "#32c5d2")
                        $("#btn_submit").removeAttr("disabled")
                   }
              })
           }
        }
     }
  }
</script>
