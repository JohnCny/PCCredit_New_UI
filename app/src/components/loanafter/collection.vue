<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理级别信息
        </header>
        <div class="panel-body">
          <form  id="managerLevelNew" @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="nodeTyp">催收方式：</label>
                  <div class="input-icon right">
                    <select id="nodeTyp" type="text" name="nodeTyp" v-model="infos.nodeType" class="form-control">
                      <option value="-1" selected = "selected">--请选择--</option>
                      <template v-for="node in nodes">
                        <option v-bind:value="node.id">${node.nodeName}</option>
                      </template>
                    </select>
                    <div class="message">${errors.nodeTypeError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-md-offset-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label for="preNodeI">催收结果：</label>
                  <div class="input-icon right">
                    <select id="preNodeI" type="text" name="preNodeI" v-model="infos.preNodeId" class="form-control">
                      <option value="-1" selected = "selected">--请选择--</option>
                      <template v-for="todos in nodeNames">
                        <option v-bind:value="todos.id">${todos.nodeName}</option>
                      </template>
                    </select>
                    <div class="message">${errors.preNodeIdError}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-md-offset-5">
                <button id="btn_submit" class="btn btn-success">保存</button>
                <a href="javascript:void (0);" v-link="{path:'/system/product/list'}"  class="btn btn-default">返回</a>
              </div>
            </div>
          </form>
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
    import jQueryValidation from 'jquery-validation'
    import swal from 'sweetalert'
    export default{
        data:function(){
           return {
                infos:{
                  nodeType: '',
                  nodeName: '',
                  preNodeId: '',
                  nextNodeId: '',
                  isRandomDivision: '',
                  isLoanMeeting: '',
                  loanMeetingType: '',
                  isLoanLimit: '',
                  loanLimit:'',
                  isReviewNode:''
                },
                nodes:[],
                errors:{
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
                  isReviewNodeError:''
                },
                approveRoles:[{
                  id:'',
                  roleNameZh:''
                }],
                 nodeNames:[{
                 id:'',
                 nodeName:''
                }],
           }
        },
        ready:function(){
          QK.addMethod()
          this.searchInfo()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#managerLevelNew",
              rulesMap:{
                  nodeTyp:{required: !0,downList: !0},
                  nodeNam:{required: !0,isChinese: !0},
                  preNodeI:{required: !0,downList: !0},
                  nextNodeI:{required: !0,downList: !0},
                  approveRoles:{required: !0},
                  isRandomDivisio:{required: !0},
                  isLoanMeetin:{required: !0},
                  loanMeetingTyp:{required: !0,downList: !0},
                  isLoanLimi:{required: !0},
                  loanLimi:{required: !0,isIntGtZero: !0}
              }
            })

            //验证结果  true  false
            if(bool){
              var infos = that.infos
              var approveRoles = that.approveRoles
              approveRoles = $("#approveRoles").val().join(",")
              var vals = that.infos.nodeType
              var id = that.$route.params.id
              console.log(vals)
              that.$http.post(QK.SERVER_URL+'/api/productApprove', {
                    nodeType:infos.nodeType,
                    nodeName:infos.nodeName,
                    preNodeId:infos.preNodeId,
                    nextNodeId:infos.nextNodeId,
                    isRandomDivision:infos.isRandomDivision,
                    isLoanMeeting:infos.isLoanMeeting,
                    isLoanLimit:infos.isLoanLimit,
                    loanLimit:infos.loanLimit,
                    isReviewNode:infos.isReviewNode,
                    approveRoles:approveRoles,
                    productId:id,
                    loanMeetingType:infos.loanMeetingType,
              }, true).then(function (data) {
                var id = that.$route.params.id
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
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
                          if (isConfirm && vals == 0 || vals == 1) {
                              alert(11111111)
                              location.reload()
                          }else if(isConfirm && vals == 2){
                              that.$router.go({path:"/system/product/newThree/" + id})
                          }else {
                              that.$router.go({path:"/system/product/list"})
                          }
                      })
                      }
              })
            }
            return false
          },
           searchInfo:function(){
              var that = this
              var id = that.$route.params.id
              that.$http.get(QK.SERVER_URL+'/api/productApprove/'+ id, true).then(function (data) {
                var data = $.parseJSON(data.body)
                var result = QK.getStateCode(that, data.code)
                if (result.state) {
                  that.$set("approveRoles", data.data.roles)
                  var start = data.data.haveStart
                  var end = data.data.haveNext
                  that.nodes = []
                  if(start){
                    that.nodes.push({id:'0',nodeName:'起始节点'})
                  }else if(!start && !end){
                     that.nodes.push({id:'1',nodeName:'中间节点'},{id:'2',nodeName:'结束节点'})
                  }else if(!start && end){
                     that.$router.go({path:"/system/product/newThree/" + id})
                  }
                }
              })
           }
        }
    }
</script>
