<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          角色列表 <a v-on:click="show" class="btn btn-success btn-sm"><i class="fa fa-plus"></i> 新增</a>
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>角色名</th>
                <th>中文名</th>
                <th>角色状态</th>
                <th>角色描述</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.roleName}</td>
                <td>${info.roleNameZh}</td>
                <td>${info.roleStatus}</td>
                <td>${info.roleDescription}</td>
                <td><a href="javascript:;" v-on:click="showInfo(info.id)" class="btn btn-info btn-xs"><i class="fa fa-edit"></i>
                  编辑 </a></td>
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
    export default{
        data:function(){
           return {
                infos:{
                  id: '',
                  orgName: '',
                  orgDirectorName: '',
                  orgLogisticsId: ''
                },
                currentpage: 1,//第几页
                totlepage: '',//共几页
                visiblepage: 10//隐藏10页
           }
        },
        ready:function(){
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
        methods:{
          init : function(){
            var that = this
            that.$http.post(QK.SERVER_URL+'/api/role/pageList', true).then(function(res){
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
          showInfo:function (id) {
            //记录当前地址
            QK.noteNowUrl()
            //跳转地址
            this.$router.go({path:'/system/role/edit/'+id})
          },
           show:function () {
            //记录当前地址
            QK.noteNowUrl()
            //跳转地址
            this.$router.go({path:'/system/role/new'})
          }

        }
    }

</script>
