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
      <div class="row">
        <div class="col-sm-12">
          <section class="panel">
            <header class="panel-heading">
              客户维护记录
            </header>
            <div class="panel-body">
              <div class="table-responsive">
                <div id="dynamic-table_wrapper" class="dataTables_wrapper form-inline" role="grid">
                  <div class="row-fluid">
                    <table id="example" class="table table-bordered">
                      <thead>
                      <tr>
                        <th>选择</th>
                        <th>维护类型</th>
                        <th>维护时间</th>
                        <th>维护人</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-on:click="showInfo(info,$index)" v-for="info in infos" >
                        <td><span class="hideInput"><input type="checkbox" name="checkbox"/><label class="checkbox"></label></span></td>
                        <td>${info.maintenanceType | changeMain}</td>
                        <td>${info.operationTime | formatDate}</td>
                        <td>${info.operationName  | isEmpty}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div id="message">
        <div style="display:none" id="infor">
          <section class="panel">
            <header class="panel-heading">
              客户维护信息
            </header>
            <div class="panel-body">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4" style="margin-top: 20px;">维护类型</div>
                  <div class="col-md-9 col-sm-9 col-xs-8" style="color:#428bca;margin-top: 20px;">
                    ${temptCustomerMaintenance.maintenanceType | changeMain}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4" style="margin-top: 20px;">维护时间</div>
                  <div class="col-md-9 col-sm-9 col-xs-8" style="color:#428bca;margin-top: 20px;">
                    ${temptCustomerMaintenance.operationTime | formatDate}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4" style="margin-top: 20px;">维护人</div>
                  <div class="col-md-9 col-sm-9 col-xs-8" style="color:#428bca;margin-top: 20px;">
                    ${temptCustomerMaintenance.operationName | isEmpty}
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4" style="margin-top: 20px;">维护纪要</div>
                  <div class="col-md-9 col-sm-9 col-xs-8" style="color:#428bca;margin-top: 20px;">
                    ${temptCustomerMaintenance.maintennaceSummary | isEmpty}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
    <div class="row">
      <div class="col-md-12 col-md-offset-5" style="margin-top:30px;margin-bottom:20px;">
        <a v-on:click="cancelMethod()" type="reset" class="btn btn-success">返回</a>
      </div>
    </div>
  </form>
</template>
<style scoped>

</style>
<script>
    import QK from '../../QK'
    export default{
        data:function(){
           return {
           transfers:[{
              transferTime: '',
              oldManager:{
                username: ''
              },
              newManager:{
                username: ''
              },
              transferReason: '',
              transferStatus: ''
           }],
             infos: [{
                id: '',
                maintenanceType: '',
                operationTime: '',
                operationName: ''
              }],
               temptCustomerMaintenance:{
                  maintenanceType: '',
                  operationTime: '',
                  operationName: '',
                  maintennaceSummary: ''
                },
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
          this.type()
        },
        methods:{
        type:function() {
          var that = this
          var id = that.$route.params.id
          that.$http.get(QK.SERVER_URL+'/api/customerMaintenance/'+id, true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
            that.$set("infos", data.data)
            }
         })
      },
          showInfo:function(info,index){
              var that = this
              that.$set("temptCustomerMaintenance",info)
              $("#message #infor").eq(index-1).show()
              $("#message #infor").eq(index-1).siblings().hide()
          },
           init:function() {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL+'/api/customerBasic/'+id, true).then(function (data) {
              var data = $.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("tCustomerBasic", data.data)
               }
             })
            },
            trans:function() {
            var that = this
             var id = that.$route.params.id
             that.$http.get(QK.SERVER_URL+'/api/customerTransfer/'+id, true).then(function (data) {
              var data = $.parseJSON(data.body);
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
        },
            cancelMethod(){
               this.$router.go({path:localStorage.nowurl})
           }
        }
    }

</script>
