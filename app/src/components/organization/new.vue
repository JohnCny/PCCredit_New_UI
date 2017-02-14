<template>
  <div class="row">
    <div class="col-md-4">
      <org-tree></org-tree>
    </div>
    <div class="col-md-8">
      <section class="panel">
        <header class="panel-heading">
          填写机构信息
        </header>
        <div class="panel-body">
          <form id="org_new" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="orgParentName">父机构</label>
                  <div class="input-icon right orgNameDiv">
                    <input v-model="tOrganization.orgParentName" id="orgParentName" type="text" class="form-control"
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
                    <select id="orgDirectorName" v-model="tOrganization.orgDirectorId" class="form-control" name="orgDirectorId">
                      <option selected value="-1">--请选择--</option>
                      <template v-for="orgLeader in orgLeaders" >
                        <option v-bind:value="orgLeader.userId">${orgLeader.userCname}</option>
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
  #org_new input, #org_new select {
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
          orgDirectorName: '',
          orgDirectorId: '',
          orgParentId: '',
          orgParentName: '',
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
      QK.addMethod()
      this.getTeamLeaderData()
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
          id: "#org_new",
          rulesMap: {
            orgName: {required: !0},
            orgDirectorName: {required: !0},
            //orgLogisticsId:{required: !0}
          }
        })
        //验证结果  true  false
        if (bool) {
          delete that.tOrganization['orgParentName']
          console.dir(that.tOrganization)
          that.$set("tOrganization.orgDirectorName",$("#orgDirectorName option:selected").text())
          that.$http.post(QK.SERVER_URL + '/api/organization', that.tOrganization, true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              swal({
                  title: "创建成功!",
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
                title: "创建失败！",
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
      cancelMethod: function () {
        this.$router.go({path: localStorage.nowurl})
      },
      bindOrg: function (org) {
        this.$set('tOrganization.orgParentId', org.orgId)
        this.$set('tOrganization.orgParentName', org.orgName)
      },
      hideOrgName: function () {
        var that = this
        that.$set('tOrganization.orgParentId', '')
        that.$set('tOrganization.orgParentName', '')
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
        }).then(function(){
          QK.getActive(localStorage.nowurl)
        })
      },
    }
  }

</script>
