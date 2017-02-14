<style src='../../../static/css/Tabs.css'></style>
<template>
  <my-tab></my-tab>
  <ul class="myTab">
    <template v-for="todo in infoData">
      <li v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          调查图片列表
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>图片说明</th>
                <th>是否已上传</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-if="infos.length">
              <tr v-for="info in infos">
                <td>${info.investPictureDescription}</td>
                <td>
                <template v-for="var in info.pictureList">
                 <img v-bind:src="var.investPictureUrl | getSrc" />
                </template>
              </td>
                <td><a href="javascript:;" v-on:click="goAdd(info)" class="btn btn-success btn-xs"><i class="fa fa-plus"></i>继续添加</a></td>
              </tr>
              </template>
              <template  v-else>
                <tr>
                  <td colspan="3">没有数据</td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
    <div class="col-xs-12 col-md-offset-5 contain" style="margin-bottom:10px;">
      <button id="btn_submit" v-on:click="nextStep" class="btn btn-success">下一步</button>
      <a v-on:click="cancel" type="reset" class="btn btn-info">返回上一步</a>
    </div>
  </div>
</template>
<style scoped>
  active {
    background: #eff0f4;
  }

  .myTab1 {
    margin: 0;
  }

  .myTab1 li {
    display: inline-block;
    list-style: none;
    background: #fff;
    border: 1px solid #eff0f4;
    color: #bbb;
    padding: 7px 15px;
    border-radius: 5px 5px 0 0;
    margin-right: 1px;
    cursor: pointer;
  }

  .myTab1 .active {
    color: #fff;
    background: #65cea7 !important;
    border: 1px solid #65cea7;
  }

  .myTab li {
    width: 150px;
    float: left;
    text-align: center;
    list-style: none;
    line-height: 50px;
    margin-bottom: 10px;
  }

  .activePro {
    background-color: #dff0d8 !important;
    border: 1px solid
  }


</style>
<script>
  import QK from '../../QK'
  import myTab from './myTab.vue'
  export default{
    components: {
        myTab
      },
    data: function () {
      return {
        infos: [{
          investPritureDescription: '',
          investPictureUrl: ''
        }],
        tApplicationInvestPicture: []
      }
    },
    ready: function () {
      this.init()
      this.initActive()

    },
    methods: {
      initActive: function(){
           $(".xzkhNormal,.sqbNormal,.ipcNormal, .dctpNormal").css({"background":"url(../../../static/images/stepActive.png) no-repeat left center","color":"#fff"})
       },
      init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/applicationInvestPicture/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        }).then(function(){
          QK.getActive("/system/application/new")
        })
      },
      goAdd: function (info) {
        var that = this
       console.log(info)
        var productInvestPictureDesc = info.investPictureDescription
        var id = info.id
        var applicationId = that.$route.params.id
        $(event.currentTarget).parent("td").prev("td").append("<form enctype='multipart/form-data' action='"+QK.SERVER_URL + "/api/applicationInvestPicture' method='post' id='upfile'>选择一个文件:<input type='file' name='files'  id='upload' /><input type='hidden' name = 'productInvestPictureDesc' id = 'productInvestPictureDesc' value='"+productInvestPictureDesc+"' /><input type='hidden' name = 'productInvestPictureId' id = 'productInvestPictureId' value='"+id+"'/>	 <input type='hidden' name = 'applicationId' id = 'applicationId' value='"+applicationId+"'/>	<button class='btn-sm btn-success' id='uploadFile' type='submit'>上传</button></form><br>")
      },
      nextStep: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/applicationInvestPicture/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
            that.$router.go({path: "/system/application/creditReport/" + id})
          }
        })
      },
      cancel: function () {
        window.history.back()
      }
    }
  }

</script>
