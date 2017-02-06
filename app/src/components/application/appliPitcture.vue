<style src='../../../static/css/Tabs.css'></style>
<template>
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
              <tr v-for="info in infos">
                <td><input type="hidden" id="descript" name="descript" value="${info.investPritureDescription}"/>${info.investPritureDescription}
                </td>
                <td>${info.investPictureUrl}</td>
                <td><a href="javascript:;" v-on:click="goAdd" class="btn btn-success btn-xs"><i
                  class="fa fa-plus"></i>继续添加</a></td>
              </tr>
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

  .stepActive {
    color: #fff;
    background: url(../../../static/images/stepActive.png) no-repeat left center;
  }

  .stepActiveL {
    color: #fff;
    background: url(../../../static/images/stepActiveL.png) no-repeat left center;
  }

  .stepActiveR {
    color: #fff;
    background: url(../../../static/images/stepActiveR.png) no-repeat left center;
  }

  .stepLast {
    background: url(../../../static/images/stepLast.png) no-repeat left center;
  }

  .stepNormal {
    background: url(../../../static/images/stepNormal.png) no-repeat left center;
  }
</style>
<script>
  import QK from '../../QK'
  export default{
    data: function () {
      return {
        infoData: [
          {id: 'sqcp', text: '选择申请产品', classname: 'stepActiveL'},
          {id: 'xzkh', text: '选择申请客户', classname: 'stepActive'},
          {id: 'sqb', text: '填写申请表', classname: 'stepActive'},
          {id: 'ipc', text: '填写IPC调查报告', classname: 'stepActive'},
          {id: 'dctp', text: '上传调查图片', classname: 'stepActive'},
          {id: 'zxbg', text: '上传征信报告', classname: 'stepNormal'},
          {id: 'xxzl', text: '信息总览', classname: 'stepLast'}
        ],
        infos: [{
          investPritureDescription: '',
          investPictureUrl: ''
        }],
        tApplicationInvestPicture: []
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/applicationInvestPicture/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      },
      goAdd: function () {
        $(event.currentTarget).parent("td").prev("td").append("<tr><td>图片路径：<input type='file'/> <button id='upload'>上传</button></td></tr>")
        var that = this
        var applicationId = that.$route.params.id
        var productInvestPictureDesc = $("#descript").val()
        $("#upload").click(function () {
          that.$http.post(QK.SERVER_URL + '/api/applicationInvestPicture', {
            applicationId: applicationId,
            productInvestPictureDesc: productInvestPictureDesc
          }, true).then(function (data) {
            console.log(id)
            var data = $.parseJSON(data.body);
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              swal({
                title: "上传成功！",
                text: result.msg + "！",
                confirmButtonColor: "#66BB6A",
                type: "success",
                confirmButtonText: '确定'
              })
            } else {
              swal({
                title: "上传失败！",
                text: result.msg + "！",
                confirmButtonColor: "#EF5350",
                type: "error",
                confirmButtonText: '确定'
              })
            }
          })
        })
      },
      nextStep: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/applicationInvestPicture/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
            that.$router.go({path: "/system/application/approval/" + id})
          }
        })
      },
      cancel: function () {
        window.history.back()
      }
    }
  }
</script>
