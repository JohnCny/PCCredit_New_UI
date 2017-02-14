<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          企业客户
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>选择</th>
                <th>企业名称</th>
                <th>法人</th>
                <th>工商注册号</th>
                <th>移交原因</th>
              </tr>
              </thead>
              <tbody>
              <template  v-if="infos.length" >
                <tr v-for="info in infos">
                  <td><span class="hideInput"><input type="checkbox"  name="checkbox" value="${info.customerId}"/></span></td>
                  <td>${info.cname}</td>
                  <td>${info.enterpriseCname}</td>
                  <td>${info.certificateNumber}</td>
                  <td>${info.transferReason}</td>
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
                    enterpriseCname: '',
                    certificateNumber: '',
                    transferReason: '',
                    flag: ''
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
                that.$http.get(QK.SERVER_URL+'/api/customerTransfer/queryTransfer/1', true).then(function(res){
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
            accept: function() {
                var that = this
                var ids = []
                var obj = {}
                $("input[type='checkbox']:checked").each(function(){
                    var id = $(this).val()
                    ids.push(id)
                })
                var tempid = ids.join(",")
                that.$http.put(QK.SERVER_URL+'/api/customerTransfer/accept',{flag:1,customerIds:tempid},true).then(function (data) {
                    var data = $.parseJSON(data.body)
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                      that.$router.go({path: '/system/customer/list'})
                    }
                })
            },
            refuse: function() {
                var that = this
                var userIds = []
                var keyobj = {}
                $("input[name='checkbox']:checkbox:checked").each(function(){
                    var id = $(this).val()
                    userIds.push(id)
                })
                var tempid = userIds.join(",")
                keyobj["customerIds"] = tempid
                keyobj["flag"] = 2
                that.$http.put(QK.SERVER_URL+'/api/customerTransfer/accept',{flag:2,customerIds:tempid} ,true).then(function (data) {
                    var data = $.parseJSON(data.body)
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                      that.$router.go({path: '/system/customer/list'})
                    }
               })
            }
        }
    }

</script>
