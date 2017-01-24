<style src="../../../static/css/zTree/metroStyle/metroStyle.css"></style>
<template>
  <section class="panel">
    <header class="panel-heading">
      团队列表 <a v-on:click="showNewPage" class="btn btn-success btn-xs"><i class="fa fa-plus"></i> 新增</a>
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
        teamId: '',
        sendData: [],
        sendDataName: []
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
              idKey: "teamId",
              pIdKey: "teamParentId"
            },
            key: {
              name: "teamName",
              children: "teamList",
            }
          },
          edit: {
            enable: true,
            drag: {
              autoExpandTrigger: true,
              isCopy: false,
              isMove: true
            }
          },
          view: {
            showIcon: true,
            showLine: false,
          },
          callback: {
            onClick: function (event, treeId, treeNode, clickFlag) {
              that.$set('teamId', treeNode.teamId)
              QK.vector.$emit('getfromchild', that.teamId)
            },
            onDrop: function (event, treeId, treeNodes, targetNode, moveType, isCopy) {
              $(treeNodes).each(function (i) {
                var dataJson = {
                  "teamId": this.teamId,
                  "teamParentId": targetNode.teamId
                }
                that.sendData.push(dataJson)
              })
              that.$http.put(QK.SERVER_URL + '/api/team/move', JSON.stringify(that.sendData), true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  console.dir(data.data)
                }
              })
            },
            onRename: function (event, treeId, treeNode) {
              var dataJson = {
                "teamId": treeNode.teamId,
                "teamName": treeNode.teamName,
              }
              that.sendDataName.push(dataJson)
              that.$http.put(QK.SERVER_URL + '/api/team', JSON.stringify(that.sendDataName), true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (!result.state) {
                  var optionObj = {
                    'title': '更新失败!',
                    'text': result.msg + "！"
                  }
                  QK.errorSwal(optionObj)
                }
              })
            },
            beforeRemove: function (treeId, treeNode) {
              that.$http.delete(QK.SERVER_URL + '/api/team/' + treeNode.teamId, true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (!result.state) {
                  var optionObj = {
                    'title': '删除失败!',
                    'text': result.msg + "！"
                  }
                  QK.errorSwal(optionObj)
                }
              })
            }
          }
        }
        this.baseTree(urlMy, setting)
      },
      showNewPage: function () {
        //记录当前地址
        QK.noteNowUrl()
        //跳转地址
        this.$router.go({path: '/system/team/new'})
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
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, res.data)
            zTreeObj.expandAll(true)
          }
        })
      }
    }
  }

</script>
