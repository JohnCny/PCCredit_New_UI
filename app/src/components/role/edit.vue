<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          填写角色信息
        </header>
        <div class="panel-body">
          <div class="form-group" style="margin-top:30px;">
            <label for="roleName" class="col-sm-2 control-label">角色名称</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input v-model="role.roleName" id="roleName" type="text" class="form-control" name="roleName">
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
          <div>
            <template v-for="group in authority">
              <div class="col-md-3" style="margin-top:20px;">
                ${group.groupName}
                <select class="form-control">
                  <template v-for="auth in group.authorityList">
                    <option name="auth" id="auth" value="${auth.id}">${auth.authorityNameZh}</option>
                  </template>
                </select>
              </div>
            </template>
          </div>
          <div class="row">
            <div class="col-md-12 col-md-offset-5" style="margin-top:30px;margin-bottom:20px;">
              <button id="btn_submit" class="btn btn-success">确定</button>
              <a  v-link={path:'/system/role/list'} type="reset"  class="btn btn-default">取消</a>
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
    export default{
        data:function(){
           return {
                role:{
                  id: '',
                  roleName: ''
                },
                authorityList:[{
                  id: '',
                  authorityNameZh: ''
                }],
                authority:[{
                  groupName: ''
                }]
             }
        },

        ready:function(){
          this.init()
        },
        methods:{
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
         }
      }
  }

</script>
