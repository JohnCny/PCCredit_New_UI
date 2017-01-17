<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          填写角色信息
        </header>
        <div class="panel-body">
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleName" class="col-sm-2 control-label">角色名称</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input v-model="role.roleNameZh" id="roleName" type="text" class="form-control" name="roleName">
              </div>
            </div>
          </div>
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleStatus" class="col-sm-2 control-label">角色状态</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <select v-model="role.roleStatus" id="roleStatus" class="form-control" name="roleStatus">
                  <option value="-1">--请选择--</option>
                  <option value="0">正常</option>
                  <option value="1">停用</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group row" style="margin-top:30px;">
            <label for="roleDescription" class="col-sm-2 control-label">角色描述</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <textarea id="roleDescription" type="text" class="form-control" name="roleDescription">${role.roleDescription}</textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div></div>

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
              <button id="btn_submit" v-on:click="init()" class="btn btn-success">确定</button>
              <a v-on:click="cancelMethod()" type="reset" class="btn btn-default">取消</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
    import QK from '../../QK'
    import jquery from 'jQuery'
    export default{
        data:function(){
           return {
                role:{
                  id: '',
                  roleName: '',
                  roleDescription: '',
                  roleStatus: '',
                  roleNameZh: '',
                },
                authority:[{
                  groupName: '',
                  authorityList: [],
                }],
             }
        },

        ready:function(){
          this.init()
        },
        methods:{
         newRole:function() {
            var that = this
            that.setIdArr(that.authority)
            that.$http.post(QK.SERVER_URL+'/api/role',that.role, true).then(function (data) {
              var data = jQuery.parseJSON(data.body)
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$router.go({path:'/system/role/list'})
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
        init:function() {
            var that = this
            that.$http.get(QK.SERVER_URL+'/api/role/add', true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("authority", data.data)
                that.$set("authorityList", data.data.authorityList)

              }
            })
         },
         cancelMethod(){
           this.$router.go({path:localStorage.nowurl})
       }
    }
}

</script>
