<style src='../../../static/js/select2/css/select2.min.css'></style>
<style src='../../../static/js/select2/css/select2-bootstrap.min.css'></style>
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
            <label for="theRow" class="col-sm-2 control-label">所属行业：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <select id="theRow" name="theRow" v-model="theRow" class="form-control select2-multiple" multiple>
                  <template v-for="row in theRowAll">
                    <option  v-if="theRow.indexOf(row.userId)>=0" selected value="${row.userId}">${row.userName}</option>
                    <option  v-else value="${row.userId}">${row.userName}</option>
                  </template>
                </select>
                <div class="message">${errors.theRowError}</div>
              </div>
            </div>
          </div>
        </form>
        <div class="col-xs-12 col-md-offset-5 contain">
          <button id="btn_submit" class="btn btn-success" v-on:click="save">保存</button>
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
    import select2 from 'select2'
    import calendar from "./calendar.vue"
    export default{
        components:{
           calendar
        },
        data(){
            return{
              reviewStartTime: '',
              reviewEndTime: '',
              theRow: ['',''],
            errors: {
              reviewStartTimeError: '',
              reviewEndTimeError: '',
              theRowError: ''
            },
            theRowAll:[],
            theRow:[],
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
                    },
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
          this.init()
          this.getRow()
          this.ComponentsSelect2()
        },
        methods:{
          init: function () {
              var that = this
              var id = that.$route.params.id
              that.$http.get(QK.SERVER_URL + '/api/applicationApprovalReview/' + id, true).then(function (data) {
                var data = $.parseJSON(data.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  var datePicker1 = that.formatDate(data.data.reviewStartTime, true)
                  var datePicker2 = that.formatDate(data.data.reviewEndTime, true)
                  that.$set("calendar.items.picker3.value", datePicker1)
                  that.$set("calendar.items.picker5.value", datePicker2)
                  that.$set("theRowAll", data.data[0].tApplicationApprovalUsers)
              }
           })
        },
        getRow: function () {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL + '/api/ApplicationApprovalUsers/'+id, true).then(function (data) {
              var data = $.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("theRow",[])
                $(data.data).each(function(i,v){
                  that.theRow.push($(v)[0].id)
                })
            }
         })
      },

           save: function () {
            var that = this
            var id = that.$route.params.id
            var theRow = that.theRow
            var theRow = $("#theRow").val().join(',')
            that.$http.put(QK.SERVER_URL + '/api/applicationApprovalReview',{
            applicationId:id,
            reviewStartTime: that.calendar.items.picker3.value,
            reviewEndTime: that.calendar.items.picker5.value,
            userIds: theRow
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
                       that.$router.go({path:"/system/application/rowApproval"})
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
           add0:function() {
           return m < 10 ? '0' + m : m
         },
           formatDate: function(num,bool) {
          if (num) {
            var myDate = new Date(num),
              year = myDate.getFullYear(),
              month = myDate.getMonth() + 1,
              date = myDate.getDate(),
              hour = myDate.getHours(),
              minute = myDate.getMinutes(),
              second = myDate.getSeconds(),
              dateStr = year + "-" + add0(month) + "-" + add0(date),
              timeStr = "   " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
            if (bool) {
              return dateStr + timeStr
            } else {
              return dateStr
            }
          }
          else {
            return '未填写'
          }
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
            },
            ComponentsSelect2: function () {
                function e(e) {
                    if (e.loading)return e.text
                    var t = "<div class='select2-result-repository clearfix'><div class='select2-result-repository__avatar'><img src='" + e.owner.avatar_url + "' /></div><div class='select2-result-repository__meta'><div class='select2-result-repository__title'>" + e.full_name + "</div>";
                    return e.description && (t += "<div class='select2-result-repository__description'>" + e.description + "</div>"), t += "<div class='select2-result-repository__statistics'><div class='select2-result-repository__forks'><span class='glyphicon glyphicon-flash'></span> " + e.forks_count + " Forks</div><div class='select2-result-repository__stargazers'><span class='glyphicon glyphicon-star'></span> " + e.stargazers_count + " Stars</div><div class='select2-result-repository__watchers'><span class='glyphicon glyphicon-eye-open'></span> " + e.watchers_count + " Watchers</div></div></div></div>"
                }

                function t(e) {
                    return e.full_name || e.text
                }

                $.fn.select2.defaults.set("theme", "bootstrap");
                var s = "请选择";
                $(".select2, .select2-multiple").select2({
                    placeholder: s,
                    width: null
                }), $(".select2-allow-clear").select2({
                    allowClear: !0,
                    placeholder: s,
                    width: null
                }), $(".js-data-example-ajax").select2({
                    width: "off",
                    ajax: {
                        url: "https://api.github.com/search/repositories",
                        dataType: "json",
                        delay: 250,
                        data: function (e) {
                            return {q: e.term, page: e.page}
                        },
                        processResults: function (e, t) {
                            return {results: e.items}
                        },
                        cache: !0
                    },
                    escapeMarkup: function (e) {
                        return e
                    },
                    minimumInputLength: 1,
                    templateResult: e,
                    templateSelection: t
                }), $("button[data-select2-open]").click(function () {
                    $("#" + $(this).data("select2-open")).select2("open")
                }), $(":checkbox").on("click", function () {
                    $(this).parent().nextAll("select").prop("disabled", !this.checked)
                }), $(".select2, .select2-multiple, .select2-allow-clear, .js-data-example-ajax").on("select2:open", function () {
                    if ($(this).parents("[class*='has-']").length)for (var e = $(this).parents("[class*='has-']")[0].className.split(/\s+/), t = 0; t < e.length; ++t)e[t].match("has-") && $("body > .select2-container").addClass(e[t])
                }), $(".js-btn-set-scaling-classes").on("click", function () {
                    $("#select2-multiple-input-sm, #select2-single-input-sm").next(".select2-container--bootstrap").addClass("input-sm"), $("#select2-multiple-input-lg, #select2-single-input-lg").next(".select2-container--bootstrap").addClass("input-lg"), $(this).removeClass("btn-primary btn-outline").prop("disabled", !0)
                })
            }
        }

    }
</script>
