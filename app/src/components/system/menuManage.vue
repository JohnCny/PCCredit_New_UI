<style src="../../../static/css/zTree/metroStyle/metroStyle.css"></style>
<template>
  <div class="col-sm-12">
    <section class="panel">
      <header class="panel-heading">
        角色
      </header>
      <div class="panel-body treeBox">
        <select class="form-control" v-model="roleId" v-on:change="init" style="width:50%">
          <template v-for="role in roles">
            <option v-if="role.id==roleId" selected v-bind:value="role.id">${role.roleNameZh}</option>
            <option v-else v-bind:value="role.id">${role.roleNameZh}</option>
          </template>
        </select>
      </div>
    </section>
  </div>
  <div class="col-sm-12">
    <section class="panel">
      <header class="panel-heading">
        菜单列表
      </header>
      <div class="panel-body treeBox">
        <ul id="treeDemo" class="ztree"></ul>
      </div>
    </section>
  </div>
  <div class="loading" style="display:none"><img src="/static/images/loading.jpg"></div>
</template>
<style scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%
  }
</style>
<script>
  import QK from '../../QK'
  import ztree from 'ztree'
  export default{
    data(){
      return {
        roles: {
          id: '',
          roleNameZh: ''
        },
        roleId: '',
        sendData: [],
        sendDataName: []

      }
    },
    ready: function () {
      this.getRole()
      this.init()
    },
    methods: {
      getRole: function () {
        var that = this
        this.$set('roleId', JSON.parse(localStorage.user).roleType)
        that.$http.get(QK.SERVER_URL + '/api/role', true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("roles", data.data)
          }
        })
      },
      init: function () {
        var that = this
        var urlMy = QK.SERVER_URL + '/api/menu/allAuth?roleId=' + that.roleId
        var setting = {
          data: {
            simpleData: {
              enable: false,
              idKey: "menuTemplateId",
              pIdKey: "menuParentId"
            },
            key: {
              name: "menuNameZh",
              children: "menuLists",
              checked: "seeAuth"
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
          check: {
            enable: true,
            autoCheckTrigger: true,
            chkboxType: {"Y": "s", "N": "s"}
          },
          callback: {
            onCheck: function (event, treeId, treeNode) {
              var oldId = !treeNode.seeAuth ? treeNode.seeAuthId : -1
              var newId = oldId == -1 ? treeNode.seeAuthId : -1
              that.$http.get(QK.SERVER_URL + '/api/role?roleId=' + that.roleId + "&old=" + oldId + "&new=" + newId, true).then(function (data) {
                var data = $.parseJSON(data.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  that.refreshMenu()
                } else {
                  var optionObj = {
                    'title': '更新失败!',
                    'text': result.msg + "！",
                  }
                  QK.errorSwal(optionObj)
                }
              })
            },
            onDrop: function (event, treeId, treeNodes, targetNode, moveType, isCopy) {
              $(treeNodes).each(function (i) {
                var dataJson = {
                  "id": this.id,
                  "menuParentId": targetNode.menuTemplateId
                }
                that.sendData.push(dataJson)
              })
              that.$http.put(QK.SERVER_URL + '/api/menu', JSON.stringify(that.sendData), true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  that.refreshMenu()
                } else {
                  var optionObj = {
                    'title': '更新失败!',
                    'text': result.msg + "！"
                  }
                  QK.errorSwal(optionObj)
                }
              })
            },
            onRename: function (event, treeId, treeNode) {
              var dataJson = {
                "id": treeNode.id,
                "menuNameZh": treeNode.menuNameZh,
              }
              that.sendDataName.push(dataJson)
              that.$http.put(QK.SERVER_URL + '/api/menu', JSON.stringify(that.sendDataName), true).then(function (res) {
                var data = $.parseJSON(res.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  that.refreshMenu()
                } else {
                  var optionObj = {
                    'title': '更新失败!',
                    'text': result.msg + "！",
                  }
                  QK.errorSwal(optionObj)
                }
              })
            }
          }
        }
        if (that.roleId) {
          this.baseTree(urlMy, setting)
        }
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
      },
      refreshMenu: function () {
        $(".loading").show()
        this.$http.get(QK.SERVER_URL + '/api/menu/refresh', true).then(function (res) {
          var data = $.parseJSON(res.body)
          var result = QK.getStateCode(this, data.code)
          if (result.state) {
            $(".loading").hide()
            location.reload()
          } else {
            alert("更新菜单失败")
          }
        })
      }
    }
  }
</script>
