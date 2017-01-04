<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          编辑客户
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <form action="">
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="cname">姓名</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <input id="cname" type="text" class="form-control" name="cname" v-model="customerBasicInfo.cname">
                </div>
              </div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="sex">性别</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>男</option>
                    <option value="1" v-else>男</option>
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>女</option>
                    <option value="0" v-else>女</option>
                  </select>
                  <div class="message">${sexError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="certificateType">证件类型</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="certificateType" type="text" name="certificateType" class="form-control"
                          v-model="customerBasicInfo.certificateType">
                    <option value="1" v-if="customerBasicInfo.certificateType==1" selected>身份证</option>
                    <option value="1" v-else>身份证</option>
                  </select>
                  <div class="message">${certificateTypeError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="certificateNumber">证件号码</label>
                <div class="input-icon right">
                  <i class="fa checkId"></i>
                  <input id="certificateNumber" type="text" class="form-control idNumber" name="certificateNumber"
                         v-model="customerBasicInfo.certificateNumber">
                  <div class="message" id="idMessage"></div>
                </div>
              </div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="tel">手机号码</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <input id="tel" type="text" class="form-control" name="tel" v-model="customerBasicInfo.tel">
                  <div class="message">${telError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="homeAddress">家庭住址</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <input id="homeAddress" type="text" class="form-control" name="homeAddress"
                         v-model="${customerBasicInfo.homeAddress}">
                  <div class="message">${homeAddressError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="marriageStatus">婚姻状况</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="marriageStatus" type="text" name="marriageStatus" class="form-control"
                          v-model="${customerBasicInfo.marriageStatus}">
                    <option value="" v-if="customerBasicInfo.marriageStatus!=null">--请选择--</option>
                    <option value="" selected v-else>--请选择--</option>
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
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="educationDegree">教育情况</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="educationDegree" type="text" class="form-control" name="educationDegree"
                          v-model="${customerBasicInfo.educationDegree}">
                    <option value="" v-if="customerBasicInfo.educationDegree!=null">--请选择--</option>
                    <option value="" selected v-else>--请选择--</option>
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
          marriageStatus: '',
          educationDegree: '',
        },
        errors: {
          sexError: '',
          certificateTypeError: '',
          telError: '',
          homeAddressError: '',
          marriageError: '',
          eductionError: ''
        }
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this;
        that.$http.put(QK.SERVER_URL + '/api/customerBasic', true).then(function (data) {
          var data = jQuery.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      }
    }
  }
</script>
