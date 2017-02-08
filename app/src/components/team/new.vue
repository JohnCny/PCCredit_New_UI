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
          填写团队信息
        </header>
        <div class="panel-body">
          <form id="team_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="isMenuType">是否机构类团队</label>
                  <div class="input-icon right">
                    <select v-model="infos.isMenuType" id="isMenuType" class="form-control" name="isMenuType" @change="checkMenuType">
                      <option value="0">是</option>
                      <option selected value="1">否</option>
                    </select>
                    <div class="message">${errors.isMenuTypeError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 teamParentDiv">
                <div class="form-group">
                  <label>父团队</label>
                  <div class="input-icon right">
                    <input v-model="infos.teamParentId" type="hidden" name="teamParentId">
                    <input v-model="infos.teamParentName" type="text" class="form-control" placeholder="请从团队列表选择" readonly>
                    <div class="message">${errors.teamParentIdError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="teamName">团队名称</label>
                  <div class="input-icon right">
                    <input v-model="infos.teamName" id="teamName" type="text" class="form-control" name="teamName" placeholder="请输入团队名称">
                    <div class="message">${errors.teamNameError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="nameDiv" class="form-group">
                  <label for="teamLeaderId">负责人</label>
                  <div class="input-icon right">
                    <select id="teamLeaderId" v-model="infos.teamLeaderId" class="form-control" name="teamLeaderId">
                      <option selected value="-1">--请选择--</option>
                      <template v-for="teamLeader in teamLeaders" >
                        <option v-bind:value="teamLeader.userId">${teamLeader.userCname}</option>
                      </template>
                    </select>
                    <div class="message">${errors.teamLeaderIdError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="teamDescription">团队描述</label>
                  <div class="input-icon right">
                    <input v-model="infos.teamDescription" id="teamDescription" type="text" class="form-control" name="teamDescription">
                    <div class="message">${errors.teamDescriptionError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button class="btn btn-success">确定</button>
                <a @click="cancelMethod" class="btn btn-default">取消</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
    .isHide{
      display:none
    }
</style>
<script>
  import QK from '../../QK'
  import ztree from 'ztree'
  import OrgTree from '../tree/teamTree.vue'
  export default{
    data:function(){
      return {
        infos:{
          teamName: '',	//团队名称	string
          teamLeaderId: 0,	//团队负责人id	number
          teamLeaderCname: '',	//团队负责人id	number
          isMenuType: '',	//是否机构类团队	number
          teamDescription: '',	//团队描述	strin
          teamParentId: 0,
          teamParentName: ''
        },
        teamLeaders: {
          id: '',
          roleName: '',
          roleNameZh: '',
          userCname: '',
          userId: ''
        },
        errors:{
          teamNameError: '',
          teamLeaderIdError: '',
          isMenuTypeError: '',
          teamDescriptionError: '',
          teamParentIdError: ''
        },
      }
    },
    ready:function(){
      QK.addMethod()
      this.getTeamLeaderData()
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
        this.infos.teamParentId = team.teamParentId
        this.infos.teamParentName = team.teamParentName
      },
      checkMenuType: function(){
        if($("#isMenuType").val() == 1){
            $(".teamParentDiv").show()
        }else{
            $(".teamParentDiv").hide()
        }
      },
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#team_new",
          rulesMap:{
            teamName: {required: !0},	//团队名称	string
            teamLeaderId: {required: !0, downList: !0},	//团队负责人id	number
            isMenuType: {required: !0, downList: !0},//是否机构类团队	number
            teamDescription: {required: !0},//团队描述	string
            teamParentId: {required: !0}
          }
        })
        //验证结果  true  false
        if(bool){
          delete that.infos['teamParentName']
          delete that.infos['url']
          delete that.infos['method']
          delete that.infos['emulateJSON']
          that.$set("infos.teamLeaderCname",$("#teamLeaderId option:selected").text())
          that.$http.post(QK.SERVER_URL+'/api/team', that.infos, true).then(function (data) {
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
      getTeamLeaderData: function(){
        var that = this
        that.$http.get(QK.SERVER_URL+'/api/team/teamAdmin', true).then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(that,data.code)
          if (result.state) {
           that.$set('teamLeaders', data.data)
          }
        })
      },
      cancelMethod:function(){
         this.$router.go({path:localStorage.nowurl})
      },
    }
  }

</script>

