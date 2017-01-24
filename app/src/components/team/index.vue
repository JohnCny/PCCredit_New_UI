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
          团队成员列表 <a v-on:click="showNewPage" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> 新增成员</a>
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-4 col-md-4 col-sm-12">
              <span>用户：</span>
              <input id="userCname" v-model="search.userCname" type="text" name="userCname"/>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12" style="text-align:center">
              <button v-on:click="init" class="btn btn-info btn-sm" type="button">搜 索</button>
              <button v-on:click="reset" class="btn btn-info btn-sm" type="button">查看所有团队用户</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>姓名</th>
                <th>性别</th>
                <th>联系方式</th>
                <th>创建时间</th>
                <th>用户状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template  v-if="infos.length" >
                <tr v-for="info in infos" v-bind:id="info.id">
                  <td>${info.userCname}</td>
                  <td>${info.sex | reSex}</td>
                  <td>${info.tel}</td>
                  <td>${info.createTime | formatDate}</td>
                  <td><span class="label label-sm ${info.status | reStatusClass}">${info.status | reStatus}</span></td>
                  <td><a v-on:click="deleteInfo(info.id)" class="btn btn-danger btn-xs"><i class="fa fa-eraser"></i> 移除该成员</a></td>
                </tr>
              </template>
              <template  v-else>
                <tr>
                  <td colspan="6">没有数据</td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
          <div class="page-bar">
            <ul>
              <li v-if="currentpage"><a v-on:click="currentpage--" v-bind:class="{hide:currentpage==1}">上一页</a></li>
              <li v-for="index in pagenums" v-bind:class="{ active: currentpage == index}">
                <a v-on:click="pageChange(index)">${index}</a>
              </li>
              <li v-if="currentpage!=totlepage"><a v-on:click="currentpage++">下一页</a></li>
              <li><a>共<i>${totlepage}</i>页</a></li>
            </ul>
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
    import ztree from 'ztree'
    import OrgTree from '../tree/teamTreeEdit.vue'
    export default{
        data:function(){
           return {
            infos: {
              id: '',
              userCname: '',
              sex: '',
              tel: '',
              status: '',
              idCardNumber: '',
              roleId: '',
              email: '',
            },
            currentpage: 1,//第几页
            totlepage: '',//共几页
            visiblepage: 10,//隐藏10页
            teamId: '',
            search: {
              userCname: '',
            }
           }
        },
        ready:function(){
          this.init()
        },
        created: function(){
          QK.vector.$on('getfromchild',this.bindTeamId)
        },
        beforeDestroy: function(){
          QK.vector.$off('getfromchild',this.bindTeamId)
        },
        computed: {
          pagenums: function () {
            //初始化前后页边界
            var lowPage = 1
            var highPage = this.totlepage
            var pageArr = [];
            if (this.totlepage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
              var subVisiblePage = Math.ceil(this.visiblepage / 2)
              if (this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage + 1) {//处理正常的分页
                lowPage = this.currentpage - subVisiblePage
                highPage = this.currentpage + subVisiblePage - 1
              } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
                lowPage = 1;
                highPage = this.visiblepage
              } else {//处理后几页的逻辑
                lowPage = this.totlepage - this.visiblepage + 1;
                highPage = this.totlepage
              }
            }
            //确定了上下page边界后，要准备压入数组中了
            while (lowPage <= highPage) {
              pageArr.push(lowPage);
              lowPage++;
            }
            return pageArr;
          },
        },
        watch: {
          currentpage: function (oldValue, newValue) {
            this.init()
          }
        },
        components: {
          OrgTree
        },
        methods:{
          init : function(){
            var that = this
            var searchAll = {
              pageStart : that.currentpage,
              pageLength : that.visiblepage,
              teamId : that.teamId,
              pageSearch : JSON.stringify(that.search)
            }
            that.$http.post(QK.SERVER_URL+'/api/team/pageList',searchAll, true).then(function(res){
              var data = $.parseJSON(res.body)
              var page = parseInt(data.recordsTotal / 10)
              if (data.recordsTotal % 10) {
                page = page + 1
              }
              that.$set('totlepage', page)
              that.$set('infos', data.data)
            })
          },
          pageChange: function (page) {
            page = page || 1
            var that = this
            if (that.currentpage != page) {
              that.currentpage = page
            }
          },
          bindTeamId: function(teamId){
            this.$set('teamId', teamId)
            this.init()
          },
          reset: function(){
            this.$set('teamId', 0)
            this.init()
          },
          showInfo:function (id) {
            //记录当前地址
            QK.noteNowUrl()
            //跳转地址
            this.$router.go({path:'/system/team/edit/'+id})
          },
          showNewPage:function () {
            //记录当前地址
            QK.noteNowUrl()
            //跳转地址
            this.$router.go({path:'/system/team/newUser'})
          },
          deleteInfo: function (id) {
            var that = this
            if(that.teamId){
              that.$http.delete(QK.SERVER_URL+'/api/userTeam?teamId='+that.teamId+'&userIds='+id,true).then(function(res){
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    var optionObj = {
                      'that' : that,
                      'title' : '移除成功!',
                      'listUrl' : '/system/team/list'
                    }
                    QK.successSwal(optionObj)
                    $('#'+id).remove()
                  }else{
                    var optionObj = {
                      'title' : '移除失败!',
                      'text' : result.msg+"！"
                    }
                    QK.errorSwal(optionObj)
                  }
              })
            }else{
              alert("请先在团队列表选择团队!")
            }
          },
        }
    }

</script>

