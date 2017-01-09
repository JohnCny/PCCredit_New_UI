<style src='../../../../static/css/sweetalert.css'></style>
<style src='../../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理列表
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>员工编号：</span><input v-model="search.employeeNumber" type="text" name="employeeNumber"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>级别ID：</span><input v-model="search.levelId" type="text" name="levelId"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>用户姓名：</span><input v-model="search.userCname" type="text" name="userCname"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12" style="text-align:center">
              <button v-on:click="init" class="btn btn-info btn-sm" type="button">搜 索</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtManager">
              <thead>
              <tr>
                <th>编号</th>
                <th>用户姓名</th>
                <th>客户经理状态</th>
                <th>级别</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.employeeNumber}</td>
                <td>${info.userCname}</td>
                <td>${info.managerStatus}</td>
                <td>${info.levelName}</td>
                <td><a href="javascript:;" v-on:click="showInfo(info.userId)" class="btn btn-info btn-xs"><i
                  class="fa fa-edit"></i>
                  编辑 </a></td>
                <td><a v-on:click="deleteInfo(info.userId)" title="删除" class="btn btn-danger btn-xs"><i
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
  import QK from '../../../QK'
  import swal from 'sweetalert'
  export default{
    data: function () {
      return {
        infos: {
          userId: '',
          userCname: '',
          systemLevel: '',
          employeeNumber: '',
          levelName: '',
          managerStatus: '',
        },
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        search: {
          employeeNumber: '',
          levelId: '',
          userCname: '',
        }
      }
    },
    components: {

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
        var employeeNumber = that.search.employeeNumber
        var levelId = that.search.levelId
        var userCname = that.search.userCname
        var searchAll = {
          pageStart : that.currentpage,
          pageLength : that.visiblepage,
          pageSearch : JSON.stringify(that.search)
        }
        that.$http.post(QK.SERVER_URL + '/api/customerManager/pageList',searchAll, true).then(function (res) {
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
        this.$router.go({path: '/system/managerBasic/edit/' + id})
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
                  that.$http.delete(QK.SERVER_URL + '/api/customerManager/' + id).then(function (data) {
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
