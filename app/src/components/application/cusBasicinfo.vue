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

  <div class="row" style="height:700px;">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          填写申请表
        </header>
        <form class="form-horizontal" role="form" id="cusBasic">
          <input type="hidden" id="applicationId" name="applicationId"/>
          <div class="form-group col-md-offset-4" style="margin-top:30px;margin-left:50px;">
            <label for="applyReason" class="col-sm-2 control-label">申请原因</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="applyReason" id="applyReason" v-model="applyReason" class="form-control"/>
                <div class="message">${errors.applyReasonError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="applyAmount" class="col-sm-2 control-label">申请金额</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="applyAmount" id="applyAmount" v-model="applyAmount" class="form-control"/>
                <div class="message">${errors.applyAmountError}</div>
              </div>
            </div>
          </div>
        </form>
        <div class="col-xs-12 col-md-offset-5 contain">
          <button id="btn_submit" class="btn btn-success" v-on:click="nextStep">下一步</button>
          <button class="btn btn-info" v-on:click="cancel">返回上一步</button>
        </div>
      </section>
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
          {id: 'ipc', text: '填写IPC调查报告', classname: 'stepNormal'},
          {id: 'dctp', text: '上传调查图片', classname: 'stepNormal'},
          {id: 'zxbg', text: '上传征信报告', classname: 'stepNormal'},
          {id: 'xxzl', text: '信息总览', classname: 'stepLast'}
        ],
        tCustomerBasic: {
          cname: '',
          certificateNumber: '',
          homeAddress: '',
          tel: ''
        },
        errors: {
          applyReasonError: '',
          applyAmountError: ''
        },
        applicationId: '20',
        applyReason: '',
        applyAmount: '',
        templateId: ''
      }
    },
    ready: function () {
      this.init()
    },
    methods: {
      nextStep: function () {
        var that = this
        var id = that.$route.params.appliId

        that.$http.get(QK.SERVER_URL + '/api/application/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            var templateId = data.data.product.productApplyTemplateId
            console.log(templateId)
            that.$router.go({path: "/system/application/ipc/" + id + '/' + templateId})
          }
        })
      },
      init: function () {
        var that = this
        var id = that.$route.params.customerId
        that.$http.get(QK.SERVER_URL + '/api/customerBasic/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body);
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("tCustomerBasic", data.data)
          }
        })
      },
      cancel: function () {
        window.history.back()
      }
    }
  }
</script>
