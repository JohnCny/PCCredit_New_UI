<template>
  <my-tab></my-tab>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          <i class="fa fa-th-list"></i>
          客户基本信息
        </header>
        <div class="panel-body">
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
              <template v-if="infos.length">
                <tr v-for="info in infos">
                  <td>${info.investPritureDescription}</td>
                  <td>${info.investPictureUrl}</td>
                </tr>
              </template>
              <template  v-else>
                <tr>
                  <td colspan="2">没有数据</td>
                </tr>
              </template>
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
              <template v-if="approvals.lenth">
              <tr v-for="approval in approvals">
                <td></td>
                <td></td>
                <td></td>
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
              <template v-if="models.length">
              <tr v-for="model in models">
                <td></td>
                <td></td>
              </tr>
              </template>
              <template  v-else>
                <tr>
                  <td colspan="2">没有数据</td>
                </tr>
              </template>
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
</style>
<script>
  import QK from '../../QK'
  import myTab from './myTab.vue'
  export default{
   components: {
        myTab
      },
    data: function(){
      return {
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
      this.initActive()
    },
    methods: {
      initActive: function(){
           $(".xzkhNormal,.sqbNormal,.ipcNormal, .dctpNormal,.zxbgNormal").css({"background":"url(../../../static/images/stepActive.png) no-repeat left center","color":"#fff"})
           $(".stepLast").css({"background":"url(../../../static/images/stepActiveR.png) no-repeat left center","color":"#fff"})
       },
      init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/application/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body)
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
          var data = $.parseJSON(data.body)
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
