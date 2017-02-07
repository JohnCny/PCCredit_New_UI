<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          <i class="fa fa-th-list"></i>
          贷款信息
        </header>
        <div class="panel-body" style="height:100px;">
          <div class="table-responsive">

            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户名称：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.customerCname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.customerCardNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">产品名称：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.productName | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">审批金额：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.approveAmount | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">审批利率：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${contract.approveRate | isEmpty}
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
          签约信息
        </header>
        <form class="form-horizontal" role="form" id="cusBasic">
          <input type="hidden" id="applicationId" name="applicationId"/>
          <div class="form-group col-md-offset-4" style="margin-top:30px;margin-left:50px;">
            <label for="applyReason" class="col-sm-2 control-label">贷款开始日期：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="applyReason" id="applyReason" v-model="applyReason" class="form-control"/>
                <div class="message">${errors.applyReasonError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="applyAmount" class="col-sm-2 control-label">贷款结束日期：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="applyAmount" id="applyAmount" v-model="applyAmount" class="form-control"/>
                <div class="message">${errors.applyAmountError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="applyAmount" class="col-sm-2 control-label">合同编号：</label>
            <div class="col-sm-10" style="width:45%">
              <div class="input-icon right">
                <input name="applyAmount" id="applyAmount" v-model="applyAmount" class="form-control"/>
                <div class="message">${errors.applyAmountError}</div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
            <label for="applyAmount" class="col-sm-2 control-label">放款账号：</label>
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
<style scope>
</style>
<script>
  import QK from '../../QK'
    export default{
        data: function(){
            return{

            }
        }
    }
</script>
