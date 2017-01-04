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
              <div class="form-group">
                <label for="cname">姓名</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <input id="cname" type="text" class="form-control" name="cname" v-model="customerBasicInfo.cname">
                </div>
              </div>
              <div class="form-group">
                <label for="sex">性别</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="sex" type="text"  name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="">--请选择--</option>
                    <option value="1">男</option>
                    <option value="0">女</option>
                  </select>
                  <div class="message">${sexError}</div>
                </div>
              </div>
              <div class="form-group">
                <label for="certificateType">证件类型</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="certificateType" type="text" name="" class="form-control">
                    <option value="">--请选择--</option>
                    <option value="1" selected>身份证</option>
                  </select>
                  <div class="message">${certificateTypeError}</div>
                </div>
              </div>
              <div class="form-group">
                <label for="certificateNumber">证件号码</label>
                <div class="input-icon right">
                  <i class="fa checkId"></i>
                  <input data-error="${idNumberError}" id="certificateNumber" type="text" class="form-control idNumber" name="" value="${customerBasicInfo.idNumber}" placeholder="请输入有效证件号码">
                  <div class="message" id="idMessage"></div>
                </div>
              </div>
              <div class="form-group">
                <label for="tel">手机号码</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <input data-error="${telError}" id="tel" type="text" class="form-control" name="" value="${customerBasicInfo.tel}" placeholder="请输入正确的手机号码">
                  <div class="message">${telError}</div>
                </div>
              </div>
              <div class="form-group">
                <label for="homeAddress">家庭住址</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <input   id="homeAddress" type="text" class="form-control" name="" value="${customerBasicInfo.homeAddress}" placeholder="请输入有效地址">
                  <div class="message">${homeAddressError}</div>
                </div>
              </div>
              <div class="form-group">
                <label for="marriageStatus">婚姻状况</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="marriageStatus" type="text"  name="" class="form-control" >
                    <option value="">--请选择--</option>
                    <option value="1">未婚</option>
                    <option value="2">已婚</option>
                    <option value="3">离婚</option>
                    <option value="4">丧偶</option>
                  </select>
                  <div class="message">${marriageError}</div>
                </div>
              </div>
              <div class="form-group">
                <label for="educationDegree">教育情况</label>
                <div class="input-icon right">
                  <i class="fa"></i>
                  <select id="educationDegree" type="text" class="form-control" name="" >
                    <option value="">--请选择--</option>
                    <option value="1">本科以上</option>
                    <option value="2">本科</option>
                    <option value="3">大专</option>
                    <option value="4">高中/中专</option>
                    <option value="5">初中及以下</option>
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
        data:function(){
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
              errors:{
                sexError: '',
                certificateTypeError: '',
                telError: '',
                homeAddressError: '',
                marriageError: '',
                eductionError: ''
              }
            }
        },
        ready:function(){
            this.searchId()
            this.marCondition()
            this.degree()
        },
        methods:{
              getInfos:function() {
                var that = this;
                that.$http.post(QK.SERVER_URL+'/customerBasic', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("infos", data.data)
                  }
                })
              },
              searchId:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/customerBasic/cert', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("certificate", data.data)
                  }
                })
              },
              marCondition:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/customerBasic/marriageStatus', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("marriage", data.data)
                  }
                })
              },
              degree:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/customerBasic/educationDegree', true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("education", data.data)
                  }
                })
              }
            }
        }
</script>
