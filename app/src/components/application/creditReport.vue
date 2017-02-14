<template>
  <my-tab></my-tab>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          征信报告列表
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>名称</th>
                <th>是否已上传</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <template v-if="infos.length">
              <tr v-for="info in infos">
                <td>${info.fileName}</td>
                <td><span class="label label-sm ${info.fileCategory | fileColor}">${info.fileCategory | fileType}</span></td>
                <td><a href="javascript:;" @click="goAdd(info)" class="btn btn-success btn-xs"><i class="fa fa-plus"></i>继续添加</a></td>
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
  import swal from 'sweetalert'
  export default{
   components: {
        myTab
      },
    data: function () {
      return {
        infos: [{
          fileName: '',
          fileCategory: ''
        }]
      }
    },
    ready: function () {
     this.init()
     this.initActive()
    },
    methods: {
       initActive: function(){
           $(".xzkhNormal,.sqbNormal,.ipcNormal, .dctpNormal,.zxbgNormal").css({"background":"url(../../../static/images/stepActive.png) no-repeat left center","color":"#fff"})
       },
       init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/applicationFile/'+id, true).then(function (data) {
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
        var applicationId = that.$route.params.id
        var fileId = info.fileId
        $(event.currentTarget).parent("td").prev("td").append("<form enctype='multipart/form-data' action='"+QK.SERVER_URL + "/api/applicationFile' method='post' id='upfile'><input type='file'  accept='application/vnd.ms-excel,application/msword' name='files'  id='files' /><input type='hidden' name = 'applicationId' id = 'applicationId' value='"+applicationId+"'/><input type='hidden' name = 'fileName' id = 'fileName' /><input type='hidden' name = 'fileId' id = 'fileId' value='"+fileId+"'/><input type='hidden' name = 'fileCategory' id = 'fileCategory' /><input type='hidden' name = 'fileType' id = 'fileType'/><button class='btn-sm btn-success' id='uploadFile' type='submit'>上传</button></form><br>")
          var str
           $("#files").on('change',function(){
           str = $(this).val()
           $("#fileName").val(that.getName(str))
        })
          var temp
           $("#files").on('change',function(){
           temp = $(this).val()
           $("#fileType").val(that.getType(temp))
        })
          var item
           $("#files").on('change',function(){
           item = $(this).val()
           var k = item.substr(item.lastIndexOf("."))
           if(k == '.xls' || k == '.doc'){
             $("#fileCategory").val('0')
           }else{
            $("#fileCategory").val('2')
           }
        })
      },
      getName:function(str){
        var arr=str.split('\\')
        var fileName=arr[arr.length-1]
        return fileName
      },
      getType: function(temp){
       var k = temp.substr(temp.lastIndexOf("."))
       return k
      },
       nextStep: function () {
        var that = this
        var id = that.$route.params.id
        that.$router.go({path: "/system/application/informationAll/" + id})
      },
      cancel: function () {
        window.history.back()
      }
    }
  }
</script>
