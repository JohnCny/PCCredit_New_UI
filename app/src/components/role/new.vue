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
              <select v-model="role.roleNameZh" id="roleNameZh" class="form-control" name="roleNameZh">
                <option value="1">超级管理员</option>
                <option value="2">管理员</option>
                <option value="3" selected>客户经理</option>
                <option value="4">专家</option>
              </select>
              <div class="message">${errors.roleNameError}</div>
            </div>
          </div>
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleStatus" class="col-sm-2 control-label">角色状态</label>
            <div class="input-icon right col-sm-10">
              <select v-model="role.roleStatus" id="roleStatus" class="form-control" name="roleStatus">
                <option value="0" selected>正常</option>
                <option value="1">停用</option>
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
        <div class="panel-body">
          <template v-for="group in authority">
            <div class="row">
              <div class="form-group">
                <label class="col-sm-2 control-label">${group.groupName}</label>
                <div class="col-sm-10 icheck ">
                  <template v-for="auth in group.authorityList">
                    <div class="flat-grey">
                      <div class="radio">
                        <input v-bind:name="group.groupName" type="checkbox" v-bind:value="auth.id" v-model="auth.selected">
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
              <button id="btn_submit" v-on:click="newRole()" class="btn btn-success">确定</button>
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
    import jquery from 'jQuery'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
           return {
                role:{
                  roleName: '',
                  roleDescription: '',
                  roleStatus: '',
                  roleNameZh: '',
                },
                authority:[{
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
              that.$http.post(QK.SERVER_URL+'/api/role',that.role, true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  var optionObj = {
                    'that' : that,
                    'title' : '创建成功!',
                    'listUrl' : '/system/role/list'
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
         newRole:function() {
            var that = this

         },
         setIdArr: function(arr){
           var newArr = [],id;
           $.each(arr,function(i,v){
              $.each($(v)[0].authorityList,function(i,v){
                id = $(v)[0].selected?jQuery(v)[0].id:-1
                if(id!=-1){
                  newArr.push(id)
                }
              })
            })
            return newArr
         },
        init:function() {
            var that = this
            that.$http.get(QK.SERVER_URL+'/api/role/add', true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("authority", data.data)

              }
            })
         },
         cancelMethod(){
           this.$router.go({path:localStorage.nowurl})
       }
    }
}

</script>
