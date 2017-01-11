<style src='../../../static/css/Tabs.css'></style>
<template>
  <form class="content">
    <ul class="myTab">
      <!--<li class="active" v-on:click="setTab2(this,'jbxx')">客户基本信息</li>
      <li v-on:click="setTab2(this,'dkqk')">客户贷款情况</li>
      <li v-on:click="setTab2(this,'khwhjl')">客户维护记录</li>
      <li v-on:click="setTab2(this,'dhjkjl')">贷后监控记录</li>
      <li v-on:click="setTab2(this,'csjl')">逾期/不良催收记录</li>
      <li v-on:click="setTab2(this,'yjjl')">客户移交记录</li>-->
      <template v-for="todo in infoData">
        <li v-on:click="setTab2" v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
      </template>
    </ul>
    <!--*******************************************客户基本信息*******************************************************-->
    <div class="tabContent" id="jbxx">
      <div class="report common">
        <h5>基本信息</h5>
        <table class="bxd">
          <tr>
            <td>客户名称：<span>${tCustomerBasic.cname}</span></td>
            <td>性别：<span>${tCustomerBasic.sex}</span></td>
          </tr>
          <tr>
            <td>证件类型：<span>${tCustomerBasic.certificateType}</span></td>
            <td>证件号码：<span>${tCustomerBasic.certificateNumber}</span></td>
          </tr>
          <tr>
            <td>联系方式：<span>${tCustomerBasic.tel}</span></td>
            <td>家庭住址：<span>${tCustomerBasic.homeAddress}</span></td>
          </tr>
          <tr>
            <td>婚姻状况：<span>${tCustomerBasic.marriageStatus}</span></td>
            <td>文化程度：<span>${tCustomerBasic.educationDegree}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <!--*******************************************客户贷款情况*******************************************************-->
    <div class="tabContent" id="dkqk" style="display:none;">
      <div class="report common">
        <h5>贷款情况</h5>
        <table class="bxd">
          <tr>
            <td>产品：<span>产品1</span></td>
            <td>申请日期：<span>XXXXXXXXXXXXXX</span></td>
          </tr>
          <tr>
            <td>是否申请成功：
              <span class="label label-success" style="color:#fff;">是</span>
              <span class="label label-important" style="color:#fff;">否</span>
            </td>
            <td>额度：<span>XXXXXXXXXXXXXX</span></td>
          </tr>
          <tr>
            <td>利率：<span>XXXXXXXXXXXXXX</span></td>
            <td>放款日期：<span>XXXXXXXXXXXXXX</span></td>
          </tr>
          <tr>
            <td colspan="2">当前余额：<span>￥20000</span></td>
          </tr>
        </table>
      </div>
    </div>
    <!--*******************************************客户维护记录*******************************************************-->
    <div class="tabContent" id="khwhjl" style="display:none;">
      <div class="report common">
        <h5>维护记录</h5>
        <table class="center whTable">
          <tr>
            <th>选择</th>
            <th>维护类型</th>
            <th>维护时间</th>
            <th>维护人</th>
          </tr>
          <tr v-for="mainrecord in mainRecord">
            <th><input type="radio"></th>
            <th>${mainrecord.maintenanceType}</th>
            <th>${mainrecord.operationTime | formatDate}</th>
            <th>${mainrecord.operationName}</th>
          </tr>
        </table>
      </div>
    </div>
    <!--*******************************************贷后监控记录*******************************************************-->
    <div class="tabContent" id="dhjkjl" style="display:none;">
      <div class="report common">
        <h5>贷后监控记录</h5>
        <table class="center">
          <tr>
            <th>客户经理</th>
            <th>贷后监控方式</th>
            <th>贷后监控结果</th>
          </tr>
          <tr>
            <td>admin</td>
            <td>上门</td>
            <td>XXXX</td>
          </tr>
        </table>
      </div>
    </div>
    <!--*******************************************逾期/不良催收记录*******************************************************-->
    <div class="tabContent" id="csjl" style="display:none;">
      <div class="report common">
        <h5>逾期/不良催收记录</h5>
        <table class="center">
          <tr>
            <th>催收原因</th>
            <th>金额</th>
            <th>催收日期</th>
            <th>催收客户经理</th>
          </tr>
          <tr>
            <td>逾期</td>
            <td>1000</td>
            <td>XXXX</td>
            <td>XXXX</td>
          </tr>
          <tr>
            <td>不良</td>
            <td>1000</td>
            <td>XXXX</td>
            <td>XXXX</td>
          </tr>
        </table>
      </div>
    </div>
    <!--*******************************************客户移交记录*******************************************************-->
    <div class="tabContent" id="yjjl" style="display:none;">
      <div class="report common">
        <h5>客户移交记录</h5>
        <table class="center transferd table table-bordered">
          <tr>
            <th>移交日期</th>
            <th>原客户经理</th>
            <th>移交后客户经理</th>
            <th>移交原因</th>
            <th>移交结果</th>
          </tr>
          <tr v-for="transfer in transfers">
            <th>${transfer.transferTime}</th>
            <th>${transfer.oldManager.username}</th>
            <th>${transfer.newManager.username}</th>
            <th>${transfer.transferReason}</th>
            <th>${transfer.transferStatus}</th>
          </tr>
        </table>
      </div>
    </div>
    <p class="button">
      <input type="button" value="返回"  onclick="iframe('kh_list.html')"/>
    </p>
  </form>
</template>
<style scoped>

</style>
<script>
    import QK from '../../QK'
    export default{
        data:function(){
           return {
                tCustomerBasic:{
                  cname: '',
                  sex: '',
                  certificateType: '',
                  certificateNumber: '',
                  tel:'',
                  homeAddress:'',
                  marriageStatus:'',
                  educationDegree:''
                },
                 infoData : [
                {id:'jbxx',text:'客户基本信息',classname:'active'},
                {id:'dkqk',text:'客户贷款情况',classname:''},
                {id:'khwhjl',text:'客户维护记录',classname:''},
                {id:'dhjkjl',text:'贷后监控记录',classname:''},
                {id:'csjl',text:'逾期/不良催收记录',classname:''},
                {id:'yjjl',text:'客户移交记录',classname:''},
              ]
           }
        },
        ready:function(){
          this.init()
        },
        methods:{
           init:function() {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL+'/api/customerBasic/'+id, true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("tCustomerBasic", data.data)
              }
            })
            that.$http.get(QK.SERVER_URL+'/api/customerMaintenance/'+id, true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("mainRecord", data.data)
              }
            })
             that.$http.get(QK.SERVER_URL+'/api/customerTransfer/'+id, true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("transfers", data.data)
              }
            })
           },
           setTab2:function(){
                var that = this
                  console.log(event.currentTarget)
                  $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
                  var id = $(event.currentTarget).data("id")
                  console.log(id)
                  $("#"+id).show().siblings("div.tabContent").hide()
            }
        }
    }

</script>
