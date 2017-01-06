<template>
  <form class="content">
    <h1>查看客户信息</h1>
    <h2>当前位置：客户管理 / 客户信息查询 / 客户1 / <span>查看客户信息</span></h2>
    <ul class="myTab">
      <li class="active" v-on:click="setTab2(this,'jbxx')">客户基本信息</li>
      <li v-on:click="setTab2(this,'dkqk')">客户贷款情况</li>
      <li v-on:click="setTab2(this,'khwhjl')">客户维护记录</li>
      <li v-on:click="setTab2(this,'dhjkjl')">贷后监控记录</li>
      <li v-on:click="setTab2(this,'csjl')">逾期/不良催收记录</li>
      <li v-on:click="setTab2(this,'yjjl')">客户移交记录</li>
    </ul>
    <!--*******************************************客户基本信息*******************************************************-->
    <div class="tabContent" id="jbxx">
        <div class="col-sm-12">
          <section class="panel">
            <header class="panel-heading">
              编辑客户
            </header>
            <div class="panel-body">
              <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">客户名称</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.cname}
                  </div>
                </div>
              </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">性别</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.sex}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">证件类型</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      身份证
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.certificateNumber}
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.tel}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.homeAddress}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">婚姻状况</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.marriageStatus}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">${tCustomerBasic.文化程度}</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.marriageStatus}
                    </div>
                  </div>
                </div>
      </div>
            </div>
          </section>
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
        <table class="center transferd">
          <tr>
            <th>移交日期</th>
            <th>原客户经理</th>
            <th>移交后客户经理</th>
            <th>移交原因</th>
            <th>移交结果</th>
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
                infos:{
                  customerId: '',
                  cname: '',
                  certificateNumber: '',
                  transferReason: ''
                },
                currentpage: 1,//第几页
                totlepage: '',//共几页
                visiblepage: 10//隐藏10页
           }
        },
        ready:function(){
          this.init()
        },
        computed: {
          pagenums: function () {
            //初始化前后页边界
            var lowPage = 1
            var highPage = this.totlepage
            var pageArr = []
            if (this.totlepage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
              var subVisiblePage = Math.ceil(this.visiblepage / 2)
              if (this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage + 1) {//处理正常的分页
                lowPage = this.currentpage - subVisiblePage
                highPage = this.currentpage + subVisiblePage - 1
              } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
                lowPage = 1
                highPage = this.visiblepage
              } else {//处理后几页的逻辑
                lowPage = this.totlepage - this.visiblepage + 1
                highPage = this.totlepage
              }
            }
            //确定了上下page边界后，要准备压入数组中了
            while (lowPage <= highPage) {
              pageArr.push(lowPage)
              lowPage++
            }
            return pageArr
          },
        },
        watch: {
          currentpage: function (oldValue, newValue) {
            this.init()
          }
        },
        methods:{
          init : function(){
            var that = this
            that.$http.get(QK.SERVER_URL+'/api/customerTransfer/queryTransfer', true).then(function(res){
              var data = jQuery.parseJSON(res.body)
              var page = parseInt(data.recordsTotal / 10);
              if (data.recordsTotal % 10) {
                page = page + 1
              }
              that.$set('totlepage', page)
              that.$set('infos', data.data)
            })
          },
          pageChange: function (page) {
            page = page || 1
            var that = this
            if (that.currentpage != page) {
              that.currentpage = page
            }
          },
           accept:function() {
                var that = this
                var ids = []
                var userIds = []
                var obj = {}
                var keyobj = {}
                $("input[name='checkbox']:checkbox:checked").each(function(){
                  var id = $(this).val()
                  ids.push(id)
             })
                  var tempid = ids.join(",")
                  obj["customerIds"] = tempid
                  obj["flag"] = 1
                 that.$http.put(QK.SERVER_URL+'/api/customerTransfer/accept', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                     this.$router.go({path: '/system/customer/list'})
                  }
                })
              },
           refuse:function() {
                var ids = []
                var userIds = []
                var obj = {}
                var keyobj = {}
                $("input[name='checkbox']:checkbox:checked").each(function(){
                var id = $(this).val()
                userIds.push(id)
            })
                var tempid = userIds.join(",")
                keyobj["customerIds"] = tempid
                keyobj["flag"] = 2
                that.$http.get(QK.SERVER_URL+'/api/customerIndustry', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    this.$router.go({path: '/system/customer/list'})
                  }
               })
            }
        }
    }

</script>
