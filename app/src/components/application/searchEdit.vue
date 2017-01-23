<style src='../../../static/css/Tabs.css'></style>
<template>
  <ul class="myTab">
    <template v-for="todo in infoData">
      <li v-on:click="changeTab()" v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
    </template>
  </ul>
  <div class="row tabContent" id="xxzl">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body">
          <header class="panel-heading">
            <i class="fa fa-th-list"></i>
            申请信息
          </header>
          <div class="table-responsive">
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.cname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.certificateNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.homeAddress | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.tel | isEmpty}
                </div>
              </div>
            </div>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              已上传图片
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              风控信息
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              模型计算信息
            </header>

          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row tabContent" style="display:none;" id="jjsqb">
    <div class="col-sm-12">
      <div class="row">
        <div class="col-sm-12">
          <section class="panel">
            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              客户基本信息
            </header>
            <div class="panel-body">
              <div class="table-responsive">

                <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.cname | isEmpty}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.certificateNumber | isEmpty}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.homeAddress | isEmpty}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
                  <div class="form-group">
                    <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                    <div class="col-md-9 col-sm-9 col-xs-8">
                      ${tCustomerBasic.tel | isEmpty}
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
                        <input  name="applyReason" id="applyReason" v-model="applyReason" class="form-control" />
                        <div class="message">${errors.applyReasonError}</div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-offset-4" style="margin-left:50px;height:80px;">
                    <label for="applyAmount" class="col-sm-2 control-label">申请金额</label>
                    <div class="col-sm-10" style="width:45%">
                      <div class="input-icon right">
                        <input  name="applyAmount" id="applyAmount" v-model="applyAmount" class="form-control" />
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
    </div>
  </div>
  <div class="row tabContent" style="display:none;" id="ipc">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body">
          <header class="panel-heading">
            <i class="fa fa-th-list"></i>
            进件IPC调查表
          </header>
          <div class="table-responsive">
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.cname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.certificateNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.homeAddress | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.tel | isEmpty}
                </div>
              </div>
            </div>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              已上传图片
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              风控信息
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              模型计算信息
            </header>

          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row tabContent" style="display:none;" id="dctp">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body">
          <header class="panel-heading">
            <i class="fa fa-th-list"></i>
            调查图片
          </header>
          <div class="table-responsive">
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.cname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.certificateNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.homeAddress | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.tel | isEmpty}
                </div>
              </div>
            </div>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              已上传图片
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              风控信息
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              模型计算信息
            </header>

          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row tabContent" style="display:none;" id="spxx">
    <div class="col-sm-12">
      <section class="panel">
        <div class="panel-body">
          <header class="panel-heading">
            <i class="fa fa-th-list"></i>
            审批信息
          </header>
          <div class="table-responsive">
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">客户姓名：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.cname | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 20px;margin-top:15px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">证件号码：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.certificateNumber | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">家庭住址：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.homeAddress | isEmpty}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="margin-bottom: 80px;margin-top:10px;">
              <div class="form-group">
                <div class="control-label col-md-3 col-sm-3 col-xs-4">联系方式：</div>
                <div class="col-md-9 col-sm-9 col-xs-8">
                  ${tCustomerBasic.tel | isEmpty}
                </div>
              </div>
            </div>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              已上传图片
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              风控信息
            </header>

            <header class="panel-heading">
              <i class="fa fa-th-list"></i>
              模型计算信息
            </header>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>

</style>
<script>
    import QK from '../../QK'
    export default{
        data(){
            return{
              infoData:[
                  {id:'xxzl',text:'信息总览',classname:'active'},
                  {id:'jjsqb',text:'进件申请表',classname:''},
                  {id:'ipc',text:'进件IPC调查表',classname:''},
                  {id:'dctp',text:'调查图片',classname:''},
                  {id:'spxx',text:'审批信息',classname:''}
              ],
               tCustomerBasic:{
                cname: '',
                certificateNumber: '',
                homeAddress: '',
                tel: ''
              }
            }
          },
            ready: function(){

            },
            methods:{
            changeTab: function(){
             var that = this
                  $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
                  var id = $(event.currentTarget).data("id")
                  $("#"+id).show().siblings("div.tabContent").hide()

               }

            }
        }

</script>
