<template>
  <ul class="myTab">
    <template v-for="todo in infoData">
      <li v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          <i class="fa fa-th-list"></i>
          客户基本信息
        </header>
        <div class="panel-body" style="height:100px;">
          <div class="table-responsive">

            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.cname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.certificateNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.homeAddress | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.tel | isEmpty}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          已上传的图片
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column">
              <thead>
              <tr>
                <th>图片说明</th>
                <th>是否已上传</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.investPritureDescription}</td>
                <td>${info.investPictureUrl}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          风控信息
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column">
              <thead>
              <tr>
                <th>征信</th>
                <th>风控核查</th>
                <th>准入</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="approval in approvals">
                <td></td>
                <td></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          模型计算信息
        </header>
        <div class="panel-body">
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column">
              <thead>
              <tr>
                <th>评估额度</th>
                <th>该额度风险几率</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="model in models">
                <td></td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div class="col-xs-12 col-md-offset-5">
        <button class="btn btn-info" v-on:click="cancel()">返回上一步</button>
      </div>
    </div>
  </div>


</template>
<style scoped>
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
    data(){
      return {
        infoData: [
          {id: 'sqcp', text: '选择申请产品', classname: 'stepActiveL'},
          {id: 'xzkh', text: '选择申请客户', classname: 'stepActive'},
          {id: 'sqb', text: '填写申请表', classname: 'stepActive'},
          {id: 'ipc', text: '填写IPC调查报告', classname: 'stepActive'},
          {id: 'dctp', text: '上传调查图片', classname: 'stepActive'},
          {id: 'zxbg', text: '上传征信报告', classname: 'stepActive'},
          {id: 'xxzl', text: '信息总览', classname: 'stepActiveR'}
        ],
        tCustomerBasic: {
          cname: '',
          certificateNumber: '',
          homeAddress: '',
          tel: ''
        },
        infos: [{
          investPritureDescription: '',
          investPictureUrl: ''
        }]
      }
    },
    ready: function () {
      this.init()
      this.searchPic()
    },
    methods: {
      init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/application/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("tCustomerBasic", data.data.customer)
          }
        })
      },
      searchPic: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/applicationInvestPicture/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("infos", data.data)
          }
        })
      },
      cancel: function () {
        window.history.back()
      }
    }
  }
</script>
