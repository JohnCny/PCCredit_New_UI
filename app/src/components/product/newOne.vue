<style src='../../../static/css/Tabs.css'></style>
<style src='../../../static/css/sweetalert.css'></style>
<template>

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
  <form id="pro_new" @submit.prevent="handleSubmit">
    <div class="tabContent" id="cpxx">
      <div class="report common">
        <h5>产品信息</h5>
        <div class="panel-body">
          <!--<template v-for="dropDown in dropDownList">-->
          <div class="form-group col-md-offset-2 col-md-3 col-sm-6 col-xs-12">
                <label for="productName">产品名称</label>
                <div class="input-icon right">
                  <input v-model="tProductInfo.productName" id="productName" type="text" class="form-control" name="productName"placeholder="">
                  <div class="message">${errors.productNameError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productType">产品类型</label>
                <div class="input-icon right">
                  <select id="productType" type="text" name="productType" class="form-control" v-model="tProductInfo.productType">
                      <option value="-1" selected=selected>--请选择--</option>
                    <template v-for="types in proType">
                      <option  value="${types.id}">${types.name}</option>
                    </template>
                  </select>
                  <div class="message">${errors.productTypeError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productLoanPeriod">贷款周期</label>
                <div class="input-icon right">
                  <input id="productLoanPeriod" type="text" class="form-control" name="productLoanPeriod" v-model="tProductInfo.productLoanPeriod" placeholder="">
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
                  <input id="productLimitMin" type="text" class="qujian" name="productLimitMin" v-model="tProductInfo.productLimitMin" placeholder="">
                  <span>~</span>
                  <input type="text" name="productLimitMax" id="productLimit" value="" class="qujian" v-model="tProductInfo.productLimitMax"/>
                  <div class="message">${errors.productLimitMaxError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productInterestMax">产品利率区间</label>
                <div class="input-icon right">
                  <input type="text" class="qujian" name="productInterestMin" v-model="tProductInfo.productInterestMin" id="productInterestMin"/>
                  <span>~</span>
                  <input type="text" class="qujian" name="productInterestMax" v-model="tProductInfo.productInterestMax" id="productInterestMax"/>
                  <div class="message">${errors.productInterestMaxError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productSendProductNumber">对应下发数据产品编号</label>
                <div class="input-icon right">
                  <input id="productSendProductNumber" type="text" class="form-control" name="productSendProductNumber" v-model="tProductInfo.productSendProductNumber" placeholder="">
                  <div class="message">${errors.productSendProductNumberError}</div>
                </div>
              </div>
              <div class="form-group col-md-8 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productImg">产品图片</label>
                <div class="input-icon right">
                  <input id="productImg" type="file" class="form-control" name="productImg" v-model="tProductInfo.productImg" placeholder="">
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
                <label for="productHouseholdLevelLimit">户籍</label>
                <div class="input-icon right">
                  <select id="productHouseholdLevelLimit" type="text" name="productHouseholdLevelLimit" class="form-control" v-model="tLevel.productHouseholdLevelLimit">
                    <option value="-1" selected="selected">--请选择--</option>
                    <option value="0">本地</option>
                    <option value="1">外地</option>
                    <option value="2">无限制</option>
                  </select>
                  <div class="message">${errors.productHouseholdLevelLimitError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productMarriageLimit">是否必须已婚</label>
                <div class="input-icon right">
                <!--  <label><input name="Fruit" type="radio" value="" class="form-control"/>是</label>
                  <label><input name="Fruit" type="radio" value="" class="form-control"/>否</label>-->
                  <input id="productMarriageLimit" type="radio" name="productMarriageLimit" value="1">
                  <label onclick="setRadio(this)"class=" radio_a">
                    是
                  </label>
                  <input id="productMarriageLimit" type="radio" name="productMarriageLimit" value="0">
                  <label onclick="setRadio(this)"class=" radio_a">
                    否
                  </label>
                  <div class="message">${errors.productMarriageLimitError}</div>
                </div>
              </div>
              </div>
              <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productAgeMaxLimit">年龄区间</label>
                <div class="input-icon right" style="    text-align: center;">
                  <input id="productAgeMinLimit" type="text" class="form-control" name="productAgeMinLimit" v-model="tLevel.productAgeMinLimit" placeholder="" v-model="tLevel.productAgeMinLimit">
                  ~
                  <input id="productAgeMaxLimit" type="text" class="form-control" name="productAgeMaxLimit" v-model="tLevel.productAgeMaxLimit" placeholder="" v-model="tLevel.productAgeMaxLimit">
                  <div class="message">${errors.productAgeMaxLimitError}</div>
                </div>
              </div>
              <div class="form-group col-md-6 col-md-offset-2 col-sm-6 col-xs-12">
                <label >征信</label>
                <div class="input-icon right">
                  <span class="hideInput"><input type="checkbox" value="1" name="productCreditLevelLimit"><label class="checkss checkbox_a">无信用记录</label></span>
                  <span class="hideInput"><input type="checkbox" value="2" name="productCreditLevelLimit"><label class="checkss checkbox_a">信用良好</label></span>
                  <span class="hideInput"><input type="checkbox" value="2" name="productCreditLevelLimit"><label class="checkss checkbox_a">有少量逾期</label></span>
                  <span class="hideInput"><input type="checkbox" value="2" name="productCreditLevelLimit"><label class="checkss checkbox_a">当前有逾期</label></span>
                  <div class="message">${errors.productCreditLevelLimitError}</div>
                </div>
              </div>
              </div>

              <div class="row">
              <div class="form-group col-md-6  col-md-offset-2 col-sm-6 col-xs-12">
                <label for="productIndustryLimit">非准入行业</label>
                <div class="input-icon right">
                  <select id="productIndustryLimit" type="text" name="productIndustryLimit" v-model="productIndustryLimit" class="form-control select2-multiple" multiple>
                    <template v-for="industryed in industryes">
                      <option  v-bind:value="industryed.id">${industryed.industryName}</option>
                    </template>
                  </select>
                  <div class="message">${errors.productIndustryLimitError}</div>
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
                <label for="customerManagerLevelId">准入最低客户经理级别:</label>
                <div class="input-icon right">
                  <select id="customerManagerLevelId" type="text" name="customerManagerLevelId" class="form-control" v-model="tLevel.customerManagerLevelId">
                    <option value="-1" selected="selected">--请选择--</option>
                    <option value="0">本地</option>
                    <option value="1">外地</option>
                    <option value="2">无限制</option>
                  </select>
                  <div class="message">${errors.customerManagerLevelIdError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <label for="homeAddress">准入机构</label>
                <div class="input-icon right">
                  <org-tree></org-tree>
                  <div class="message"></div>
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
                  <input id="homeAddress" type="text" class="form-control" name="productPictureUrl" v-model="tProductInfo.productPictureUrl" placeholder="">
                  <div style="position:absolute;left:100%; top:25%">
                    <img src="../../../static/images/add.png" v-on:click="addTap()">
                    <img src="../../../static/images/del.png" v-on:click="delTap()">
                  </div>
                </div>
                <div class="message">${errors.productPictureUrlError}</div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">是否必选:</label>
                <div class="input-icon right">
                  <!--  <label><input name="Fruit" type="radio" value="" class="form-control"/>是</label>
                    <label><input name="Fruit" type="radio" value="" class="form-control"/>否</label>-->
                  <input id="roleId" type="radio" name="roleId">
                  <label onclick="setRadio(this)"class=" radio_a">
                    是
                  </label>
                  <input id="roleId" type="radio" name="roleId" checked="checked">
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
      <button id="btn_submit" class="btn btn-success" type="submit">保存</button>
      <a href="javascript:void (0);" v-link={path:'/system/product/list'}  class="btn btn-default">返回</a>
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
import swal from 'sweetalert'
import OrgTree from '../tree/orgTree.vue'
import jQueryValidation from 'jquery-validation'
import selsect2 from 'select2'
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
                 productDescription:'',
                 productImg:'',
              },
              proType:[{
                 id:'',
                 name:''
              }],
              productIndustryLimit:['',''],
              industryes:[{
                 id:'',
                 industryName:''
              }],
              errors:{
                 productNameError:'',
                 productTypeError:'',
                 productPictureUrlError:'',
                 productLoanPeriodError:'',
                 productRepaymentModeError:'',
                 productApplyTemplateIdError:'',
                 productLimitMaxError:'',
                 productInterestMaxError:'',
                 productSendProductNumberError:'',
                 productDescriptionError:'',
                 productHouseholdLevelLimitError:'',
                 productMarriageLimitError:'',
                 productIndustryLimitError:'',
                 productCreditLevelLimitError:'',
                 customerManagerLevelIdError:'',
              },
              tLevel:{
                productHouseholdLevelLimit:'',
                productAgeMaxLimit:'',
                productAgeMinLimit:'',
                customerManagerLevelId:''
              },

           }
        },
        ready:function(){
            QK.addMethod()
            this.init()
            this.searchInfo()
            this.ComponentsSelect2()
        },
        components: {
           OrgTree
        },
        methods:{
              handleSubmit () {
                var that = this
                console.log(event.currentTarget)
                var bool = QK.formValidation({
                    id: "#pro_new",
                    rulesMap: {
                      productName: {required: !0,isChinese: !0},
                      productType: {required: !0,downList: !0},
                      productPictureUrl: {required: !0},
                      productLoanPeriod: {required: !0,digits: !0},
                      productRepaymentMode: {required: !0,downList: !0},
                      productApplyTemplateId: {required: !0},
                      productLimitMax: {required: !0,digits: !0},
                      productLimitMin: {required: !0,digits: !0},
                      productInterestMax: {required: !0,},
                      productInterestMin: {required: !0,},
                      productSendProductNumber: {required: !0},
                      productDescription: {required: !0},
                      productAgeMaxLimit:{required: !0,age: !0,productAgeMaxLimit: !0},
                      productAgeMinLimit:{required: !0,age: !0,productAgeMinLimit: !0},
                      customerManagerLevelId:{required: !0},
                      productHouseholdLevelLimit:{required: !0,downList: !0}
                    }
                })
                  //验证结果  true  false
                   if (bool) {
                    //发送请求
                        var tProductInfo = that.tProductInfo
                        var tLevel = that.tLevel
                         var productIndustryLimit = that.productIndustryLimit
                         productIndustryLimit = $("#productIndustryLimit").val().join(",")
                        that.$http.post(QK.SERVER_URL+'/api/product', {
                          productName:that.tProductInfo.productName,
                          productType:that.tProductInfo.productType,
                          productPictureUrl:that.tProductInfo.productPictureUrl,
                          productImg:that.tProductInfo.productImg,
                          productLoanPeriod:that.tProductInfo.productLoanPeriod,
                          productRepaymentMode:that.tProductInfo.productRepaymentMode,
                          productApplyTemplateId:that.tProductInfo.productApplyTemplateId,
                          productLimitMax:that.tProductInfo.productLimitMax,
                          productLimitMin:that.tProductInfo.productLimitMin,
                          productInterestMax:that.tProductInfo.productInterestMax,
                          productInterestMin:that.tProductInfo.productInterestMin,
                          productSendProductNumber:that.tProductInfo.productSendProductNumber,
                          productDescription:that.tProductInfo.productDescription,
                          productHouseholdLevelLimit:that.tLevel.productHouseholdLevelLimit,
                          productAgeMaxLimit:that.tLevel.productAgeMaxLimit,
                          productAgeMinLimit:that.tLevel.productAgeMinLimit,
                          productIndustryLimit:productIndustryLimit,
                          customerManagerLevelId:that.tLevel.customerManagerLevelId,
                          orgStr:'1'
                          }, true).then(function (data) {
                          var data = jQuery.parseJSON(data.body)
                          var id = data.data
                          var result = QK.getStateCode(that, data.code)
                          if (result.state) {
                           swal({
                              title: "是否继续填写?",
                              text: "",
                              type: "info",
                              showCancelButton: true,
                              confirmButtonColor: "#2196F3",
                              confirmButtonText: "是",
                              cancelButtonText: "否",
                              closeOnConfirm: true,
                              closeOnCancel: true
                          },
                          function(isConfirm){
                              if (isConfirm) {
                                  that.$router.go({path:"/system/product/newTwo/" + id})
                              }else {
                                  that.$router.go({path:"/system/product/list"})
                              }
                          })
                          }
                        })
                      }
                      return false
             },
            init:function(){

            },
            setTab2:function(){
                var that = this
                  $(event.currentTarget).addClass("active").siblings("li").removeClass("active")
                  var id = $(event.currentTarget).data("id")
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
                  html += '<input id="homeAddress" type="text" class="form-control" name="homeAddress" placeholder="请输入有效地址">';
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
            },
             ComponentsSelect2: function () {
                function e(e) {
                    if (e.loading)return e.text;
                    var t = "<div class='select2-result-repository clearfix'><div class='select2-result-repository__avatar'><img src='" + e.owner.avatar_url + "' /></div><div class='select2-result-repository__meta'><div class='select2-result-repository__title'>" + e.full_name + "</div>";
                    return e.description && (t += "<div class='select2-result-repository__description'>" + e.description + "</div>"), t += "<div class='select2-result-repository__statistics'><div class='select2-result-repository__forks'><span class='glyphicon glyphicon-flash'></span> " + e.forks_count + " Forks</div><div class='select2-result-repository__stargazers'><span class='glyphicon glyphicon-star'></span> " + e.stargazers_count + " Stars</div><div class='select2-result-repository__watchers'><span class='glyphicon glyphicon-eye-open'></span> " + e.watchers_count + " Watchers</div></div></div></div>"
                }

                function t(e) {
                    return e.full_name || e.text
                }

                $.fn.select2.defaults.set("theme", "bootstrap");
                var s = "请选择";
                $(".select2, .select2-multiple").select2({
                    placeholder: s,
                    width: null
                }), $(".select2-allow-clear").select2({
                    allowClear: !0,
                    placeholder: s,
                    width: null
                }), $(".js-data-example-ajax").select2({
                    width: "off",
                    ajax: {
                        url: "https://api.github.com/search/repositories",
                        dataType: "json",
                        delay: 250,
                        data: function (e) {
                            return {q: e.term, page: e.page}
                        },
                        processResults: function (e, t) {
                            return {results: e.items}
                        },
                        cache: !0
                    },
                    escapeMarkup: function (e) {
                        return e
                    },
                    minimumInputLength: 1,
                    templateResult: e,
                    templateSelection: t
                }), $("button[data-select2-open]").click(function () {
                    $("#" + $(this).data("select2-open")).select2("open")
                }), $(":checkbox").on("click", function () {
                    $(this).parent().nextAll("select").prop("disabled", !this.checked)
                }), $(".select2, .select2-multiple, .select2-allow-clear, .js-data-example-ajax").on("select2:open", function () {
                    if ($(this).parents("[class*='has-']").length)for (var e = $(this).parents("[class*='has-']")[0].className.split(/\s+/), t = 0; t < e.length; ++t)e[t].match("has-") && $("body > .select2-container").addClass(e[t])
                }), $(".js-btn-set-scaling-classes").on("click", function () {
                    $("#select2-multiple-input-sm, #select2-single-input-sm").next(".select2-container--bootstrap").addClass("input-sm"), $("#select2-multiple-input-lg, #select2-single-input-lg").next(".select2-container--bootstrap").addClass("input-lg"), $(this).removeClass("btn-primary btn-outline").prop("disabled", !0)
                })
            }
        }
    }
</script>
