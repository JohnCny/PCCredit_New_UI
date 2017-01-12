<template>

  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          产品审批流程
        </header>
        <div class="panel-body">
          <form id="org_new" @submit.prevent="handleSubmit">
            <div class="row">
            <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
              <label for="sex">节点类型</label>
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
              <div class="col-md-2"></div>
              <div class="form-group col-md-3 col-sm-6 col-xs-12">
                <label for="cname">节点名称</label>
                <div class="input-icon right">
                  <input id="cname" type="text" class="form-control" name="cname" v-model="customerBasicInfo.cname"
                         placeholder="请输入至少2-10位汉字">
                  <div class="message">${errors.cnameError}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">上一节点：</label>
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
                <label for="sex">下一节点：</label>
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
            </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">可审批角色：</label>
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
                <label for="sex">是否随机分件：</label>
                <div class="input-icon right">
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
              <label for="sex">是否审贷会节点：</label>
              <div class="input-icon right">
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
            <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
              <label for="sex">审贷会通过方式：</label>
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
          </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">是否额度判断节点：</label>
                <div class="input-icon right">
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
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">额度：</label>
                <div class="input-icon right">
                  <input id="educationDegree" type="text" class="form-control" name="homeAddress" v-model="customerBasicInfo.homeAddress" placeholder="请输入有效地址">
                  <div class="message">${errors.eductionError}</div>
                  <div class="message">${errors.sexError}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <label for="sex">是否复合节点节点：</label>
                <div class="input-icon right">
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
          </form>
        </div>
      </section>
    </div>

  </div>
  <p class="button">
    <button id="btn_submit" class="btn btn-success" type="submit">保存</button>
    <a class="btn btn-default">返回</a>
  </p>

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
