<template>
  <div class="row">
    <div class="col-md-4">
      <org-tree></org-tree>
    </div>
    <div class="col-md-8">
      <section class="panel">
        <header class="panel-heading">
          编辑机构信息
        </header>
        <div class="panel-body">
          <form id="org_edit" @submit.prevent="handleSubmit">
            <input type="hidden" name="id" id="id" v-model="tOrganization.id"/>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="orgParentName">父机构</label>
                  <div class="input-icon right orgNameDiv">
                    <input v-model="tOrganization.parentOrg.orgName" id="orgParentName" type="text" class="form-control"
                           name="orgParentName" readonly placeholder="请从机构列表选择">
                    <i v-on:click="hideOrgName" class="fa fa-times closeI"></i>
                    <div class="message"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="orgName">机构名称</label>
                  <div class="input-icon right">
                    <input v-model="tOrganization.orgName" id="orgName" type="text" class="form-control" name="orgName"
                           placeholder="请输入机构名称">
                    <div class="message">${errors.orgNameError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="nameDiv" class="form-group">
                  <label for="orgDirectorName">负责人</label>
                  <div class="input-icon right">
                    <select id="orgDirectorId" v-model="tOrganization.orgDirectorId" class="form-control" name="orgDirectorId">
                      <option selected value="-1">--请选择--</option>
                      <template v-for="orgLeader in orgLeaders" >
                        <option v-if="tOrganization.orgDirectorId == orgLeader.userId"  selected v-bind:value="orgLeader.userId">${orgLeader.userCname}</option>
                        <option v-else v-bind:value="orgLeader.userId">${orgLeader.userCname}</option>
                      </template>
                    </select>
                    <div class="message">${errors.orgDirectorNameError}</div>
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
  #org_edit input, #org_edit select {
    width: 80%
  }

  .message {
    color: #a94442;
    height: 20px;
  }

  .orgNameDiv {
    position: relative
  }

  .orgNameDiv .closeI {
    position: absolute;
    line-height: 30px;
    font-size: 16px;
    font-style: normal;
    color: #d2322d;
    right: 21%;
    top: 5%;
    width: 16px;
    text-algin: center;
  }
</style>
<script>
  import QK from '../../QK'
  import ztree from 'ztree'
  import OrgTree from '../tree/orgTree.vue'
  import jQueryValidation from 'jquery-validation'
  export default{
    data: function () {
      return {
        tOrganization: {
          orgName: '',
          orgDirectorId: '',
          parentOrg: {id:'',orgName:''},
          orgParentId: '',
          orgLevel: 1
        },
        orgLeaders: {},
        errors: {
          orgNameError: '',
          orgDirectorNameError: '',
        }
      }
    },
    ready: function () {
      this.init()
      this.getTeamLeaderData()
      QK.addMethod()
    },
    created: function () {
      QK.vector.$on('getfromchild', this.bindOrg)
    },
    beforeDestroy: function () {
      QK.vector.$off('getfromchild', this.bindOrg)
    },
    components: {
      OrgTree
    },
    methods: {
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#org_edit",
          rulesMap: {
            orgName: {required: !0},
            orgDirectorName: {required: !0},
          }
        })
        //验证结果  true  false
        if (bool) {
          that.$set("tOrganization.orgParentId",tOrganization.parentOrg.id)
          console.log(that.tOrganization)
          console.log(that.tOrganization.parentOrg.id)
          delete that.tOrganization['parentOrg']
          that.$http.put(QK.SERVER_URL + '/api/organization', that.tOrganization, true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              swal({
                  title: "修改成功!",
                  text: "",
                  confirmButtonColor: "#66BB6A",
                  type: "success",
                  confirmButtonText: '确定'
                },
                function () {
                  that.$router.go({path: "/system/organization/list"})
                })
            } else {
              swal({
                title: "修改失败！",
                text: result.msg + "！",
                confirmButtonColor: "#EF5350",
                type: "error",
                confirmButtonText: '确定'
              })
            }
          })
        }
        return false
      },
      init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/organization/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("tOrganization", data.data)
            console.log(that.tOrganization)
          }
        })
      },
      cancelMethod(){
        this.$router.go({path: localStorage.nowurl})
      },
      bindOrg: function (org) {
        this.$set('tOrganization.parentOrg.id', org.orgId)
        this.$set('tOrganization.parentOrg.orgName', org.orgName)
      },
      hideOrgName: function () {
        var that = this
        that.$set('tOrganization.parentOrg.id', '')
        that.$set('tOrganization.parentOrg.orgName', '')
      },
      changeOrg: function () {
        var that = this
        if (!that.search.orgParentName) {
          that.$set('search.orgParentId', '')
        }
      },
      getTeamLeaderData: function(){
        var that = this
        that.$http.get(QK.SERVER_URL+'/api/user/role/'+JSON.parse(localStorage.user).roleType, true).then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(that,data.code)
          if (result.state) {
           that.$set('orgLeaders', data.data)
          }
        })
      },
    }
  }

</script>

