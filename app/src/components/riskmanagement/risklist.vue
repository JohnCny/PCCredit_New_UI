<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          逾期/不良客户列表
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>客户经理名称：</span><input v-model="search.userCname" type="text" name="productName"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>工号：</span><input v-model="search.employeeNumber" type="text" name="productState"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>所属日期：</span>
              <input class="input" size="50" type="text" @click.stop="open($event,'picker3')" v-model="calendar.items.picker3.value" placeholder=""><br>
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
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12" style="text-align:center">
              <button v-on:click="init()" class="btn btn-info btn-sm" type="button">搜 索</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>客户名称</th>
                <th>证件号码</th>
                <th>进入风险名单日期</th>
                <th>原因</th>
                <th>状态</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.customerName}</td>
                <td>${info.idCard}</td>
                <td>${info.createTime}</td>
                <td>${info.badReason}</td>
                <td v-if="info.customerStatus == 0">正常</td>
                <template v-else>
                  <td v-if="info.customerStatus == 1">高风险用户</td>
                  <template v-else>
                    <td v-if="info.customerStatus == 2">黑名单用户</td>
                    <template v-else>
                      <td v-if="info.customerStatus == 3">高风险转黑名单审核</td>
                      <template v-else>
                        <td v-if="info.customerStatus == 4">黑名单转出</td>
                      </template>
                    </template>
                  </template>
                </template>
                <td>
                  <a v-if="info.customerStatus == 1" class="btn btn-warning btn-xs" v-on:click="editInfo(info.customerId)">转出风险名单</a>
                  <a v-else class="btn btn-default btn-xs" href="javascript:void (0);">转出风险名单</a>
                  <a v-if="info.customerStatus == 1" class="btn btn-warning btn-xs" v-on:click="editInfo(info.id)">转入风险名单</a>
                  <a v-else class="btn btn-default btn-xs" href="javascript:void (0);">转入风险名单</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="page-bar">
            <ul>
              <li v-if="currentpage"><a v-on:click="currentpage--" v-bind:class="{hide:currentpage==1}">上一页</a></li>
              <li v-for="index in pagenums" v-bind:class="{ active: currentpage == index}">
                <a v-on:click="pageChange(index)">${index}</a>
              </li>
              <li v-if="currentpage!=totlepage"><a v-on:click="currentpage++">下一页</a></li>
              <li><a>共<i>${totlepage}</i>页</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>


</template>
<style scoped>
</style>
<script>
    import QK from '../../QK'
    import swal from 'sweetalert'
    import calendar from "./calendar.vue"
    export default{
        components:{
        calendar
        },
        data:function(){
           return {
              infos:{
                customerName: '',
                idCard: '',
                createTime: '',
                badReason: '',
                riskType:'',
              },
              currentpage: 1,//第几页
              totlepage: '',//共几页
              visiblepage: 10,//隐藏10页
              search:{
                   userCname: '',
                   employeeNumber: '',
                   createTime:''
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
                          type:"date",
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
        ready:function(){
          this.init();
        },
         computed: {
            pagenums: function () {
              //初始化前后页边界
              var lowPage = 1
              var highPage = this.totlepage;
              var pageArr = []
              if (this.totlepage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
                var subVisiblePage = Math.ceil(this.visiblepage / 2)
                if (this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage + 1) {//处理正常的分页
                  lowPage = this.currentpage - subVisiblePage;
                  highPage = this.currentpage + subVisiblePage - 1
                } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
                  lowPage = 1;
                  highPage = this.visiblepage;
                } else {//处理后几页的逻辑
                  lowPage = this.totlepage - this.visiblepage + 1
                  highPage = this.totlepage;
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
            },
            'calendar.value': function (value) {
            this.calendar.items[this.calendar.picker].value=value
            }
        },
        methods:{
            init:function() {
                var that = this
                var searchAll = {
                      pageStart : that.currentpage,
                      pageLength : that.visiblepage,
                      pageSearch : JSON.stringify(that.search)
                    }
                that.$http.post(QK.SERVER_URL+'/api/riskCustomer/pageList', searchAll , true).then(function (data) {
                  var data = jQuery.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  var page = parseInt(data.recordsTotal / 10);
                  if (data.recordsTotal % 10) {
                    page = page + 1;
                  }
                   that.$set('totlepage', page)
                  if (result.state) {
                    that.$set("infos", data.data)
                  }
               })
          },
           pageChange: function (page) {
                page = page || 1
                var that = this
                if (that.currentpage != page) {
                  that.currentpage = page
                }
            },
           editInfo:function(id){
                //记录当前地址
                QK.noteNowUrl()
                //跳转地址
                this.$router.go({path: '/system/riskmanagement/outrisklist/' + id})
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
