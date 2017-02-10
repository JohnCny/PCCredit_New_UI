<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理级别信息
        </header>
        <div class="panel-body">
          <form id="managerLevelNew" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="nodeTyp">节点类型</label>
                  <div class="input-icon right">
                    <select id="nodeTyp" type="text" name="nodeTyp" v-model="infos.nodeType" class="form-control"
                            v-on:change="whatCheck()">
                      <option value="-1" selected="selected">--请选择--</option>
                      <template v-for="node in nodes">
                        <option v-bind:value="node.id">${node.nodeName}</option>
                      </template>
                    </select>
                    <div class="message">${errors.nodeTypeError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">

                <label for="nodeNam">节点名称</label>
                <div class="input-icon right">
                  <input v-model="infos.nodeName" id="nodeNam" type="text" class="form-control" name="nodeNam"
                         placeholder="请输入对应额度">
                  <div class="message">${errors.nodeNameError}</div>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="preNodeI">上一节点</label>
                  <div class="input-icon right">
                    <select id="preNodeI" type="text" name="preNodeI" v-model="infos.preNodeId" class="form-control">
                      <option value="-1" selected="selected">--请选择--</option>
                      <template v-for="todos in nodeNames">
                        <option v-bind:value="todos.id">${todos.nodeName}</option>
                      </template>
                    </select>
                    <div class="message">${errors.preNodeIdError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="nextNodeI">下一节点</label>
                  <div class="input-icon right">
                    <select id="nextNodeI" type="text" name="nextNodeI" v-model="infos.nextNodeId" class="form-control">
                      <option value="-1" selected="selected">--请选择--</option>
                    </select>
                    <div class="message">${errors.nextNodeIdError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="approveRoles">可审批角色</label>
                  <div class="input-icon right">
                    <select id="approveRoles" type="text" name="approveRoles" class="form-control select2-multiple"
                            multiple v-model="approveRoles">
                      <template v-for="roleeee in approveRoles">
                        <option v-bind:value="roleeee.id">${roleeee.roleNameZh}</option>
                      </template>
                    </select>
                    <div class="message">${errors.approveRolesError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="isRandomDivisio">是否可随机分件</label>
                  <div class="input-icon right">
                    <input id="isRandomDivisio" type="radio" name="isRandomDivisio" value="1"
                           v-model="infos.isRandomDivision">
                    <label class=" radio_a">是</label>
                    <input id="isRandomDivisi" type="radio" name="isRandomDivisio" value="0"
                           v-model="infos.isRandomDivision">
                    <label class=" radio_a">否</label>
                    <div class="message">${errors.isRandomDivisionError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="isLoanMeetin">是否审贷会节点</label>
                  <div class="input-icon right">
                    <input id="isLoanMeetin" type="radio" name="isLoanMeetin" value="1" v-model="infos.isLoanMeeting">
                    <label class=" radio_a">是</label>
                    <input id="isLoanMeeti" type="radio" name="isLoanMeetin" value="0" v-model="infos.isLoanMeeting">
                    <label class=" radio_a">否</label>
                    <div class="message">${errors.isLoanMeetingError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="loanMeetingTyp">审贷会通过方式</label>
                  <div class="input-icon right">
                    <select id="loanMeetingTyp" type="text" name="loanMeetingTyp" v-model="infos.loanMeetingType"
                            class="form-control">
                      <option value="-1" selected="selected">--请选择--</option>
                      <option value="0">集体通过</option>
                      <option value="1">多数通过</option>
                    </select>
                    <div class="message">${errors.loanMeetingTypeError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class=row>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="isLoanLimi">是否额度判断节点</label>
                  <div class="input-icon right">
                    <input id="isLoanLimi" type="radio" name="isLoanLimi" value="1" v-model="infos.isLoanLimit">
                    <label class=" radio_a">是</label>
                    <input id="isLoanLim" type="radio" name="isLoanLimi" value="0" v-model="infos.isLoanLimit">
                    <label class=" radio_a">否</label>
                    <div class="message">${errors.isLoanLimitError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="loanLimi">额度</label>
                  <div class="input-icon right">
                    <input v-model="infos.loanLimit" id="loanLimi" type="text" class="form-control" name="loanLimi"
                           placeholder="">
                    <div class="message">${errors.loanLimitError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class=row>
              <div class="col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="isReviewNo">是否复核节点</label>
                  <div class="input-icon right">
                    <input id="isReviewNo" type="radio" name="isReviewNo" value="1" v-model="infos.isReviewNode">
                    <label class=" radio_a">是</label>
                    <input id="isLisReviewNodeoanLimi" type="radio" name="isReviewNo" value="0"
                           v-model="infos.isReviewNode">
                    <label class=" radio_a">否</label>
                    <div class="message">${errors.isReviewNodeError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-md-offset-5">
                <button id="btn_submit" class="btn btn-success">保存</button>
                <a @click="cancelMethod()" class="btn btn-default">返回</a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
  .message {
    color: #a94442;
    height: 20px;
  }
</style>
<script>
  import QK from '../../QK'
  import jQueryValidation from 'jquery-validation'
  import swal from 'sweetalert'
  import selsect2 from 'select2'
  export default{
    data: function () {
      return {
        infos: {
          nodeType: '',
          nodeName: '',
          preNodeId: '',
          nextNodeId: '',
          isRandomDivision: '',
          isLoanMeeting: '',
          loanMeetingType: '',
          isLoanLimit: '',
          loanLimit: '',
          isReviewNode: ''
        },
        nodes: [],
        errors: {
          nodeTypeError: '',
          nodeNameError: '',
          preNodeIdError: '',
          nextNodeIdError: '',
          approveRolesErrors: '',
          isRandomDivisionErrors: '',
          isLoanMeetingError: '',
          loanMeetingTypeError: '',
          isLoanLimitError: '',
          loanLimitError: '',
          isReviewNodeError: ''
        },
        approveRoles: [{
          id: '',
          roleNameZh: ''
        }],
        nodeNames: [{
          id: '',
          nodeName: ''
        }],
      }
    },
    ready: function () {
      QK.addMethod()
      this.searchInfo()
      this.ComponentsSelect2()
    },
    methods: {
      handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#managerLevelNew",
          rulesMap: {
            nodeTyp: {required: !0, downList: !0},
            nodeNam: {required: !0, isChinese: !0},
            preNodeI: {required: !0, downList: !0},
            nextNodeI: {required: !0, downList: !0},
            approveRoles: {required: !0},
            isRandomDivisio: {required: !0},
            isLoanMeetin: {required: !0},
            loanMeetingTyp: {required: !0, downList: !0},
            isLoanLimi: {required: !0},
            loanLimi: {required: !0, isIntGtZero: !0}
          }
        })

        //验证结果  true  false
        if (bool) {
          var infos = that.infos
          var approveRoles = that.approveRoles
          approveRoles = $("#approveRoles").val().join(",")
          var vals = that.infos.nodeType
          var id = that.$route.params.id
          console.log(vals)
          that.$http.post(QK.SERVER_URL + '/api/productApprove', {
            nodeType: infos.nodeType,
            nodeName: infos.nodeName,
            preNodeId: infos.preNodeId,
            nextNodeId: infos.nextNodeId,
            isRandomDivision: infos.isRandomDivision,
            isLoanMeeting: infos.isLoanMeeting,
            isLoanLimit: infos.isLoanLimit,
            loanLimit: infos.loanLimit,
            isReviewNode: infos.isReviewNode,
            approveRoles: approveRoles,
            productId: id,
            loanMeetingType: infos.loanMeetingType,
          }, true).then(function (data) {
            var id = that.$route.params.id
            var data = $.parseJSON(data.body)
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
                function (isConfirm) {
                  if (isConfirm && vals == 0 || vals == 1) {
                    alert(11111111)
                    location.reload()
                  } else if (isConfirm && vals == 2) {
                    that.$router.go({path: "/system/product/newThree/" + id})
                  } else {
                    that.$router.go({path: "/system/product/list"})
                  }
                })
            }
          })
        }
        return false
      },
      searchInfo: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/productApprove/' + id, true).then(function (data) {
          var data = $.parseJSON(data.body)
          var result = QK.getStateCode(that, data.code)
          if (result.state) {
            that.$set("approveRoles", data.data.roles)
            var start = data.data.haveStart
            var end = data.data.haveNext
            that.nodes = []
            if (start) {
              that.nodes.push({id: '0', nodeName: '起始节点'})
            } else if (!start && !end) {
              that.nodes.push({id: '1', nodeName: '中间节点'}, {id: '2', nodeName: '结束节点'})
            } else if (!start && end) {
              that.$router.go({path: "/system/product/newThree/" + id})
            }
          }
        })
      },
      whatCheck: function () {
        var that = this
        var productId = that.$route.params.id
        console.log(productId)
        var vals = $("#nodeTyp").val()
        console.log(vals)
        if (vals == 0) {
          $("#preNodeI").attr("disabled", true)
        } else if (vals == 1 || vals == 2) {
          that.$http.get(QK.SERVER_URL + '/api/productApprove?productId=' + productId + '', true).then(function (data) {
            var data = $.parseJSON(data.body)
            var result = QK.getStateCode(that, data.code)
            if (result.state) {
              that.$set("nodeNames", data.data)
            }
          })
        }
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
      cancelMethod:function(){
        this.$router.go({path:localStorage.nowurl})
      },
    }
  }
</script>
