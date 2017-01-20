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
      return{
        topId:'',
        sendData: []
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      getTopId:function(){
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
            onClick: function(event, treeId, treeNode, clickFlag){
              that.$set('topId', treeNode.id)
              QK.vector.$emit('getfromchild',that.getTopId())
            },
            onDrop: function(event, treeId, treeNodes, targetNode, moveType, isCopy){
              $(treeNodes).each(function(i){
                var dataJson = {
                    id:this.id,
                    orgParentId:targetNode.id
                }
                that.sendData.push(dataJson)
              })
              that.$http.put(QK.SERVER_URL+'/api/organization/move',JSON.stringify(that.sendData), true).then(function(res){
                var data = jQuery.parseJSON(res.body)
                var result = QK.getStateCode(that,data.code)
                if (result.state) {
                  console.dir(data.data)
                }
              })
            }
          }
        }
        this.baseTree(urlMy, setting)
      },
      baseTree: function (url, setting) {
        var height = $(window).height()
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
