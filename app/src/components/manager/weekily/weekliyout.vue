<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理周报
        </header>
        <div class="panel-body">
          <form action="" id="managerLevelEdit">
            <div class="row">
              <div class="col-md-4 col-md-offset-4">
                <div class="form-group">
                  <label for="">导出时间</label>
                  <div class="input-icon right">
                    <input class="input form-control" size="50" readonly="readonly" type="text" @click.stop="open($event,'picker3')" v-model="calendar.items.picker3.value" placeholder=""><br>
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
                    <div class="message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" style="text-align:center;margin-top:250px">
                <button id="btn_submit" class="btn btn-success">确定</button>
                <a @click="cancelMethod()" class="btn btn-default">取消</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  #managerLevelEdit input, #managerLevelEdit select {
    width: 80%
  }

  .message {
    color: #a94442;
    height: 20px;
  }
</style>
<script>
  import QK from '../../../QK'
  import jQueryValidation from 'jquery-validation'
  import calendar from "../../calendar/calendar.vue"
  export default{
     components:{
      calendar
    },
    data: function () {
      return {
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
    ready: function () {
      this.init()
      QK.addMethod()
    },
    watch: {
        'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value=value
        }
    },
    methods: {
      init: function () {
        //var that = this
        //var id = that.$route.params.id
        //that.$http.get(QK.SERVER_URL + '/api/customerManagerLevel/' + id, true).then(function (data) {
          //var data = $.parseJSON(data.body)
          //var result = QK.getStateCode(that, data.code)
          //if (result.state) {

          //}
        //})
      },
      cancelMethod:function(){
         this.$router.go({path:localStorage.nowurl})
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
