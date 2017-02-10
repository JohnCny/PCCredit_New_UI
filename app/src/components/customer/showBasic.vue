<template>
  <div class="report common">
    <h5>基本信息</h5>
    <table class="bxd">
      <tr>
        <td>客户名称：<span>${tCustomerBasic.cname}</span></td>
        <td>性别：<span>${tCustomerBasic.sex | reSex}</span></td>
      </tr>
      <tr>
        <td>证件类型：<span>${tCustomerBasic.certificateType | reId}</span></td>
        <td>证件号码：<span>${tCustomerBasic.certificateNumber}</span></td>
      </tr>
      <tr>
        <td>联系方式：<span>${tCustomerBasic.tel}</span></td>
        <td>家庭住址：<span>${tCustomerBasic.homeAddress}</span></td>
      </tr>
      <tr>
        <td>婚姻状况：<span>${tCustomerBasic.marriageStatus | marriageCondition}</span></td>
        <td>文化程度：<span>${tCustomerBasic.educationDegree | reEdu}</span></td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
</style>
<script>
import QK from '../../QK'
export default{
  data:function(){
    return {
      tCustomerBasic: {
        cname: '',
        sex: '',
        certificateType: '',
        certificateNumber: '',
        tel: '',
        homeAddress: '',
        marriageStatus: '',
        educationDegree: ''
      },
    }
  },
  ready:function(){
      this.init()
  },
  methods:{
    init: function () {
      var that = this
      var id = that.$route.params.id
      that.$http.get(QK.SERVER_URL + '/api/customerBasic/' + id, true).then(function (data) {
        var data = $.parseJSON(data.body)
        var result = QK.getStateCode(that, data.code)
        if (result.state) {
          that.$set("tCustomerBasic", data.data)
        }
      }).then(function(){
        QK.getActive(localStorage.nowurl)
      })
    },
  }
}
</script>
