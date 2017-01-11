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
          <div class="table-responsive">
              <!--<template v-for="dropDown in dropDownList">-->
              <div class="col-md-2"></div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="cname">产品名称</label>
                <div class="input-icon right">
                  <input id="cname" type="text" class="form-control" name="cname" v-model="customerBasicInfo.cname"
                         placeholder="请输入至少2-10位汉字">
                  <div class="message">${errors.cnameError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">产品类型</label>
                <div class="input-icon right">
                  <select id="sex" type="text" name="sex" class="form-control" v-model="customerBasicInfo.sex">
                    <option value="0" v-if="customerBasicInfo.sex==0" selected>男</option>
                    <option value="0" v-else>男</option>
                    <option value="1" v-if="customerBasicInfo.sex==1" selected>女</option>
                    <option value="1" v-else>女</option>
                  </select>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="certificateType">产品额度区间</label>
                <div class="input-icon right">
                  <input data-error="${telError}" id="certificateType" type="text" class="form-control" name="tel" v-model="customerBasicInfo.tel" placeholder="请输入正确的手机号码">
                  <div class="message">${errors.certificateTypeError}</div>
                </div>
              </div>

              <div class="col-md-2"></div>
              <div class="form-group col-md-3  col-sm-6 col-xs-12">
                <label for="certificateNumber">产品利率区间</label>
                <div class="input-icon right">
                  <input data-error="${idNumberError}" id="certificateNumber" type="text" class="form-control idNumber"
                         name="certificateNumber" v-model="customerBasicInfo.certificateNumber" placeholder="请输入有效证件号码" v-on:change="idNumberCheck()">
                  <div class="message" id="idMessage"></div>
                </div>
              </div>


              <div class="form-group col-md-3  col-md-offset-2 col-sm-6 col-xs-12">
                <label for="tel">产品介绍</label>
                <div class="input-icon right">
                  <input data-error="${telError}" id="tel" type="text" class="form-control" name="tel" v-model="customerBasicInfo.tel" placeholder="请输入正确的手机号码">
                  <div class="message">${errors.telError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="native">产品图片</label>
                <div class="input-icon right">
                  <input id="native" type="file" class="form-control" name="native" v-model="customerBasicInfo.native" placeholder="请输入有效地址">
                  <div class="message">${errors.nativeError}</div>
                </div>
              </div>


              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="homeAddress">贷款周期</label>
                <div class="input-icon right">
                  <input id="homeAddress" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">
                  <div class="message">${errors.homeAddressError}</div>
                </div>
              </div>

              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="belIndustry">还款方式</label>
                <div class="input-icon right">
                  <select id="belIndustry" type="text" name="belIndustry" v-model="customerBasicInfo.belIndustry" class="form-control">
                    <template v-for="industry in customerIndustry">
                      <option  value="${industry.id}" checked>${industry.industryName}</option>
                    </template>
                  </select>
                  <div class="message">${errors.belIndustryError}</div>
                </div>
              </div>

              <div class="form-group col-md-3  col-md-offset-2 col-sm-6 col-xs-12">
                <label for="marriageStatus">申请表模板</label>
                <div class="input-icon right">
                  <select id="marriageStatus" type="text" name="marriageStatus" v-model="customerBasicInfo.marriageStatus" class="form-control">
                    <template v-for="marriageStatus in marriage">
                      <option  value="${marriageStatus.id}" checked>${marriageStatus.value}</option>
                    </template>
                  </select>
                  <div class="message">${errors.marriageError}</div>
                </div>
              </div>
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="educationDegree">对应下发数据产品编号</label>
                <div class="input-icon right">
                  <input id="educationDegree" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">
                  <div class="message">${errors.eductionError}</div>
                </div>
              </div>
              <!--</template>-->
          </div>
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
                  <span class="hideInput"><input type="checkbox" checked="checked"><label onclick="setCheckbox(this)" class="checkss checkbox_a">无信用记录</label></span>
                  <span class="hideInput"><input type="checkbox" checked="checked"><label onclick="setCheckbox(this)" class="checkss checkbox_a">信用良好</label></span>
                  <span class="hideInput"><input type="checkbox" checked="checked"><label onclick="setCheckbox(this)" class="checkss checkbox_a">有少量逾期</label></span>
                  <span class="hideInput"><input type="checkbox" checked="checked"><label onclick="setCheckbox(this)" class="checkss checkbox_a">当前有逾期</label></span>
                  <div class="message">${errors.certificateTypeError}</div>
                </div>
              </div>
              </div>

              <div class="row">
              <div class="form-group col-md-6  col-md-offset-2 col-sm-6 col-xs-12">
                <label for="marriageStatus">非准入行业</label>
                <div class="input-icon right">
                  <select id="marriageStatus" type="text" name="marriageStatus" v-model="customerBasicInfo.marriageStatus" class="form-control">
                    <template v-for="marriageStatus in marriage">
                      <option  value="${marriageStatus.id}" checked>${marriageStatus.value}</option>
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
                <label for="homeAddress">贷款周期</label>
                <div class="input-icon right">
                  <input id="homeAddress" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">
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
              <div class="row adds">
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
              <div class="col-md-2"></div>
              <div class="form-group col-md-3  col-sm-6 col-xs-11">
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
              <!--</template>-->
          </div>
        </div>
      </div>
    </div>
    <p class="button">

      <a class="btn btn-success">保存</a>
      <a class="btn btn-success">保存保存并继续</a>
      <a class="btn btn-default">返回</a>
    </p>
</form>
</template>
<style scoped>
        .checkss{padding-right:25px}
</style>
<script>
import QK from '../../QK'
    export default{
        data:function(){
           return {
              infoData : [
                {id:'cpxx',text:'产品信息',classname:'active'},
                {id:'zrmk',text:'准入门槛',classname:''},
                {id:'zrkh',text:'准入客户经理级别以及机构',classname:''},
                {id:'dctp',text:'调查图片',classname:''},
              ]
           }
        },
        ready:function(){
            this.init()
        },
        methods:{
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
            }
        }
    }
</script>
