<style scoped src='../../../static/js/select2/css/select2.min.css'></style>
<style scoped src='../../../static/js/select2/css/select2-bootstrap.min.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          <i class="fa fa-th-list"></i>
          填写企业客户信息
        </header>
        <div class="panel-body">
          <div class="table-responsive">
            <form id="form_enterPrice_new" @submit.prevent="handleSubmit">
              <!--<template v-for="dropDown in dropDownList">-->
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="cnameEn">企业名称</label>
                    <div class="input-icon right">
                      <input v-model="enterPrise.cname" id="cnameEn" type="text" class="form-control" name="cname" placeholder="请输入中文名2到10位">
                      <div class="message">${errors.cnameError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="certificateNumberEn">企业工商号</label>
                    <div class="input-icon right">
                      <input v-model="enterPrise.certificateNumber" id="certificateNumberEn" type="text" class="form-control" name="certificateNumber" >
                      <div class="message">${errors.certificateNumberError}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="telEn">企业电话</label>
                    <div class="input-icon right">
                      <input v-model="enterPrise.tel" id="telEn" type="text" class="form-control" name="tel" placeholder="请输入中文名2到10位">
                      <div class="message">${errors.telError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="homeAddressEn">企业地址</label>
                    <div class="input-icon right">
                      <input v-model="enterPrise.homeAddress" id="homeAddressEn" type="text" class="form-control" name="homeAddress" >
                      <div class="message">${errors.homeAddressError}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="enterPriseCnameEn">企业法人</label>
                    <div class="input-icon right">
                      <input v-model="enterPrise.enterpriseCname" id="enterPriseCnameEn" type="text" class="form-control" name="enterPriseCname" placeholder="请输入中文名2到10位">
                      <div class="message">${errors.enterPriseCnameError}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="enterPriseIdCardEn">法人身份证号</label>
                    <div class="input-icon right">
                      <input v-model="enterPrise.enterpriseIdCard" id="enterPriseIdCardEn" type="text" class="form-control" name="enterPriseIdCard" >
                      <div class="message">${errors.homeAddressError}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="industryEn">所属行业</label>
                    <div class="input-icon right">
                      <select id="industryEn" name="industry" v-model="industry" class="form-control select2-multiple" multiple>
                        <template v-for="industries in customerIndustry">
                          <option value="${industries.id}">${industries.industryName}</option>
                        </template>
                      </select>
                      <div class="message">${errors.industryError}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button id="btn_submit" class="btn btn-success">确定</button>
                  <button @click="cancelMethod()" class="btn btn-default">取消</button>
                </div>
              </div>
              <!--</template>-->
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  .message{
      color:#a94442;
      height:20px;
  }
</style>
<script>
    import QK from '../../QK'
    export default{
        data:function(){
             return {
                  enterPrise: {
                      cname: '',
                      certificateNumber: '',
                      tel: '',
                      homeAddress: '',
                      enterpriseCname: '',
                      enterpriseIdCard: '',
                      industry: '',
                      customerType: 1,
                  },
                  industry:['',''],
                  customerIndustry:[],
                  errors:{
                      cnameError: '',
                      certificateNumberError: '',
                      telError: '',
                      homeAddressError: '',
                      enterPriseCnameError: '',
                      enterPriseIdCardError: ''
                  }
            }
        },
        ready:function(){
            QK.addMethod()
            this.ComponentsSelect2()
            this.industries()
        },
        methods:{
            handleSubmit () {
                var that = this
                var bool = QK.formValidation({
                    id: "#form_enterPrice_new",
                    rulesMap: {
                      cname: {required: !0, isChinese: !0},
                      industry: {required: !0,downList: !0},
                      enterpriseIdCard: {required: !0, isIdCardNo: !0},
                      homeAddress: {required: !0, isHomeAddress: !0},
                      tel: {required: !0, tel: !0}
                    }
                })
                //验证结果  true  false
                if (bool) {
                    //发送请求
                    that.industry = $("#industryEn").val().join(",")
                    that.$set("enterPrise.industry",that.industry)
                    that.$http.post(QK.SERVER_URL+'/api/customerBasic',that.enterPrise,true).then(function (data) {
                        var data = jQuery.parseJSON(data.body)
                        var result = QK.getStateCode(that, data.code)
                        if (result.state) {
                            swal({
                                title: "创建成功!",
                                text: "",
                                confirmButtonColor: "#66BB6A",
                                type: "success",
                                confirmButtonText : '确定'
                            },
                            function(){
                              that.$router.go({path:"/system/customer/list"})
                            })
                        }else{
                            swal({
                                title: "创建失败！",
                                text: result.msg+"！",
                                confirmButtonColor: "#EF5350",
                                type: "error",
                                confirmButtonText : '确定'
                             })
                        }
                    })
                }
                return false
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
            },
            industries:function() {
                var that = this;
                that.$http.get(QK.SERVER_URL+'/api/customerIndustry', true).then(function (data) {
                    var data = $.parseJSON(data.body)
                    var result = QK.getStateCode(that, data.code)
                    if (result.state) {
                      that.$set("customerIndustry", data.data)
                    }
                })
            },
            cancelMethod:function(){
                this.$router.go({path:localStorage.nowurl})
            },
        }
    }
</script>
