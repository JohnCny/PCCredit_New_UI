<style src="../../../static/css/zTree/metroStyle/metroStyle.css"></style>
<template>
  <section class="panel">
    <header class="panel-heading">
      团队列表
    </header>
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
        team: {
          teamParentId: '',
          teamParentName: ''
        },

      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this
        var urlMy = QK.SERVER_URL + '/api/team'
        var setting = {
          data: {
            simpleData: {
              enable: false,
              idKey: "id",
              pIdKey: "teamParentId"
            },
            key: {
              name: "teamName",
              children: "teamList",
            }
          },
          view: {
            showIcon: true,
            showLine: false,
          },
          callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
              that.$set('team.teamParentId', treeNode.teamId)
              that.$set('team.teamParentName', treeNode.teamName)
              QK.vector.$emit('getfromchild', that.team)
            },
          }
        }
        this.baseTree(urlMy, setting)
      },
      baseTree: function (url, setting) {
        var that = this
        var height = $(window).height()
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
