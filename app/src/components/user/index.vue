<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-3">
      <section class="panel">
        <header class="panel-heading">
          机构列表
        </header>
        <div class="panel-body">
          <org-tree></org-tree>
        </div>
      </section>
    </div>
    <div class="col-sm-9">
      <section class="panel">
        <header class="panel-heading">
          用户信息 <a v-on:click="show" class="btn btn-success btn-sm"><i class="fa fa-plus"></i> 新增</a>
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>身份证：</span><input v-model="search.idCardNumber" type="text" name="idCardNumber"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>机&nbsp;&nbsp;&nbsp;&nbsp;构：</span><input v-model="search.orgId" type="text" name="orgId"/>
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
                <th>编号</th>
                <th>用户名</th>
                <th>性别</th>
                <th>手机号码</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.id}</td>
                <td>${info.userCname}</td>
                <td>${info.sex | reSex}</td>
                <td>${info.tel}</td>
                <td><a href="javascript:;" v-on:click="showInfo(info.id)" class="btn btn-info btn-xs"><i
                  class="fa fa-edit"></i>
                  编辑 </a></td>
                <td><a v-on:click="deleteInfo(info.id)" title="删除" class="btn btn-danger btn-xs"><i
                  class="fa fa-eraser"></i> 删除
                </a></td>

              </tr>
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
  import swal from 'sweetalert'
  import ztree from 'ztree'
  import OrgTree from '../tree/orgTree.vue'
  export default{
    data: function () {
      return {
        infos: {
          id: '',
          userCname: '',
          username: '',
          sex: '',
          age: '',
          tel: '',
          status: '',
          idCardNumber: '',
          roleId: '',
          email: '',
          orgId: '1',
        },
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        search: {
          idCardNumber: '',
          orgId: '',
          username: '',
        }
      }
    },
    components: {
      OrgTree
    },
    ready: function () {
//      this.showTree()
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
      showTree: function () {
        var urlMy = QK.SERVER_URL + '/api/organization'
        var setting = {
          data: {
            simpleData: {
              enable: false,
              idKey: "id",
              pIdKey: "orgParentId"
            },
            key: {
              name: "orgName",
              children: "organizationList",
            }
          },
          view: {
            showIcon: true,
            showLine: false,
          },
          callback: {
            onClick: onClick
          }
        }

        function onClick(event, treeId, treeNode, clickFlag) {
          console.log(treeNode.orgName)
          $("#orgId").attr("value", treeNode.orgName);
          $("#orgIdHidden").attr("value", treeNode.id);
        }

        this.baseTree(urlMy, setting)
      },
      baseTree: function (url, setting) {
        var height = $(window).height()
        $(".treeBox").css("height", (parseInt(height) - 170) + "px")
        $(".wdlb").css("height", (parseInt(height) - 176) + "px")
        var zTreeObj
        $.ajax({
          type: 'GET',
          url: url,
          success: function (res) {
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, res.data)
            zTreeObj.expandAll(true)
          }
        })
      },
      init: function () {
        var that = this
        var idCardNumber = that.search.idCardNumber
        var orgId = that.search.orgId
        var username = that.search.username
        var search = 'start=' + that.currentpage + '&&length=' + this.visiblepage + '&&idCardNumber=' + idCardNumber + '&&orgId=' + orgId + '&&username=' + username
        console.log(search)
        that.$http.post(QK.SERVER_URL + '/api/user/pageList?' + search, true).then(function (res) {
          var data = jQuery.parseJSON(res.body)
          var page = parseInt(data.recordsTotal / 10);
          if (data.recordsTotal % 10) {
            page = page + 1;
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
        this.$router.go({path: '/system/user/edit/' + id})
      },
      show: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/user/new'})
      },
      deleteInfo: function (id) {
        var that = this
        swal({
            title: "你确定要删除这条信息吗?",
            text: "删除无法后将无法撤销！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF5350",
            confirmButtonText: "确定!",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function (isConfirm) {
            if (isConfirm) {
              swal({
                  title: "删除!",
                  text: "您的文件已被删除！",
                  confirmButtonColor: "#66BB6A",
                  type: "success"
                },
                function () {
                  that.$http.delete(QK.SERVER_URL + '/api/user/' + id).then(function (data) {
                    var data = jQuery.parseJSON(data.body)
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                      that.infos.$remove(that.infos.find(t => t.id === id))
                      //document.location.reload();
                    }
                  }, function (error) {
                    console.log(error)
                  })
                });
            } else {
              swal({
                title: "取消",
                text: "您的文件是安全的！",
                confirmButtonColor: "#2196F3",
                type: "error"
              });
            }
          });
      },
    }
  }

</script>
