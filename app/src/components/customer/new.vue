<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          新建客户
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <form action="">
              <!--<template v-for="dropDown in dropDownList">-->
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="cname">客户名称</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <input id="cname" type="text" class="form-control" name="cname" v-model="customerBasicInfo.cname"
                           placeholder="请输入至少2-10位汉字">
                  </div>
                </div>
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="sex">性别</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                      <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                      <option value="0" v-else>男</option>
                      <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                      <option value="1" v-else>女</option>
                    </select>
                    <div class="message">${sexError}</div>
                  </div>
                </div>
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="certificateType">证件类型</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <select id="certificateType" type="text" name="certificateType" class="form-control" v-model="customerBasicInfo.certificateType">
                      <template v-for="cert in certificate">
                        <option  value="${cert.id}" checked>${cert.value}</option>
                      </template>
                    </select>
                    <div class="message">${certificateTypeError}</div>
                  </div>
                </div>
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="certificateNumber">证件号码</label>
                  <div class="input-icon right">
                    <i class="fa checkId"></i>
                    <input data-error="${idNumberError}" id="certificateNumber" type="text" class="form-control idNumber"
                           name="certificateNumber" v-model="customerBasicInfo.certificateNumber" placeholder="请输入有效证件号码">
                    <div class="message" id="idMessage"></div>
                  </div>
                </div>
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="tel">联系方式</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <input data-error="${telError}" id="tel" type="text" class="form-control" name="tel" v-model="customerBasicInfo.tel" placeholder="请输入正确的手机号码">
                    <div class="message">${telError}</div>
                  </div>
                </div>
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="homeAddress">家庭住址</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <input id="homeAddress" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">
                    <div class="message">${homeAddressError}</div>
                  </div>
                </div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="belIndustry">所属行业</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="belIndustry" type="text" name="belIndustry" v-model="customerBasicInfo.belIndustry" class="form-control">
                    <template v-for="industry in customerIndustry">
                      <option  value="${industry.id}" checked>${industry.industryName}</option>
                    </template>
                  </select>
                  <div class="message">${belIndustryError}</div>
                </div>
              </div>

                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="marriageStatus">婚姻状况</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <select id="marriageStatus" type="text" name="marriageStatus" v-model="customerBasicInfo.marriageStatus" class="form-control">
                        <template v-for="marriageStatus in marriage">
                        <option  value="${marriageStatus.id}" checked>${marriageStatus.value}</option>
                        </template>
                    </select>
                    <div class="message">${marriageError}</div>
                  </div>
                </div>
                <div class="form-group col-md-3 col-sm-6 col-xs-12">
                  <label for="educationDegree">文化程度</label>
                  <div class="input-icon right">
                    <i class="fa"></i>
                    <select id="educationDegree" type="text" class="form-control" name="educationDegree" v-model="customerBasicInfo.educationDegree">
                      <template v-for="educationDegree in education">
                      <option value="${educationDegree.id}" checked>${educationDegree.value}</option>
                      </template>
                    </select>
                    <div class="message">${eductionError}</div>
                  </div>
                </div>
                <div class="col-xs-12 contain">
                  <button id="btn_submit" class="btn btn-success">确定</button>
                  <a href="/customer/customer" type="reset" class="btn btn-default">取消</a>
                </div>
              <!--</template>-->
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
</style>
<script>
   import QK from '../../QK'
    export default{
        data:function(){
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
                educationDegree: ''
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
                sexError: '',
                certificateTypeError: '',
                telError: '',
                homeAddressError: '',
                marriageError: '',
                eductionError: '',
                belIndustryError: ''
              }
            }
        },
        ready:function(){
            this.searchId()
            this.industry()
        },
        methods:{
              getInfos:function() {
                var that = this;
                that.$http.post(QK.SERVER_URL+'/api/customerBasic', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("customerBasicInfo", data.data)
                  }
                })
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
              }
            }
        }
</script>
