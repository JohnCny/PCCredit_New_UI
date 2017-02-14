<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          产品信息 <a v-on:click="show" class="btn btn-success btn-sm"><i class="fa fa-plus"></i> 新 增</a>
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>产品名称：</span><input v-model="search.productName" type="text" name="productName"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>当前状态：</span><input v-model="search.productState" type="text" name="productState"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12" style="text-align:center">
              <button v-on:click="init" class="btn btn-info btn-sm" type="button">搜 索</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>产品名称</th>
                <th>产品额度区间</th>
                <th>利率区间</th>
                <th>当前状态</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-if="infos.length">
              <tr v-for="info in infos">
                <td>${info.productName}</td>
                <td>${info.productLimitMin}~${info.productLimitMax}</td>
                <td>${info.productInterestMin}~${info.productInterestMax}</td>
                <td v-if="info.productState == 0"><span class="label label-success">正常</span></td>
                <td v-if="info.productState == 1"><span class="label label-default">关闭</span></td>
                <td v-if="info.productState == 2"><span class="label label-info">创建中</span></td>
                <td><a href="javascript:;" v-on:click="showInfo(info.id)" class="btn btn-warning btn-xs"><i
                  class="fa fa-edit"></i>
                  编辑 </a>
                  <a v-on:click="flow(info.id)" title="" class="btn btn-warning btn-xs"><i class="fa fa-eraser"></i>
                    配置审批流程
                  </a>
                  <a class="btn btn-warning btn-xs" v-on:click="editInfo(info.id)">配置贷后监控规则</a>
                  <a class="btn btn-warning btn-xs" v-on:click="editRisk(info.id)">配置风险属性</a></td>
              </tr>
              </template>
              <template  v-else>
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
  import swal from 'sweetalert'
  import jQueryValidation from 'jquery-validation'
  export default{
    data: function () {
      return {
        infos: {
          productName: '',
          productLimitMax: '',
          productLimitMin: '',
          productInterestMax: '',
          productInterestMin: '',
          productState: ''
        },
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        search: {
          productName: '',
          productState: ''
        }
      }
    },
    ready: function () {
      this.init();
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
        var searchAll = {
          pageStart: that.currentpage,
          pageLength: that.visiblepage,
          pageSearch: JSON.stringify(that.search)
        }
        that.$http.post(QK.SERVER_URL + '/api/product/pageList/0', searchAll, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          var page = parseInt(data.recordsTotal / 10);
          if (data.recordsTotal % 10) {
            page = page + 1;
          }
          that.$set('totlepage', page)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      },
      pageChange: function (page) {
        page = page || 1
        var that = this
        if (that.currentpage != page) {
          that.currentpage = page
        }
      },
      show: function () {
        var that = this
        //记录当前地址
        //QK.noteNowUrl()
        //跳转地址
        //this.$router.go({path: '/system/product/newOne'})
         swal({
              title: "请选择产品类型",
              text: "",
              type: "info",
              showCancelButton: true,
              confirmButtonColor: "#2196F3",
              confirmButtonText: "个人产品",
              cancelButtonText: "企业产品",
              closeOnConfirm: true,
              closeOnCancel: true
            },
            function (isConfirm) {
              if (isConfirm) {
                that.$router.go({path: "/system/product/newOne"})
              } else {
                that.$router.go({path: "/system/companypro/newOne"})
              }
            })
      },
      showInfo: function (id) {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/product/editOne/' + id})
      },
      editInfo: function (id) {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/product/editThree/' + id})
      },
      editRisk: function (id) {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/product/editFour/' + id})
      },
      flow: function (id) {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/product/editTwo/' + id})
      }
    }
  }

</script>
