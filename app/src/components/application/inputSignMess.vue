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
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          签约信息
        </header>
        <form class="form-horizontal" role="form" id="cusBasic">
          <input type="hidden" id="applicationId" name="applicationId"/>
          <input type="hidden" id="contractId" name="contractId"/>
          <div>
            <label for="contractNumber" style="margin-left: -320px;margin-top:15px;" class="col-sm-5 control-label">贷款开始时间：</label>
            <input class="input" style="height:40px;" size="50" type="text" @click.stop="open($event,'picker3')" v-model="calendar.items.picker3.value" placeholder="请输入贷款开始时间"><br>
            <label for="contractNumber" style="margin-left: -320px;margin-top:15px;" class="col-sm-5 control-label">贷款结束时间：</label>
            <input class="input" style="height:40px;margin-bottom:50px;" size="50" type="text" @click.stop="open($event,'picker5')" v-model="calendar.items.picker5.value" placeholder="请输入贷款结束时间"><br>
              <calendar style="z-index: 1;"
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
*{
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    font-family: "Helvetica Neue","Arial","PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    -webkit-touch-callout:none;
    -webkit-font-smoothing: antialiased;
}
b{
    font-weight: 600;
}
svg:not(:root) {
    overflow: hidden;
}
img {
    vertical-align: middle
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
a {
    text-decoration: none;
    color: #353535;
}
a:hover {
    text-decoration: none;
}
abbr[title] {
    border-bottom: 1px dotted;
}
b, strong {
    font-weight: 600;
}
dfn {
    font-style: italic;
}
mark {
    background: #ff0;
    color: #000;
}
code, kbd, pre, samp {
    font-family: monospace, serif;
    font-size: 1em;
}
pre {
    white-space: pre-wrap;
}
small {
    font-size: 80%;
}
sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}
sup {
    top: -0.5em;
}
sub {
    bottom: -0.25em;
}

h1, h2, h3, h4, h5, h6 {
    font-family: inherit;
    font-weight: bold;
    margin: 8px 0;
    line-height: 120%;
}
article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary {
    display: block;
}
audio, canvas, video {
    display: inline-block;
}
audio:not([controls]) {
    display: none;
    height: 0;
}
address, caption, cite, code, dfn, em, th, var {
    font-style: normal;
    font-weight: 500;
}
/* placeholder focus */
input:focus::-webkit-input-placeholder ,
textarea:focus::-webkit-input-placeholder {
    color: transparent;
}
input:focus::-moz-input-placeholder,
textarea:focus::-moz-input-placeholder {
    color: transparent;
}
input:focus::-ms-input-placeholder,
textarea:focus::-ms-input-placeholder {
    color: transparent;
}
::-ms-clear {
    display: none;
}
::selection {
    background: #333;
    color: white;
}
textarea {
    overflow: auto;
    vertical-align: top;
    resize:none;
}
/* 定位对齐 */
.pa,.absolute {
    position: absolute
}
.pr,.relative {
    position: relative;
}
.pf,.fixed {
    position: fixed
}
/* 手指 */
.cp,.pointer {
    cursor: pointer;
}
/* 文本对齐 */
.text.center {
    text-align: center;
}
.text.left {
    text-align: left;
}
.text.right {
    text-align: right;
}
/* 浮动对齐 */
.float.left, .float.right {
    display: inline;
}
.float.left {
    float: left;
}
.float.right {
    float: right;
}
.clear {
    clear: both;
    zoom: 1;
    font-size: 0;
    height: 0;
}
.clear:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,1) inset !important;
}
html,body {
    background-color: #fff;
    font-size: 14px;
    font-family: "Helvetica Neue","Arial","PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    line-height: 100%;
    height:100%;
    color: #555;
}
.input{
    border-radius: 2px;
    border:1px solid #dedede;
    padding:10px;
    font-size: 16px;
    <!--background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;-->
        padding-left: 36px;
        color:#666;
}
</style>
<script>
import QK from '../../QK'
import calendar from "./calendar.vue"
export default {
    components:{
        calendar
    },
    data() {
        return {
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
            // 数据绑定
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
                    // 时间模式
                    picker4:{
                        type:"time",
                        value:"",
                    },
                    // 日期时间模式
                    picker5:{
                        type:"datetime",
                        value:"",
                        sep:"-",
                    }
                }
            }
        }
    },
     ready: function(){
         this.init()
     },
     // 处理值的传递
    watch:{
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
            loanStartTime: that.calendar.items.picker3.value,
            loanEndTime: that.calendar.items.picker5.value,
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
        // 打开显示选择器
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
