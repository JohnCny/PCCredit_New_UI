<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          填写申请表
        </header>
        <form class="form-horizontal" role="form" id="cusBasic">
          <input type="hidden" id="applicationId" name="applicationId"/>
          <div class="form-group col-md-offset-4" style="margin-top:30px;margin-left:50px;">
            <label for="reviewStartTime" class="col-sm-2 control-label">开始时间：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="reviewStartTime" id="reviewStartTime" v-model="reviewStartTime" class="form-control"/>
                <div class="message">${errors.reviewStartTimeError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:50px;">
            <label for="reviewEndTime" class="col-sm-2 control-label">结束时间：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="reviewEndTime" id="reviewEndTime" v-model="reviewEndTime" class="form-control"/>
                <div class="message">${errors.reviewEndTimeError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="applyteam" class="col-sm-2 control-label">审贷会成员：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="applyteam" id="applyteam" v-model="applyteam" class="form-control"/>
                <div class="message">${errors.applyteamError}</div>
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
<style>
</style>
<script>
    import QK from '../../QK'
    export default{
        data(){
            return{
              reviewStartTime: '',
              reviewEndTime: '',
              applyteam: '',
            errors: {
              reviewStartTimeError: '',
              reviewEndTimeError: '',
              applyteamError: ''
            }
          }
        },
        ready: function(){

        },
        methods:{
           save: function () {
            var that = this
            var id = that.$route.params.id
            that.$http.get(QK.SERVER_URL + '/api/applicationApprovalReview/' + id, true).then(function (data) {
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
          }

        }

    }
</script>
