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
          机构列表 <a style="display:none" v-on:click="showNewPage" class="btn btn-success btn-xs newNormal"><i
          class="fa fa-plus"></i> 新增</a><a style="display:none" v-on:click="showNewPageTop"
                                           class="btn btn-success btn-xs newTop"><i class="fa fa-plus"></i> 新增顶级机构</a>
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-4 col-md-4 col-sm-12">
              <span>机构名称：</span>
              <input id="orgName" v-model="search.orgName" type="text" name="orgName"/>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-12" style="text-align:center">
              <button v-on:click="init" class="btn btn-info btn-sm" type="button">搜 索</button>
              <button v-on:click="reset" class="btn btn-info btn-sm" type="button">查看所有机构</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>机构名称</th>
                <th>负责人</th>
                <th>后勤</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-if="infos.length">
                <tr v-for="info in infos">
                  <td>${info.orgName}</td>
                  <td>${info.orgDirectorName}</td>
                  <td>${info.orgLogisticsId}</td>
                  <td><a href="javascript:;" v-on:click="showInfo(info.id)" class="btn btn-info btn-xs"><i
                    class="fa fa-edit"></i>编辑 </a></td>
                  <td><a v-on:click="deleteInfo(info.id)" title="删除" class="btn btn-danger btn-xs"><i
                    class="fa fa-eraser"></i> 删除</a></td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5">没有数据</td>
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
  import OrgTree from '../tree/orgTreesEdit.vue'
  export default{
    data: function () {
      return {
        infos: {
          id: '',
          orgName: '',
          orgDirectorName: '',
          orgLogisticsId: ''
        },
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        orgId: '',
        search: {
          orgName: '',
        }
      }
    },
    ready: function () {
      this.init()
    },
    created: function () {
      QK.vector.$on('getfromchild', this.bindTopId)
    },
    beforeDestroy: function () {
      QK.vector.$off('getfromchild', this.bindTopId)
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
    methods: {
      init: function () {
        var that = this
        if (JSON.parse(localStorage.user).roleType == 1) {
          $(".newTop").show()
          this.$set("orgId", 0)
        } else {
          $(".newNormal").show()
          this.$set("orgId", JSON.parse(localStorage.user).org.id)
        }
        var searchAll = {
          pageStart: that.currentpage,
          pageLength: that.visiblepage,
          orgId: that.orgId,
          pageSearch: that.search
        }
        that.pageList(searchAll)
      },
      pageList: function (searchAll) {
        var that = this
        that.$http.post(QK.SERVER_URL + '/api/organization/pageList', searchAll, true).then(function (res) {
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
      showInfo: function (id) {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/organization/edit/' + id})
      },
      showNewPage: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/organization/new'})
      },
      showNewPageTop: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/organization/newTop'})
      },
      bindTopId: function (orgId) {
        //this.$set('orgId', orgId)
        var searchAll = {
          pageStart: this.currentpage,
          pageLength: this.visiblepage,
          orgId: orgId,
          pageSearch: this.search
        }
        this.pageList(searchAll)
      },
      reset: function () {
        this.$set('orgId', JSON.parse(localStorage.user).org.id)
        this.init()
      },
      deleteInfo: function (id) {
        var that = this
        var optionObj = {
          'that': that,
          'id': id,
          'deleteUrl': '/api/organization/' + id,
        }
        QK.deleteSwal(optionObj)
      },
    }
  }

</script>

