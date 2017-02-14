<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          填写申请表
        </header>
        <form class="form-horizontal" role="form" id="cusBasic">
          <input type="hidden" id="applicationId" name="applicationId"/>
          <div>
            <label for="reviewStartTime" style="margin-left: -320px;margin-top:15px;" class="col-sm-5 control-label">开始时间：</label>
            <input class="input" id="reviewStartTime" name="reviewStartTime" style="height:40px;" size="50" type="text" @click.stop="open($event,'picker3')" v-model="calendar.items.picker3.value"><br>
            <label for="reviewEndTime" style="margin-left: -320px;margin-top:15px;" class="col-sm-5 control-label">结束时间：</label>
            <input class="input" id="reviewEndTime" name="reviewEndTime" style="height:40px;margin-bottom:50px;" size="50" type="text" @click.stop="open($event,'picker5')"  v-model="calendar.items.picker5.value"><br>
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
            <label for="reviewPersonCname" class="col-sm-2 control-label">审贷会成员：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="reviewPersonCname" id="reviewPersonCname" v-model="reviewPersonCname" class="form-control"/>
                <div class="message">${errors.reviewPersonCnameError}</div>
              </div>
            </div>
          </div>
        </form>
        <div class="col-xs-12 col-md-offset-5 contain">
          <button id="btn_submit" class="btn btn-success" v-on:click="newRow">保存</button>
        </div>
      </section>
    </div>
  </div>
</template>
<style scope>
  label {
    display: inline-block;
    margin-bottom: 5px;
    font-weight: 400;
}
</style>
<script>
    import QK from '../../QK'
    import calendar from "./calendar.vue"
    export default{
        components:{
           calendar
        },
        data(){
            return{
              reviewStartTime: '',
              reviewEndTime: '',
              reviewPersonCname: '',
            errors: {
              reviewStartTimeError: '',
              reviewEndTimeError: '',
              reviewPersonCnameError: ''
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
         // 处理值的传递
        watch:{
            'calendar.value': function (value) {
                this.calendar.items[this.calendar.picker].value=value
            }
        },
        ready: function(){

        },
        methods:{
           newRow: function () {
            var that = this
            var id = that.$route.params.id
            that.$http.post(QK.SERVER_URL + '/api/applicationApprovalReview',{
            reviewStartTime: that.calendar.items.picker3.value,
            reviewEndTime: that.calendar.items.picker5.value,
            reviewPersonCname: that.reviewPersonCname
            }, true).then(function (data) {
              var data = $.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                  swal({
                      title: "创建成功!",
                      text: "",
                      confirmButtonColor: "#66BB6A",
                      type: "success",
                      confirmButtonText : '确定'
                  },
                  function(){
                       that.$router.go({path:"/system/application/rowApproval"})
                  })
                }else{
                  swal({
                      title: "创建失败！",
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
