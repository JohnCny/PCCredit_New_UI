<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          <i class="fa fa-th-list"></i>
          贷款信息
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户名称：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.customerCname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.customerCardNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">产品名称：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.productName | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">审批金额：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.approveAmount | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">审批利率：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.approveRate | isEmpty}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div class="row" style="height:700px;">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          签约信息
        </header>
        <form class="form-horizontal" role="form" id="cusBasic">
          <input type="hidden" id="applicationId" name="applicationId"/>
          <input type="hidden" id="contractId" name="contractId"/>
          <div class="form-group col-md-offset-4" style="margin-top:30px;margin-left:50px;">
            <label for="loanStartTime" class="col-sm-2 control-label">贷款开始日期：</label>
            <div class="col-sm-10" style="width:45%;z-index: 1;">
              <div class="input-icon right">
                <input class="input" size="50" type="text" @click.stop="open($event,'picker3')"  v-model="calendar.items.picker3.value" id="loanStartTime" name="loanStartTime"><br>
                <calendar
                  :show.sync="calendar.show"
                  :type="calendar.type"
                  :value.sync="calendar.value"
                  :x="calendar.x"
                  :y="calendar.y"
                  :begin.sync="calendar.begin"
                  :end.sync="calendar.end"
                  :range.sync="calendar.range"
                  :weeks="calendar.weeks"
                  :months="calendar.months"
                  :sep="calendar.sep">
                </calendar>
                <div class="message">${errors.loanStartTimeError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="loanEndTime" class="col-sm-2 control-label">贷款结束日期：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input class="input" size="50" type="text" type="datetime" id="loanEndTime" name="loanEndTime"><br>

                <div class="message">${errors.loanEndTimeError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="contractNumber" class="col-sm-2 control-label">合同编号：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="contractNumber" id="contractNumber" v-model="contractNumber" class="form-control"/>
                <div class="message">${errors.contractNumberError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="loanAccount" class="col-sm-2 control-label">放款账号：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="loanAccount" id="loanAccount" v-model="loanAccount" class="form-control"/>
                <div class="message">${errors.loanAccountError}</div>
              </div>
            </div>
          </div>
        </form>
        <div class="col-xs-12 col-md-offset-5 contain">
          <button id="btn_submit" class="btn btn-success" v-on:click="custSign">保存</button>
        </div>
      </section>
    </div>
  </div>
</template>
<style scope>
</style>
<script>
  import QK from '../../QK'
  import calendar from "./calendar.vue"
    export default{
        components:{
          calendar
        },
        data: function(){
            return{
              contract:{
                customerCname: '',
                customerCardNumber: '',
                productName: '',
                approveAmount: '',
                approveRate: ''
              },
                contractId: '',
                loanStartTime: '',
                loanEndTime: '',
                contractNumber: '',
                loanAccount: '',
              errors:{
                loanStartTimeError: '',
                loanEndTimeError: '',
                contractNumberError: '',
                loanAccountError:''
              },
              calendar:{
                  show:false,
                  x:0,
                  y:0,
                  picker:"",
                  type:"date",
                  value:"",
                  begin:"",
                  end:"",
                  value:"",
                  sep:"/",
                  weeks:[],
                  months:[],
                  range:false,
                  items:{
                      // 单选模式
                      picker1:{
                          type:"date",
                          begin:"2016-08-20",
                          end:"2016-08-25",
                          value:"2016-08-21",
                          sep:"-",
                          weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                          months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      },
                      // 2个日期模式
                      picker2:{
                          type:"date",
                          value:"",
                          range:true,
                          sep:".",
                      },
                      // 日期时间模式
                      picker3:{
                          type:"datetime",
                          value:"",
                          sep:"-",
                      },
                      // 日期时间模式
                      picker4:{
                          type:"time",
                          value:"",
                      },
                  }
              }
            }
        },
        ready: function(){
            this.init()
        },
        watch: {
            'calendar.value': function (value) {
            this.calendar.items[this.calendar.picker].value=value
            }
        },
        methods:{
          init: function () {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL + '/api/applicationContract/' + id, true).then(function (data) {
              var data = $.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("contract", data.data)
                that.$set("contractId", data.data.contractId)
                //var contractId = data.data.contractId
                //console.log(contractId)
          }
        })
      },
         custSign: function () {
            var that = this
            var id = that.$route.params.id
            var contractId = that.contractId
            that.$http.put(QK.SERVER_URL + '/api/applicationContract',{
            applicationId:id,
            contractId: contractId,
            loanStartTime: that.loanStartTime,
            loanEndTime: that.loanEndTime,
            contractNumber: that.contractNumber,
            loanAccount: that.loanAccount
            }, true).then(function (data) {
              var data = $.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
             if (result.state) {
                  swal({
                      title: "修改成功!",
                      text: "",
                      confirmButtonColor: "#66BB6A",
                      type: "success",
                      confirmButtonText : '确定'
                  },
                  function(){
                       that.$router.go({path:"/system/application/cusSign"})
                  })
                }else{
                  swal({
                      title: "修改失败！",
                      text: result.msg+"！",
                      confirmButtonColor: "#EF5350",
                      type: "error",
                      confirmButtonText : '确定'
                   })
              }
        })
      },
      open(e,type) {
                // 设置类型
                this.calendar.picker=type
                this.calendar.type=this.calendar.items[type].type
                this.calendar.range=this.calendar.items[type].range
                this.calendar.begin=this.calendar.items[type].begin
                this.calendar.end=this.calendar.items[type].end
                this.calendar.value=this.calendar.items[type].value
                // 可不用写
                this.calendar.sep=this.calendar.items[type].sep
                this.calendar.weeks=this.calendar.items[type].weeks
                this.calendar.months=this.calendar.items[type].months
                this.calendar.show=true
                this.calendar.x=e.target.offsetLeft
                this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8
          }
       }
    }
</script>
