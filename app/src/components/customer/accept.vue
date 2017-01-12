<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          客户接收
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>选择</th>
                <th>客户名称</th>
                <th>客户证件号码</th>
                <th>移交原因</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td><span class="hideInput"><input type="checkbox" name="checkbox"/><label class="checkbox"></label></span></td>
                <td>${info.cname}</td>
                <td>${info.certificateNumber}</td>
                <td>${info.transferReason}</td>
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
              <input type="submit" v-on:click="accept()" class="btn btn-info col-md-offset-4" style="margin-bottom: 25px;" value="接收" id="btn_submit"/>
              <input type="reset"  v-on:click="refuse()" class="btn btn-danger" style="margin-bottom: 25px;" value="拒绝" id="btn_submit2"/>
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
    export default{
        data:function(){
           return {
                infos:{
                  customerId: '',
                  cname: '',
                  certificateNumber: '',
                  transferReason: ''
                },
                currentpage: 1,//第几页
                totlepage: '',//共几页
                visiblepage: 10//隐藏10页
           }
        },
        ready:function(){
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
        methods:{
          init : function(){
            var that = this
            that.$http.get(QK.SERVER_URL+'/api/customerTransfer/queryTransfer', true).then(function(res){
              var data = jQuery.parseJSON(res.body)
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
           accept:function() {
                var that = this
                var ids = []
                var userIds = []
                var obj = {}
                var keyobj = {}
                $("input[name='checkbox']:checkbox:checked").each(function(){
                  var id = $(this).val()
                  ids.push(id)
             })
                  var tempid = ids.join(",")
                  obj["customerIds"] = tempid
                  obj["flag"] = 1
                 that.$http.put(QK.SERVER_URL+'/api/customerTransfer/accept', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                     this.$router.go({path: '/system/customer/list'})
                  }
                })
              },
           refuse:function() {
                var that = this
                var ids = []
                var userIds = []
                var obj = {}
                var keyobj = {}
                $("input[name='checkbox']:checkbox:checked").each(function(){
                var id = $(this).val()
                userIds.push(id)
            })
                var tempid = userIds.join(",")
                keyobj["customerIds"] = tempid
                keyobj["flag"] = 2
                that.$http.put(QK.SERVER_URL+'/api/customerTransfer/accept', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    this.$router.go({path: '/system/customer/list'})
                  }
               })
            }
        }
    }

</script>
