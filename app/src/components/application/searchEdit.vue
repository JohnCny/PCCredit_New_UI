<!--<style src='../../../static/css/Tabs.css'></style>-->
<template>
  <ul class="myTab">
    <template v-for="todo in infoData">
      <li v-on:click="changeTab" v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
  <div class="row tabCon" id="xxzl">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body borderTab">
          <header class="panel-heading">
            申请信息
          </header>
          <div class="table-responsive">
            <div class="col-md-12">
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 20px;margin-top:15px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.cname | isEmpty}
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 20px;margin-top:15px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.certificateNumber | isEmpty}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 80px;margin-top:10px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">申请产品：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.homeAddress | isEmpty}
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 80px;margin-top:10px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">申请金额：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.tel | isEmpty}
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 80px;margin-top:10px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">执行利率：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.tel | isEmpty}
                  </div>
                </div>
              </div>
            </div>

            <header class="panel-heading">
              已上传图片
            </header>

            <header class="panel-heading">
              风控信息
            </header>

            <header class="panel-heading">
              模型计算信息
            </header>

          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row tabCon" style="display:none;" id="jjsqb">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body borderTab">
          <header class="panel-heading">
            客户基本信息
          </header>
          <div class="table-responsive">
            <div class="col-md-12">
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 20px;margin-top:15px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.cname | isEmpty}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 80px;margin-top:10px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.certificateNumber | isEmpty}
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 80px;margin-top:10px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.homeAddress | isEmpty}
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4" style="margin-bottom: 80px;margin-top:10px;">
                <div class="form-group">
                  <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                  <div class="col-md-9 col-sm-9 col-xs-8">
                    ${tCustomerBasic.tel | isEmpty}
                  </div>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row tabCon" style="display:none;" id="ipc">
    <div class="col-sm-12">
      <section class="panel borderTab">
        <div class="panel-body borderTab">
          <div class="table-responsive">


          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row tabCon" style="display:none;" id="dctp">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body borderTab">
          <header class="panel-heading">
            调查图片
          </header>
          <div class="table-responsive">
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
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row tabCon" style="display:none;" id="spxx">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body borderTab">
          <header class="panel-heading">
            审批信息
          </header>
          <div class="table-responsive" style="margin-top:20px;">
            <table class="bxd">
              <tbody>
              <tr>
                <td>当前审批节点：<span>XXXXXXXXX</span></td>
                <td colspan="2">风险提示：<span style="color:#a94442">风险客户</span></td>
              </tr>
              </tbody>
            </table>
            <header class="panel-heading" style="margin-top: 40px;">
              审批历史信息
            </header>
            <div class="panel-body">
              <div class="tableDiv">
                <table class="table table-striped table-bordered table-hover order-column">
                  <thead>
                  <tr>
                    <th>审批节点</th>
                    <th>审批人</th>
                    <th>审批决定</th>
                    <th>通过条件</th>
                    <th>审批额度</th>
                    <th>审批利率</th>
                    <th>审批意见</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <header class="panel-heading" style="margin-top: 40px;margin-bottom:20px;">
              合同信息
            </header>
            <table class="bxd">
              <tbody>
              <tr>
                <td>贷款开始日期：<span>XXXXXXXXX</span></td>
                <td>贷款结束日期：<span>XXXXXXXXX</span></td>
                <td>合同编号：<span>XXXXXXXXX</span></td>
                <td>放款账号：<span>XXXXXXXXX</span></td>
              </tr>
              </tbody>
            </table>
            <div class="report common">
              <header class="panel-heading" style="margin-top: 40px;margin-bottom:20px;">
                审批
              </header>
              <table>
                <tbody>
                <tr>
                  <td class="pull-right">审批决定：</td>
                  <td>
                    <select>
                      <option>--请选择--</option>
                      <option>通过</option>
                      <option>有条件通过</option>
                      <option>退回修改</option>
                      <option>拒绝</option>
                    </select>
                  </td>
                  <td class="pull-right">通过条件：</td>
                  <td><input type="text"></td>
                </tr>
                <tr>
                  <td class="pull-right">审批额度：</td>
                  <td><input type="text"></td>
                  <td class="pull-right">审批利率：</td>
                  <td><input type="text"></td>
                </tr>
                <tr>
                  <td class="pull-right">审批意见：</td>
                  <td colspan="3"><textarea></textarea></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scope>
  .borderTab {
    border: 1px solid #65cea7;
  }

  .bxd tr td {
    padding-left: 100px;
  }

  input {
    line-height: 1;
  }

</style>
<script>
  import QK from '../../QK'
  export default{
    data(){
      return {
        infoData: [
          {id: 'xxzl', text: '信息总览', classname: 'active'},
          {id: 'jjsqb', text: '进件申请表', classname: ''},
          {id: 'ipc', text: '进件IPC调查表', classname: ''},
          {id: 'dctp', text: '调查图片', classname: ''},
          {id: 'spxx', text: '审批信息', classname: ''}
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

      }
    },

    ready: function () {

    },
    methods: {
      changeTab: function () {
        var that = this
        $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
        var id = $(event.currentTarget).data("id")
        $("#" + id).show().siblings("div.tabCon").hide()

      }

    }
  }

</script>
