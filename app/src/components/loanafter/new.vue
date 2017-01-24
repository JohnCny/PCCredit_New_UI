<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户列表
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>客户名称/企业名称：</span><input v-model="search.customerName" type="text" name="customerName"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>证件号码/企业工商号：</span><input v-model="search.customerCardId" type="text" name="customerCardId"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12" style="text-align:center">
              <button v-on:click="init()" class="btn btn-info btn-sm" type="button">搜 索</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>客户名称</th>
                <th>证件号码</th>
                <th>产品名称</th>
                <th>额度</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.customerName}</td>
                <td>${info.customerCardId}</td>
                <td>${info.productName}</td>
                <td>${info.applyAmount}</td>
                <td><a class="btn btn-success btn-xs" v-on:click="addLoan(info.id)">新增贷后监控</a></td>
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
          customerName: '',
          customerCardId: '',
          productName: '',
          applyAmount: '',
          id: '',
        },
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        search: {
          customerName: '',
          customerCardId: ''
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
        that.$http.post(QK.SERVER_URL + '/api/loanMonitor/add/pageList', searchAll, true).then(function (data) {
          var data = $.parseJSON(data.body);
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
      addLoan: function (id) {
        var that = this
        console.log(id)
        that.$http.get(QK.SERVER_URL + '/api/loanMonitor/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            var optionObj = {
              'that': that,
              'title': '新增成功!',
            }
            QK.successSwal(optionObj)
          } else {
            var optionObj = {
              'that': that,
              'title': '新增失败!',
              'text': result.msg + "！",
            }
            QK.errorSwal(optionObj)
          }
        })
      }
    }
  }

</script>
