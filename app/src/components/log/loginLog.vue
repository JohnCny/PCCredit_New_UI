<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          客户管理
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-4 col-md-4 col-xs-12">
              <span>登入名：</span><input v-model="search.loginAccount" type="text" name="loginAccount"/>
            </div>
            <div class="col-lg-4 col-md-4 col-xs-12">
              <span>操作：</span>
              <select class="form-control" v-model="search.loginOperation" name="loginOperation">
                <option value="">--请选择--</option>
                <option value="1">登录</option>
                <option value="0">退出</option>
              </select>
            </div>
            <div class="col-lg-4 col-md-4 col-xs-12" style="text-align:center">
              <button v-on:click="init()" class="btn btn-info btn-sm" type="button">搜 索</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>登入名</th>
                <th>操作</th>
                <th>操作时间</th>
                <th>登入结果</th>
                <th>IP地址</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.loginAccount}</td>
                <td><span
                  class="label label-sm ${info.loginOperation | reLogColor}">${info.loginOperation | reLog}</span></td>
                <td>${info.loginTime | formatDate}</td>
                <td><span class="label label-sm ${info.loginResult | logColor}">${info.loginResult | changeLog}</span>
                </td>
                <td>${info.loginIp}</td>
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
<style>
</style>
<script>
  import QK from '../../QK'
  export default{
    data: function () {
      return {
        infos: [{
          loginAccount: '',
          loginOperation: '',
          loginTime: '',
          loginResult: '',
          loginIp: ''
        }],
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        search: {
          loginAccount: '',
          loginOperation: ''
        }
      }
    },
    ready: function () {
      this.init()
    },
    computed: {
      pagenums: function () {
        //初始化前后页边界
        var lowPage = 1
        var highPage = this.totlepage
        var pageArr = []
        if (this.totlepage > this.visiblepage) {//总页数超过可见页数时，进一步处理；
          var subVisiblePage = Math.ceil(this.visiblepage / 2)
          if (this.currentpage > subVisiblePage && this.currentpage < this.totlepage - subVisiblePage + 1) {//处理正常的分页
            lowPage = this.currentpage - subVisiblePage
            highPage = this.currentpage + subVisiblePage - 1
          } else if (this.currentpage <= subVisiblePage) {//处理前几页的逻辑
            lowPage = 1
            highPage = this.visiblepage
          } else {//处理后几页的逻辑
            lowPage = this.totlepage - this.visiblepage + 1
            highPage = this.totlepage
          }
        }
        //确定了上下page边界后，要准备压入数组中了
        while (lowPage <= highPage) {
          pageArr.push(lowPage)
          lowPage++
        }
        return pageArr
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
          "pageStart": that.currentpage,
          "pageLength": that.visiblepage,
          "pageSearch": JSON.stringify(that.search)
        }
        that.$http.post(QK.SERVER_URL + '/api/loginLog/pageList', searchAll).then(function (res) {
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
      }
    }
  }
</script>
