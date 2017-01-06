<style src="../../../static/css/zTree/metroStyle/metroStyle.css"></style>
<template>
  <div class="treeBox">
    <ul id="treeDemo" class="ztree"></ul>
  </div>
</template>
<style scoped>
</style>
<script>
  import QK from '../../QK'
  import ztree from 'ztree'
  export default{
    data: function () {
      return{
        msg:'hello vue'
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
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
//        $(".treeBox").css("height", (parseInt(height) - 170) + "px")
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
      }
    }
  }

</script>
