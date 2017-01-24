<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-4">
      <org-tree></org-tree>
    </div>
    <div class="col-sm-8">
      <section class="panel">
        <header class="panel-heading">
          用户信息 <a v-on:click="show" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> 新增</a>
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>身份证：</span><input v-model="search.idCardNumber" type="text" name="idCardNumber"/>
            </div>
            <div class="orgNameDiv col-lg-3 col-md-3 col-xs-12">
              <span>机&nbsp;&nbsp;&nbsp;&nbsp;构：</span>
              <input id="orgName" v-on:change='changeOrg' v-model="search.orgName" type="text" placeholder="机构名称"
                     readonly/>
              <i v-on:click="hideOrgName" class="fa fa-times closeI"></i>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>用户名：</span><input v-model="search.username" type="text" name="username"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12" style="text-align:center">
              <button v-on:click="init" class="btn btn-info btn-sm" type="button">搜 索</button>
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
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <template  v-if="infos.length" >
                <tr v-for="info in infos">
                  <td>${info.userCname}</td>
                  <td>${info.sex | reSex}</td>
                  <td>${info.tel}</td>
                  <td>${info.createTime | formatDate}</td>
                  <td><span class="label label-sm ${info.status | reStatusClass}">${info.status | reStatus}</span></td>
                  <td><a href="javascript:;" v-on:click="showInfo(info.id)" class="btn btn-info btn-xs"><i class="fa fa-edit"></i>编辑 </a></td>
                  <td><a v-on:click="resetPwd(info.id)" class="btn btn-xs" style="background-color: #424F63;color:#fff"><i class="fa fa-lock"></i>密码重置</a></td>
                </tr>
              </template>
              <template  v-else>
              <tr v-else>
                <td colspan="7">没有数据</td>
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
  .orgNameDiv{
    position:relative
  }
  .orgNameDiv .closeI{
    position: absolute;
    line-height: 30px;
    font-size: 16px;
    font-style: normal;
    color: #d2322d;
    right: 25%;
    width: 16px;
    text-algin: center;
  }
  #orgName{
    cursor: not-allowed;
    background-color: #eee;
    opacity: 1;
  }

</style>
<script>
  import QK from '../../QK'
  import swal from 'sweetalert'
  import ztree from 'ztree'
  import OrgTree from '../tree/orgTree.vue'
  export default{
    data: function () {
      return {
        crumbData: {
          currentLocal: '用户管理',
          currentLocalData: '用户列表',
          currentUser: '用户列表'
        },
        infos: {
          id: '',
          userCname: '',
          sex: '',
          tel: '',
          status: '',
          idCardNumber: '',
          roleId: '',
          email: '',
          orgId: ''
        },
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        search: {
          idCardNumber: '',
          orgId: '',
          username: ''
        }
      }
    },
    components: {
      OrgTree
    },
    created: function(){
      QK.vector.$on('getfromchild',this.bindOrg)
    },
    beforeDestroy: function(){
      QK.vector.$off('getfromchild',this.bindOrg)
    },
    ready: function () {
      this.init()
    },
    computed: {
      pagenums: function () {
        //初始化前后页边界
        var lowPage = 1;
        var highPage = this.totlepage;
        var pageArr = [];
        if (this.totlepage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
          var subVisiblePage = Math.ceil(this.visiblepage / 2);
          if (this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage + 1) {//处理正常的分页
            lowPage = this.currentpage - subVisiblePage;
            highPage = this.currentpage + subVisiblePage - 1;
          } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
            lowPage = 1;
            highPage = this.visiblepage;
          } else {//处理后几页的逻辑
            lowPage = this.totlepage - this.visiblepage + 1;
            highPage = this.totlepage;
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
    methods: {
      init: function () {
        var that = this
        delete that.search['orgName']
        var searchAll = {
          pageStart : that.currentpage,
          pageLength : that.visiblepage,
          pageSearch : JSON.stringify(that.search)
        }
        that.$http.post(QK.SERVER_URL + '/api/user/pageList',searchAll,true).then(function (res) {
          var data = jQuery.parseJSON(res.body)
          var page = parseInt(data.recordsTotal / 10);
          if (data.recordsTotal % 10) {
            page = page + 1;
          }
          that.$set('totlepage', page)
          that.$set('infos', data.data)
        })
        QK.vector.$emit('getfromCrumb',that.crumbData)
      },
      bindOrg: function(org){
        this.$set('search.orgId', org.orgId)
        this.$set('search.orgName', org.orgName)
      },
      changeOrg : function(){
        var that = this
        if(!that.search.orgName){
          that.$set('search.orgId', '')
        }
      },
      hideOrgName: function(){
        var that = this
        that.$set('search.orgId', '')
        that.$set('search.orgName', '')
      },
      pageChange: function (page) {
        page = page || 1
        var that = this
        if (that.currentpage != page) {
          that.currentpage = page
        }
      },
      showInfo: function (id) {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/user/edit/' + id})
      },
      show: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/user/new'})
      },
      resetPwd: function(id){
        var that = this
        var optionObj = {
          "that" : that,
          "sendData" : id,
          "resetUrl" : '/api/user/reset',
          "listUrl" : '/system/user/list'
        }
        QK.resetPwdSwal(optionObj)
      },
    }
  }









</script>
