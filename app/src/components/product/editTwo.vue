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
                <th>节点名称</th>
                <th>节点类型</th>
                <th>是否进行额度判断</th>
                <th>是否是审贷会节点</th>
                <th>是否随机分件</th>
                <th>是否复核节点</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.nodeName}</td>
                <td v-if="info.nodeType == 0"><span>起始节点</span></td>
                <td v-if="info.nodeType == 1"><span>中间节点</span></td>
                <td v-if="info.nodeType == 2"><span>结束节点</span></td>
                <td v-if="info.isLoanLimit == 0"><span>否</span></td>
                <td v-if="info.isLoanLimit == 1"><span>是</span></td>
                <td v-if="info.isLoanMeeting == 0"><span>否</span></td>
                <td v-if="info.isLoanMeeting == 1"><span>是</span></td>
                <td v-if="info.isRandomDivision == 0"><span>否</span></td>
                <td v-if="info.isRandomDivision == 1"><span>是</span></td>
                <td v-if="info.isReviewNode == 0"><span>否</span></td>
                <td v-if="info.isReviewNode == 1"><span>是</span></td>
                <td><a href="javascript:;" v-on:click="showInfo(info.id,info.productId)" class="btn btn-warning btn-xs"><i
                  class="fa fa-edit"></i>
                  编辑 </a>
                  <a v-on:click="flow(info.id)" title="" class="btn btn-warning btn-xs"><i class="fa fa-eraser"></i> 删除</a>
                </td>
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
  export default{
    data: function () {
      return {
        infos: {
          nodeName: '',
          nodeType: '',
          isLoanLimit: '',
          isLoanMeeting: '',
          isRandomDivision: '',
          isReviewNode: ''
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
        var id = that.$route.params.id
        that.$http.post(QK.SERVER_URL + '/api/productApprove/pageList', {
          searchAll,
          productId: id
        }, true).then(function (data) {
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
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/product/newOne'})
      },
      showInfo: function (id, pid) {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/product/editTwos/' + id + '/' + pid})
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
