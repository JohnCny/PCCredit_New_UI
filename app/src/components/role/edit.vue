<style src="../../../static/js/iCheck/skins/flat/flat.css"></style>
<style src="../../../static/js/iCheck/skins/flat/_all.css"></style>
<style src="../../../static/js/iCheck/skins/flat/grey.css"></style>
<template>
  <form id="roleNew" @submit.prevent="handleSubmit">
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          填写角色信息
        </header>
        <div class="panel-body roleParent">
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleName" class="col-sm-2 control-label">角色英文名称</label>
            <div class="input-icon right col-sm-10">
              <input v-model="role.roleName" id="roleName" type="text" class="form-control" name="roleName" placeholder="请输入由数字、大小写字母以及下划线组成的3到12位字符">
              <div class="message">${errors.roleNameError}</div>
            </div>
          </div>
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleNameZh" class="col-sm-2 control-label">角色名称</label>
            <div class="input-icon right col-sm-10">
              <input v-model="role.roleNameZh" id="roleNameZh" type="text" class="form-control" name="roleNameZh">
              <div class="message">${errors.roleNameZhError}</div>
            </div>
          </div>
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleType" class="col-sm-2 control-label">角色类型</label>
            <div class="input-icon right col-sm-10">
              <select v-model="role.roleType" id="roleType" class="form-control" name="roleType">
                <option v-if="role.roleType==1" selected value="1">超级管理员</option>
                <option v-else value="1">超级管理员</option>
                <option v-if="role.roleType==2" selected value="2">管理员</option>
                <option v-else value="2">管理员</option>
                <option v-if="role.roleType==3" selected value="3">客户经理</option>
                <option v-else value="3">客户经理</option>
                <option v-if="role.roleType==4" selected value="4">专家</option>
                <option v-else value="4">专家</option>
              </select>
              <div class="message">${errors.roleTypeError}</div>
            </div>
          </div>
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleStatus" class="col-sm-2 control-label">角色状态</label>
            <div class="input-icon right col-sm-10">
              <select v-model="role.roleStatus" id="roleStatus" class="form-control" name="roleStatus">
                <option v-if="role.roleStatus==0" selected value="0">正常</option>
                <option v-else value="0">正常</option>
                <option v-if="role.roleStatus==1" selected value="1">停用</option>
                <option v-else value="1">停用</option>
              </select>
              <div class="message">${errors.roleStatusError}</div>
            </div>
          </div>
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleDescription" class="col-sm-2 control-label">角色描述</label>
            <div class="input-icon right col-sm-10">
              <textarea v-model="role.roleDescription" id="roleDescription" type="text" class="form-control" name="roleDescription">${role.roleDescription}</textarea>
              <div class="message">${errors.roleDescriptionError}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          配置角色权限
        </header>
        <div class="panel-body roleDiv">
          <template v-for="group in authority">
            <div class="row">
              <div class="form-group">
                <label class="col-sm-2 control-label">${group.groupName}</label>
                <div class="col-sm-10 icheck ">
                  <template v-for="auth in group.authorityList">
                  <div class="flat-grey">
                    <div class="radio">
                        <input v-if="auth.selected" checked v-bind:name="group.groupName" type="checkbox" v-bind:value="auth.id" v-model="auth.selected">
                        <input v-else v-bind:name="group.groupName" type="checkbox" v-bind:value="auth.id" v-model="auth.selected">
                      <label>${auth.authorityNameZh}</label>
                    </div>
                  </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <div class="row">
            <div class="col-md-12 col-md-offset-5" style="margin-top:30px;margin-bottom:20px;">
              <button class="btn btn-success">确定</button>
              <a v-on:click="cancelMethod()" type="reset" class="btn btn-default">取消</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  </form>
</template>
<style scoped>
  .roleParent input,.roleParent select,.roleParent textarea{
      width:50%
    }
</style>
<script>
    import QK from '../../QK'
    import icheck from 'icheck'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
           return {
                role:{
                    id: '',
                    roleName: '',
                    roleType: '',
                    roleDescription: '',
                    roleStatus: '',
                    roleNameZh: '',
                },
                authority:[{
                  groupName: '',
                  authorityList: [],
                }],
                oldAuthority:[{
                  groupName: '',
                  authorityList: [],
                }],
                errors:{
                  roleNameError: '',
                  roleNameZhError: '',
                  roleStatusError: '',
                  roleDescriptionError: '',
                },
             }
        },

        ready:function(){
          this.init()
          this.getoldAuthority()
          QK.addMethod()
        },
        methods:{
          handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#roleNew",
              rulesMap:{
                roleName:{required:!0,isRightfulString:!0},
                roleStatus:{required:!0},
                roleNameZh:{required:!0},
              }
            })
            //验证结果  true  false
            if(bool){
              that.role.authorityIds = that.setIdArr(that.authority)
              var oldIdsArr = that.setIdArr(that.oldAuthority)
              var newIdsArr = that.setIdArr(that.authority)
              delete that.role['createBy']
              delete that.role['createTime']
              //得到新旧数组authorityIds
              that.role.authorityIds = that.mergeNewOldIdArr(oldIdsArr,newIdsArr)
              that.$http.put(QK.SERVER_URL+'/api/role', that.role,true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                  var optionObj = {
                    'that' : that,
                    'title' : '修改成功!',
                    'listUrl' : '/system/role/list'
                  }
                  QK.successSwal(optionObj)
                }else{
                  var optionObj = {
                    'title' : '修改失败!',
                    'text' : result.msg+"！",
                  }
                  QK.errorSwal(optionObj)
                }
              })
            }
            return false
          },
          init:function() {
              var that = this
              var id = that.$route.params.id
              that.$http.get(QK.SERVER_URL+'/api/role/'+id, true).then(function (data) {
                var data = jQuery.parseJSON(data.body);
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  that.$set("role", data.data.role)
                  that.$set("authority", data.data.authority)
                }
              })
           },
           getoldAuthority: function(){
            var that = this
             var id = that.$route.params.id
              that.$http.get(QK.SERVER_URL+'/api/role/'+id, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                 if (result.state) {
                 that.$set("oldAuthority", data.data.authority)
                }
              })
           },
           setIdArr: function(arr){
             var newArr = [],id;
             $.each(arr,function(i,v){
                $.each($(v)[0].authorityList,function(i,v){
                  id = $(v)[0].selected?jQuery(v)[0].id:-1
                  newArr.push(id)
                })
              })
              return newArr
           },
           mergeNewOldIdArr: function(Oarr,Narr){
            var arr = []
            for(var i=0;i<Oarr.length;i++){
              if(Oarr[i] != Narr[i]){
                arr.push(Oarr[i]+','+Narr[i])
              }
            }
            return arr
           },
          cancelMethod(){
           this.$router.go({path:localStorage.nowurl})
          }
      }
  }


</script>
