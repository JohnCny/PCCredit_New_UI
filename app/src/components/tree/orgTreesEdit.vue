<style src="../../../static/css/zTree/metroStyle/metroStyle.css"></style>
<template>
  <section class="panel">
    <header class="panel-heading">
      机构列表
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
        topId: '',
        sendData: [],
        sendDataName: []
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      getTopId: function () {
        return this.topId
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
              that.$set('topId', treeNode.id)
              QK.vector.$emit('getfromchild', that.getTopId())
            },
            onDrop: function (event, treeId, treeNodes, targetNode, moveType, isCopy) {
              $(treeNodes).each(function (i) {
                var dataJson = {
                  id: this.id,
                  orgParentId: targetNode.id
                }
                that.sendData.push(dataJson)
              })
              that.$http.put(QK.SERVER_URL + '/api/organization/move', JSON.stringify(that.sendData), true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  swal({
                      title: "更新成功!",
                      text: "",
                      confirmButtonColor: "#66BB6A",
                      type: "success",
                      confirmButtonText : '确定'
                  })
                }else{
                  swal({
                    title: '更新失败!',
                    text: result.msg+"！",
                    confirmButtonColor: "#EF5350",
                    type: "error",
                    confirmButtonText: '确定'
                  },function(){
                    document.location.reload()
                  })
                }
              })
            },
            onRename: function (event, treeId, treeNode) {
              var dataJson = {
                "id": treeNode.id,
                "orgName": treeNode.orgName,
              }
              that.sendDataName.push(dataJson)
              that.$http.put(QK.SERVER_URL + '/api/organization/move', JSON.stringify(that.sendDataName), true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  swal({
                      title: "更新成功!",
                      text: "",
                      confirmButtonColor: "#66BB6A",
                      type: "success",
                      confirmButtonText : '确定'
                  })
                }else{
                  swal({
                    title: '更新失败!',
                    text: result.msg+"！",
                    confirmButtonColor: "#EF5350",
                    type: "error",
                    confirmButtonText: '确定'
                  },function(){
                    document.location.reload()
                  })
                }
              })
            },
            beforeRemove: function (treeId, treeNode) {
              that.$http.delete(QK.SERVER_URL + '/api/organization/' + treeNode.id, true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  swal({
                      title: "删除成功!",
                      text: "",
                      confirmButtonColor: "#66BB6A",
                      type: "success",
                      confirmButtonText : '确定'
                  })
                }else{
                  swal({
                    title: '删除失败!',
                    text: result.msg+"！",
                    confirmButtonColor: "#EF5350",
                    type: "error",
                    confirmButtonText: '确定'
                  },function(){
                    document.location.reload()
                  })
                }
              })
            }

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
          console.dir(res)
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
