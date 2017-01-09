<style src='../../../../static/css/sweetalert.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <form id="managerEdit" @submit.prevent="handleSubmit">
        <section class="panel">
          <header class="panel-heading">
            客户经理信息
          </header>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div style="margin-bottom:10px">
                  <label class="pwdText">当前级别：</label>
                  <div class="input-icon right" style="display:inline-block;width:60%">
                    <a>${infos.levelName}</a>
                  </div>
                </div>
                <div>
                  <label for="" class="pwdText">级别调整：</label>
                  <div class="input-icon right" style="display:inline-block;width:60%">
                    <select class="form-control" name="levelId" v-model="datas.levelId">
                      <template v-for="lever in levers">
                        <option v-if="infos.levelName==lever.value" selected v-bind:value="lever.id">${lever.value}</option>
                        <option v-else v-bind:value="lever.id">${lever.value}</option>
                      </template>
                    </select>
                    <div class="message">${errors.levelIdError}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div style="margin-bottom:10px">
                  <label class="pwdText">系统建议：</label>
                  <div class="input-icon right" style="display:inline-block;width:60%">
                    <a>${infos.systemLevel}</a>
                  </div>
                </div>
                <div>
                  <label for="" class="pwdText">是否暂停进件：</label>
                  <div class="input-icon right" style="display:inline-block;width:60%">
                    <select class="form-control" name="managerStatus" v-model="datas.managerStatus">
                      <option v-if="infos.managerStatus == 0" selected value="0">是</option>
                      <option v-else value="0">是</option>
                      <option v-if="infos.managerStatus == 1" selected value="0">否</option>
                      <option v-else value="0">否</option>
                    </select>
                    <div class="message">${errors.managerStatusError}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="row">
          <div class="col-xs-12" style="text-align:center">
            <button class="btn btn-success" type="submit">提  交</button>
            <button class="btn btn-default">返  回</button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>
<style scoped>
  .message{
    color:#a94442;
    height:20px;
    float:left
  }
  .pwdText{
    color:#7a7676;
    font-weight:normal;
    text-align:right;
    width: 30%;
  }
</style>
<script>
  import QK from '../../../QK'
  import swal from 'sweetalert'
  import jQueryValidation from 'jquery-validation'
  export default{
    data: function () {
      return {
        infos: {
          userId: '',
          userCname: '',
          systemLevel: '',
          employeeNumber: '',
          managerStatus: '',
          levelName: '',
          managerStatus: '',
        },
        levers: {
          id : '',
          value : ''
        },
        errors: {
          levelIdError: '',
          managerStatusError: ''
        },
        datas: {
          levelId: '',
          managerStatus: ''
        }
      }
    },
    components: {

    },
    ready: function () {
      this.init()
      QK.addMethod()
    },
    methods: {
    handleSubmit () {
        var that = this
        var bool = QK.formValidation({
          id: "#managerEdit",
          rulesMap:{
            levelId:{required:!0,downList:!0},
            managerStatus:{required:!0,downList:!0},
          }
        })
        //验证结果  true  false
        if(bool){
          that.$http.put(QK.SERVER_URL+'/api/customerManager', that.datas, true).then(function (data) {
            var data = jQuery.parseJSON(data.body)
            var result = QK.getStateCode(that,data.code)
            if (result.state) {
              alert("修改成功")
              that.$router.go({path:"/system/managerBasic/list"})
            }else{
              alert("修改失败")
            }
          })
        }
        return false
      },
      init: function () {
        var that = this
        var id = that.$route.params.id
        that.$http.get(QK.SERVER_URL + '/api/customerManager/' + id, true).then(function (res) {
          var data = jQuery.parseJSON(res.body)
          that.$set('infos', data.data.customerManager)
          that.$set('levers', data.data.customerManagerLevel)
        })
      },
    }
  }


</script>
