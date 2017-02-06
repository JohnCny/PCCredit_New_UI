<style src='../../../static/css/Tabs.css'></style>
<template>
  <my-tab></my-tab>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          产品列表
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>产品名称：</span><input v-model="search.productName" type="text" name="productName"
                                       placeholder="请输入产品名称"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12" style="text-align:center">
              <button v-on:click="init" class="btn btn-info btn-sm" type="button">搜 索</button>
            </div>
          </div>
          <div class="table-responsive">
            <div id="dynamic-table_wrapper" class="dataTables_wrapper form-inline" role="grid">
              <div class="row-fluid">
                <table id="example" class="table table-bordered">
                  <thead>
                  <tr>
                    <th>选择</th>
                    <th>产品名称</th>
                    <th>产品额度区间</th>
                    <th>利率区间</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-on:click="showInfo(info)" v-for="info in infos">
                    <td><input type="radio" name="radio" id="radio" value="${info.id}"/><label class="radio"></label>
                    </td>
                    <td><input type="hidden" name="proName" id="proName" value="${info.productName}"/>${info.productName}
                    </td>
                    <td>${info.productLimitMin}~${info.productLimitMax}</td>
                    <td>${info.productInterestMin}~${info.productInterestMax}</td>
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
              <div class="col-xs-12 col-md-offset-5 contain">
                <button id="btn_submit" class="btn btn-success" v-on:click="nextStep">下一步</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import QK from '../../QK'
  import myTab from './myTab.vue'
  export default{
    data: function () {
      return {
        infos: [{
          id: '',
          productName: '',
          productLimitMin: '',
          productLimitMax: '',
          productInterestMin: '',
          productInterestMax: ''
        }],
        currentpage: 1,//第几页
        totlepage: '',//共几页
        visiblepage: 10,//隐藏10页
        search: {
          productName: ''
        },
        text: '',
        sendData: {
          id: '',
          productName: ''
        }
      }
    },
    components: {
      "my-tab": myTab
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
        var searchAll = {
          pageStart: that.currentpage,
          pageLength: that.visiblepage,
          pageSearch: JSON.stringify(that.search)
        }
        that.$http.post(QK.SERVER_URL + '/api/product/pageList', searchAll, true).then(function (data) {
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
      nextStep: function () {
        var that = this
        var pro = []
        $("input[type='radio']:checked").each(function () {
          var id = $(this).val()
          pro.push(id)
        })
        var productId = pro
        that.sendData.id = productId[0]
        $(that.infos).each(function (i, v) {
          if (that.sendData.id == $(v)[0].id) {
            that.sendData.productName = $(v)[0].productName
          }
        })
        console.log(that.sendData.id)
        console.log(that.sendData.productName)
        that.$http.get(QK.SERVER_URL + '/api/application/ifProduct/' + productId, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            if (data.data.status) {
              QK.vector.$emit('getfrom', that.getProData())
              that.$router.go({path: "/system/application/select/" + productId})
            } else {
              swal({
                title: '',
                text: data.data.message,
                confirmButtonColor: "#EF5350",
                type: "error",
                confirmButtonText: '确定'
              })
            }
          }
        })
      },
      getProData: function () {
        var that = this
        var obj = {
          id: that.sendData.id,
          productName: that.sendData.productName
        }
        return obj
      },
      showInfo: function () {
        var that = this
        $(event.currentTarget).addClass("activePro").siblings("tr").removeClass("activePro")
        $(event.currentTarget).find("input[type=radio]").attr("checked", true)
      }
    }
  }
</script>
