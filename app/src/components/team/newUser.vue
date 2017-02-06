<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-md-4">
      <org-tree></org-tree>
    </div>
    <div class="col-md-8">
      <section class="panel">
        <header class="panel-heading">
          选择用户
        </header>
        <div class="panel-body">
          <form id="team_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>所属团队</label>
                  <div class="input-icon right">
                    <input v-model="team.teamId" type="hidden" name="teamId">
                    <input v-model="team.teamName" type="text" class="form-control" placeholder="请从团队列表选择" readonly>
                    <div class="message">${errors.teamIdError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <a class="btn btn-default" v-on:click="getTeam">获取成员列表</a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 teamuserCname" style="display:none">
                <div class="form-group">
                  <label for="userIds">成员</label>
                    <select v-bind:disabled="disabled" id="userIds" v-model="userIds" class="form-control select2-multiple" name="userIds" multiple>
                      <template v-for="teamLeader in teamLeaders">
                        <option  v-bind:value="teamLeader.userId">${teamLeader.userCname}</option>
                      </template>
                    </select>
                    <div class="message">${errors.userIdsError}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button class="btn btn-success">确定</button>
                <a v-on:click="cancelMethod" type="reset" class="btn btn-default">取消</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>


</template>
<style scoped>
</style>
<script>
    import QK from '../../QK'
    import select2 from 'select2'
    import ztree from 'ztree'
    import OrgTree from '../tree/teamTree.vue'
    export default{
        data:function(){
           return {
            team: {
              teamId: '',
              teamName: '',
            },
            disabled:false,
            userIds: [],
            teamLeaders: {
              userId: '',
              userCname: '',
            },
            errors:{
              teamIdError: '',
              userIdsError: []
            },
           }
        },
        ready:function(){
          QK.addMethod()
          this.ComponentsSelect2()
        },
        created: function(){
          QK.vector.$on('getfromchild',this.bindTeam)
        },
        beforeDestroy: function(){
          QK.vector.$off('getfromchild',this.bindTeam)
        },
        components: {
          OrgTree
        },
        methods:{
          bindTeam: function(team){
            this.team.teamId = team.teamParentId
            this.team.teamName = team.teamParentName
          },
          handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#team_new",
              rulesMap:{
                teamId: {required: !0},
                userIds: {required: !0},
              }
            })
            //验证结果  true  false
            if(bool){
              console.log($("#userIds").val())
              that.$http.post(QK.SERVER_URL+'/api/userTeam', {teamId: that.team.teamId,userIds: $("#userIds").val().join(",")}, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                  var optionObj = {
                    'that' : that,
                    'title' : '创建成功!',
                    'listUrl' : '/system/team/list'
                  }
                  QK.successSwal(optionObj)
                }else{
                  var optionObj = {
                    'title' : '创建失败!',
                    'text' : result.msg+"！",
                  }
                  QK.errorSwal(optionObj)
                }
              })
            }
            return false
          },
          getTeam: function(){
            if(this.team.teamId){
              this.getTeamData()
            }else{
              $(".teamuserCname").hide()
              alert("请先在团队列表选择团队")
            }
          },
          getTeamData: function(){
             this.$http.get(QK.SERVER_URL+'/api/team/teamAdmin',  true).then(function (data) {
              var data = jQuery.parseJSON(data.body)
              var result = QK.getStateCode(this,data.code)
              if (result.state) {
               this.$set('teamLeaders', data.data)
               $(".teamuserCname").slideDown(500)
              }
            })
          },
          cancelMethod:function(){
             this.$router.go({path:localStorage.nowurl})
          },
          ComponentsSelect2: function () {
              function e(e) {
                  if (e.loading)return e.text
                  var t = "<div class='select2-result-repository clearfix'><div class='select2-result-repository__avatar'><img src='" + e.owner.avatar_url + "' /></div><div class='select2-result-repository__meta'><div class='select2-result-repository__title'>" + e.full_name + "</div>"
                  return e.description && (t += "<div class='select2-result-repository__description'>" + e.description + "</div>"), t += "<div class='select2-result-repository__statistics'><div class='select2-result-repository__forks'><span class='glyphicon glyphicon-flash'></span> " + e.forks_count + " Forks</div><div class='select2-result-repository__stargazers'><span class='glyphicon glyphicon-star'></span> " + e.stargazers_count + " Stars</div><div class='select2-result-repository__watchers'><span class='glyphicon glyphicon-eye-open'></span> " + e.watchers_count + " Watchers</div></div></div></div>"
              }
              function t(e) {return e.full_name || e.text}
              $.fn.select2.defaults.set("theme", "bootstrap")
              var s = "请先从团队列表选择团队获取成员信息"
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
            },
        }
    }

</script>

