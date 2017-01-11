<style src='../../../static/css/Tabs.css'></style>
<template>
  <form id="pro_new" @submit.prevent="handleSubmit">
    <ul class="myTab">
      <template v-for="todo in infoData">
      <li v-on:click="setTab2" v-bind:data-id="todo.id" v-bind:class="todo.classname">${todo.text}</li>
     <!-- <li class="active" v-on:click="setTab2(${event},'cpxx')">产品信息</li>
      <li v-on:click="setTab2(this,'zrmk')">准入门槛</li>
      <li v-on:click="setTab2(this,'zrkhjljbyjjg')">准入客户经理级别以及机构</li>
      <li v-on:click="setTab2(this,'dctp')">调查图片</li>-->
        </template>
    </ul>
    <!--*******************************************产品信息*******************************************************-->
    <div class="tabContent" id="cpxx">
      <div class="report common">
        <h5>产品信息</h5>
        <div class="panel-body">

              <!--<template v-for="dropDown in dropDownList">-->
              <div class="col-md-2"></div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="productName">产品名称</label>
                <div class="input-icon right">
                  <input v-modle="tProductInfo.productName" id="productName" type="text" class="form-control" name="productName"
                         placeholder="请输入至少2-10位汉字">
                  <div class="message">${errors.productNameError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productType">产品类型</label>
                <div class="input-icon right">
                  <select id="productType" type="text" name="productType" class="form-control" v-model="tProductInfo.productType">
                    <template v-for="types in proType">
                      <option  value="${types.id}" checked>${types.name}</option>
                    </template>
                  </select>
                  <div class="message">${errors.productTypeError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productLoanPeriod">贷款周期</label>
                <div class="input-icon right">
                  <input id="productLoanPeriod" type="text" class="form-control" name="productLoanPeriod" v-model="tProductInfo.productLoanPeriod" placeholder="请输入有效地址">
                  <div class="message">${errors.productLoanPeriodError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productRepaymentMode">还款方式</label>
                <div class="input-icon right">
                  <select id="productRepaymentMode" type="text" name="productRepaymentMode" v-model="tProductInfo.productRepaymentMode" class="form-control">
                      <option value="-1" selected = "selected">--请选择--</option>
                      <option value="1" >等额本金</option>
                      <option value="2">等额本息</option>
                      <option value="3">到期还款</option>
                  </select>
                  <div class="message">${errors.productRepaymentModeError}</div>
                </div>
              </div>

              <div class="form-group col-md-3  col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productApplyTemplateId">申请表模板</label>
                <div class="input-icon right">
                  <select id="productApplyTemplateId" type="text" name="productApplyTemplateId" v-model="tProductInfo.productApplyTemplateId" class="form-control">
                   <option selected = "selected">1</option>
                  </select>
                  <div class="message">${errors.productApplyTemplateIdError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productLimit">产品额度区间</label>
                <div class="input-icon right">
                  <input id="productLimits" type="text" class="qujian" name="productLimitMax" v-model="tProductInfo.productLimitMax" placeholder="请输入有效地址">
                  <span>~</span>
                  <input type="text" name="productLimitMin" id="productLimit" value="" class="qujian" v-model="tProductInfo.productLimitMin"/>
                  <div class="message">${errors.productLimitMaxError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="certificateType">产品利率区间</label>
                <div class="input-icon right">
                  <input type="text" class="qujian" name="productInterestMax" v-model="tProductInfo.productInterestMax" id="productInterestMax"/>
                  <span>~</span>
                  <input type="text" class="qujian" name="productInterestMin" v-model="tProductInfo.productInterestMin" id="productInterestMin"/>
                  <div class="message">${errors.productInterestMaxError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productSendProductNumber">对应下发数据产品编号</label>
                <div class="input-icon right">
                  <input id="productSendProductNumber" type="text" class="form-control" name="productSendProductNumber" v-model="tProductInfo.productSendProductNumber" placeholder="请输入有效地址">
                  <div class="message">${errors.productSendProductNumberError}</div>
                </div>
              </div>
              <div class="form-group col-md-8 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productPictureUrl">产品图片</label>
                <div class="input-icon right">
                  <input id="productPictureUrl" type="file" class="form-control" name="productPictureUrl" v-model="tProductInfo.productPictureUrl" placeholder="请输入有效地址">
                  <div class="message">${errors.productPictureUrlError}</div>
                </div>
              </div>
              <div class="form-group col-md-8  col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productDescription">产品介绍</label>
                <div class="input-icon right">
                  <textarea class="form-control" id="productDescription" v-model="tProductInfo.productDescription" name="productDescription"></textarea>
                  <div class="message">${errors.productDescriptionError}</div>
                </div>
              </div>
              <!--</template>-->
          </div>
        </div>
      </div>


    <!--*******************************************准入门槛*******************************************************-->
    <div class="tabContent" id="zrmk" style="display:none;">
      <div class="report common">
        <h5>准入门槛</h5>
        <div class="panel-body">
          <div class="table-responsive">
              <!--<template v-for="dropDown in dropDownList">-->
              <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="cname">户籍</label>
                <div class="input-icon right">
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                    <option value="0" v-else>男</option>
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                    <option value="1" v-else>女</option>
                  </select>
                  <div class="message">${errors.cnameError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">是否必须已婚</label>
                <div class="input-icon right">
                <!--  <label><input name="Fruit" type="radio" value="" class="form-control"/>是</label>
                  <label><input name="Fruit" type="radio" value="" class="form-control"/>否</label>-->
                  <input id="roleId" type="radio" name="roleId" value="${temp.id}">
                  <label onclick="setRadio(this)"class=" radio_a">
                    是
                  </label>
                  <input id="roleId" type="radio" name="roleId" value="${temp.id}">
                  <label onclick="setRadio(this)"class=" radio_a">
                    否
                  </label>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
              </div>
              <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="certificateType">年龄区间</label>
                <div class="input-icon right" style="    text-align: center;">
                  <input data-error="${telError}" id="certificateType" type="text" class="form-control" name="tel" v-model="customerBasicInfo.tel" placeholder="请输入正确的手机号码">
                  ~
                  <input data-error="${telError}" id="certificateType" type="text" class="form-control" name="tel" v-model="customerBasicInfo.tel" placeholder="请输入正确的手机号码">
                  <div class="message">${errors.certificateTypeError}</div>
                </div>
              </div>


              <div class="form-group col-md-6 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="certificateType">征信</label>
                <div class="input-icon right">
                  <span class="hideInput"><input type="checkbox"><label onclick="setCheckbox(this)" class="checkss checkbox_a">无信用记录</label></span>
                  <span class="hideInput"><input type="checkbox"><label onclick="setCheckbox(this)" class="checkss checkbox_a">信用良好</label></span>
                  <span class="hideInput"><input type="checkbox"><label onclick="setCheckbox(this)" class="checkss checkbox_a">有少量逾期</label></span>
                  <span class="hideInput"><input type="checkbox"><label onclick="setCheckbox(this)" class="checkss checkbox_a">当前有逾期</label></span>
                  <div class="message">${errors.certificateTypeError}</div>
                </div>
              </div>
              </div>

              <div class="row">
              <div class="form-group col-md-6  col-md-offset-2 col-sm-6 col-xs-12">
                <label for="marriageStatus">非准入行业</label>
                <div class="input-icon right">
                  <select id="marriageStatus" type="text" name="marriageStatus" v-model="customerBasicInfo.marriageStatus" class="form-control">
                    <template v-for="industryed in industryes">
                      <option  value="${industryed.id}" checked>${industryed.name}</option>
                    </template>
                  </select>
                  <div class="message">${errors.marriageError}</div>
                </div>
              </div>
              </div>
              <!--</template>-->
          </div>
        </div>
      </div>
    </div>
    <!--*******************************************准入客户经理级别以及机构*******************************************************-->
    <div class="tabContent" id="zrkh" style="display:none;">
      <div class="report common">
        <h5>准入客户经理级别以及机构</h5>
        <div class="panel-body">
          <div class="table-responsive">
              <!--<template v-for="dropDown in dropDownList">-->
              <div class="form-group col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <label for="homeAddress">准入最低客户经理级别:</label>
                <div class="input-icon right">
                  <input id="homeAddress" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">
                  <div class="message">${errors.homeAddressError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <label for="homeAddress">准入机构</label>
                <div class="input-icon right">
                  <org-tree></org-tree>
                  <div class="message">${errors.homeAddressError}</div>
                </div>
              </div>
              <!--</template>-->
          </div>
        </div>
      </div>
    </div>
    <!--*******************************************调查图片*******************************************************-->
    <div class="tabContent" id="dctp" style="display:none;">
      <div class="report common">
        <h5>调查图片</h5>
        <div class="panel-body">
          <div class="table-responsive">
              <!--<template v-for="dropDown in dropDownList">-->
              <div id="addImg">
              <div class="row adds" >
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-11">
                <label for="homeAddress">图片说明:</label>
                <div class="input-icon right">
                  <input id="homeAddress" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">
                  <div style="position:absolute;left:100%; top:25%">
                    <img src="../../../static/images/add.png" v-on:click="addTap()">
                    <img src="../../../static/images/del.png" v-on:click="delTap()">
                  </div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">是否必选:</label>
                <div class="input-icon right">
                  <!--  <label><input name="Fruit" type="radio" value="" class="form-control"/>是</label>
                    <label><input name="Fruit" type="radio" value="" class="form-control"/>否</label>-->
                  <input id="roleId" type="radio" name="roleId" value="${temp.id}">
                  <label onclick="setRadio(this)"class=" radio_a">
                    是
                  </label>
                  <input id="roleId" type="radio" name="roleId" value="${temp.id}">
                  <label onclick="setRadio(this)"class=" radio_a">
                    否
                  </label>
                </div>
              </div>
              </div>
              </div>
            </div>
              <!--</template>-->
          </div>
        </div>
      </div>
    <p class="button">

      <a href="javascript:void (0);" id="btn_submit" class="btn btn-success">保存</a>
      <a href="javascript:void (0);"  class="btn btn-success">保存保存并继续</a>
      <a href="javascript:void (0);"  class="btn btn-default">返回</a>
    </p>
</form>
</template>
<style scoped>
        .checkss{padding-right:25px}
        .qujian{width:40%; height: 34px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;background-color: #fff;background-image: none;border: 1px solid #ccc;border-radius: 4px;}
</style>
<script>
import QK from '../../QK'
import ztree from 'ztree'
import OrgTree from '../tree/orgTree.vue'
    export default{
        data:function(){
           return {
              infoData : [
                {id:'cpxx',text:'产品信息',classname:'active'},
                {id:'zrmk',text:'准入门槛',classname:''},
                {id:'zrkh',text:'准入客户经理级别以及机构',classname:''},
                {id:'dctp',text:'调查图片',classname:''},
              ],
              tProductInfo:{
                 productName:'',
                 productType:'',
                 productPictureUrl:'',
                 productLoanPeriod:'',
                 productRepaymentMode:'',
                 productApplyTemplateId:'',
                 productLimitMax:'',
                 productLimitMin:'',
                 productInterestMax:'',
                 productInterestMin:'',
                 productSendProductNumber:'',
                 productDescription:''
              },
              proType:[{
                 id:'',
                 name:''
              }],
              error:{
                productNameError:'',
                 productTypeError:'',
                 productPictureUrlError:'',
                 productLoanPeriodError:'',
                 productRepaymentModeError:'',
                 productApplyTemplateIdError:'',
                 productLimitMaxError:'',
                 productInterestMaxError:'',
                 productSendProductNumberError:'',
                 productDescriptionError:''
              }
           }
        },
        ready:function(){
            this.init()
            this.searchInfo()
        },
        components: {
           OrgTree
        },
        methods:{
              handleSubmit () {
                var that = this
                var bool = QK.formValidation({
                    id: "#pro_new",
                    rulesMap: {
                      productName: {required: !0, isChinese: !0},
                      productType: {required: !0},
                      productPictureUrl: {required: !0},
                      productLoanPeriod: {required: !0, isIdCardNo: !0},
                      productRepaymentMode: {required: !0},
                      productApplyTemplateId: {required: !0},
                      productLimitMax: {required: !0, downList: !0},
                      productLimitMin: {required: !0,downList: !0},
                      productInterestMax: {required: !0},
                      productInterestMin: {required: !0},
                      productSendProductNumber: {required: !0},
                      productDescription: {required: !0}
                    }
                })
                  //验证结果  true  false
                   if (bool) {
                    //发送请求
                        var tProductInfo = that.tProductInfo
                        //tCustomerBasic.industry = $("#industry").val().join(",")
                        that.$http.post(QK.SERVER_URL+'/api/product', tProductInfo, true).then(function (data) {
                          var data = jQuery.parseJSON(data.body)
                          var result = QK.getStateCode(that, data.code)
                          if (result.state) {
                            that.$router.go({path:'/system/product/list'})
                          }
                        })
                      }
                      return false
             },
            init:function(){

            },
            setTab2:function(){
                var that = this
                  console.log(event.currentTarget)
                  $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
                  var id = $(event.currentTarget).data("id")
                  console.log(id)
                  $("#"+id).show().siblings("div.tabContent").hide()
            },
             addTap:function(){
                  var html ='';
                  var len = $(".adds").length;
                  console.log(len)
                  html += '<div class="row adds">';
                  html += '<div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">';
                  html += '<label for="homeAddress">图片说明:</label>';
                  html += '<div class="input-icon right">';
                  html += '<input id="homeAddress" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">';
                  html += '</div>';
                  html += '</div>';
                  html += '<div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">';
                  html += '<label for="sex">是否必选:</label>';
                  html += '<div class="input-icon right">';
                  html += '<input id="roleId" type="radio" name="roleId '+len+'" value="${temp.id}">';
                  html += '<label onclick="setRadio(this)"class=" radio_a">是</label>';
                  html += '<input id="roleId" type="radio" name="roleId '+len+'" value="${temp.id}">';
                  html += '<label onclick="setRadio(this)"class=" radio_a">否</label>';
                  html += '</div>';
                  html += '</div>';
                  html += '</div>'
                  $("#addImg").append(html);
            },
            delTap:function(){
                  var len = $(".adds").length;
                  if(len>1){
                    $(".adds:last-child").remove();
                  }
            },
            searchInfo:function(){
                  var that = this;
                that.$http.get(QK.SERVER_URL+'/api/product', true).then(function (data) {
                  var data = $.parseJSON(data.body);
                  var result = QK.getStateCode(that, data.code)
                  if (result.state) {
                    that.$set("proType", data.data.productTypes)
                    that.$set("industryes", data.data.industry)
                  }
                })
            }
        }
    }
</script>
