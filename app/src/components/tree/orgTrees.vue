<style src="../../../static/css/zTree/metroStyle/metroStyle.css"></style>
<template>
  <section class="panel">
    <div class="panel-body treeBox">
      <ul id="treeDemo" class="ztree"></ul>
    </div>
  </section>
</template>
<style scoped>
</style>
<script>
  import QK from '../../QK'
  import ztree from 'ztree'
  export default{
    data: function () {
      return {
        org: {
          orgId: '',
          orgName: ''
        }
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      getOrgData: function () {
        return this.org
      },
      init: function () {
        var that = this
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
          check: {
            enable: true,
            chkboxType: {"Y": "", "N": ""}
          },
          callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
              that.$set('org.orgId', treeNode.id)
              that.$set('org.orgName', treeNode.orgName)
              QK.vector.$emit('getfromchild', that.getOrgData())
            }
          }
        }
        this.baseTree(urlMy, setting)
      },
      baseTree: function (url, setting) {
        var that = this
        var height = $(window).height()
//        $(".treeBox").css("height", (parseInt(height) - 170) + "px")
        $(".wdlb").css("height", (parseInt(height) - 176) + "px")
        var zTreeObj
        that.$http.get(url, true).then(function (res) {
          var data = $.parseJSON(res.body)
          var result = QK.getStateCode(this, data.code)
          if (result.state) {
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, data.data)
            zTreeObj.expandAll(true)
          }
        })
      }
    }
  }

</script>
