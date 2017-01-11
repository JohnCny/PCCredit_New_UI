<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-3">
        <div class="panel-body">
          <org-tree></org-tree>
        </div>
    </div>

    <div class="col-sm-9">
      <section class="panel">
        <header class="panel-heading">
          机构信息 <a v-on:click="show()" class="btn btn-success btn-sm"><i class="fa fa-plus"></i> 新 增</a>
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>机构名称</th>
                <th>负责人</th>
                <th>后勤</th>
                <th colspan="2">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.orgName}</td>
                <td>${info.orgDirectorName}</td>
                <td>${info.orgLogisticsId}</td>
                <td><a href="javascript:;" v-on:click="showInfo(info.id)" class="btn btn-info btn-xs"><i class="fa fa-edit"></i>
                  编辑 </a></td>
                <td><a v-on:click="deleteInfo(info.id)" title="删除" class="btn btn-danger btn-xs"><i class="fa fa-eraser"></i> 删除
                </a></td>
              </tr>
              </tbody>
            </table>
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
        data:function(){
           return {
                infos:{
                  id: '',
                  orgName: '',
                  orgDirectorName: '',
                  orgLogisticsId: ''
                },
           }
        },
         components: {
           OrgTree
        },
        ready:function(){
          this.init();
        },
        methods:{
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
          init:function() {
            var that = this
            that.$http.get(QK.SERVER_URL+'/api/organization', true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("infos", data.data)
              }
           })
        },
          showInfo:function (id) {
            //记录当前地址
            QK.noteNowUrl()
            //跳转地址
            this.$router.go({path:'/system/organization/edit/'+id})
          },
          show: function () {
            //记录当前地址
            QK.noteNowUrl()
            //跳转地址
            this.$router.go({path:'/system/organization/new'})
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
                      that.$http.delete(QK.SERVER_URL+'/api/organization/'+id).then(function (data) {
                        var data = jQuery.parseJSON(data.body)
                        var result = QK.getStateCode(that,data.code)
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
