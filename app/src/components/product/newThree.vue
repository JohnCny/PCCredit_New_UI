<template>
  <form id="monito_new" @submit.prevent="handleSubmit">
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          贷款状态正常
        </header>
        <div class="panel-body">
            <div class="row">
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                  <div class="form-ground">
                    <label for="monitorTimeFirst">放款后首次贷后监控时间:</label>
                    <div class="input-icon right">
                      <select id="monitorTimeFirst" type="text" name="monitorTimeFirst" class="form-control" v-model="proMonitor.monitorTimeFirst">
                        <option value="0">一周内</option>
                        <option value="1">半月</option>
                        <option value="2" selected>一月内</option>
                      </select>
                      <div class="message">${errors.monitorTimeFirstError}</div>
                    </div>
                  </div>
              </div>
              <div class=" col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                <label for="monitorTimeRate">首次贷后监控后监控频率:</label>
                <div class="input-icon right">
                  <select id="monitorTimeRate" type="text" name="monitorTimeRate" class="form-control" v-model="proMonitor.monitorTimeRate">
                    <option value="0">每周</option>
                    <option value="1" selected>半月</option>
                    <option value="2">每月</option>
                    <option value="3" >三个月</option>
                  </select>
                  <div class="message">${errors.monitorTimeRateError}</div>
                </div>
              </div>
            </div>
            </div>
            <div class="row">
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="sex">实时回访频率:</label>
                  <div class="input-icon right">
                    <select id="siteVisitsrate" type="text" name="siteVisitsrate" class="form-control" v-model="proMonitor.siteVisitsrate">
                      <option value="0">每月</option>
                      <option value="1" selected>三个月</option>
                      <option value="2">六个月</option>
                    </select>
                    <div class="message">${errors.siteVisitsrateError}</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <header class="panel-heading">
          逾期、不良
        </header>
        <div class="panel-body">
            <div class="row">
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="phoneCollectionRate">电话催收频率:</label>
                  <div class="input-icon right">
                    <select id="phoneCollectionRate" type="text" name="phoneCollectionRate" class="form-control" v-model="proMonitor.phoneCollectionRate">
                      <option value="0">每天</option>
                      <option value="1">每周</option>
                      <option value="2">每月</option>
                    </select>
                    <div class="message">${errors.phoneCollectionRateError}</div>
                  </div>
                </div>
              </div>
              <div class = "col-md-3 col-md-offset-2 col-sm-6 col-xs-12">
                <div class="form-ground">
                  <label for="sex">上门催收频率:</label>
                  <div class="input-icon right">
                    <select id="homeCollectionRate" type="text" name="homeCollectionRate" class="form-control" v-model="proMonitor.homeCollectionRate">
                      <option value="0">每天</option>
                      <option value="1">每周</option>
                      <option value="2">每月</option>
                    </select>
                    <div class="message">${errors.homeCollectionRateError}</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  </div>
    <div class="row">
      <div class="col-md-12 col-md-offset-5">
        <button id="btn_submit" class="btn btn-success">确定</button>
        <a href="" type="reset" class="btn btn-default">取消</a>
      </div>
    </div>
  </form>
</template>
<style scoped>
  #userNew input,#userNew select{
    width:80%
  }
  .message{
    color:#a94442;
    height:20px;
  }
</style>
<script>
    import QK from '../../QK'
    import jQueryValidation from 'jquery-validation'
    export default{
        data:function(){
           return {
               proMonitor:{
                  monitorTimeFirst:'',
                  monitorTimeRate:'',
                  siteVisitsrate:'',
                  phoneCollectionRate:'',
                  homeCollectionRate:''
               },
               errors:{
                  monitorTimeFirstError:'',
                  monitorTimeRateError:'',
                  siteVisitsrateError:'',
                  phoneCollectionRateError:'',
                  homeCollectionRateError:''
               }
           }
        },
        ready:function(){
          QK.addMethod()
        },
        methods:{
        handleSubmit () {
            var that = this
            var bool = QK.formValidation({
              id: "#monito_new",
              rulesMap:{
                monitorTimeFirst:{required: !0,downList:!0},
                monitorTimeRate:{required: !0,downList:!0},
                siteVisitsrate:{required: !0,downList:!0},
              }
            })
            //验证结果  true  false
            if(bool){
              console.log(bool)
              var productId = that.$route.params.id
              var productInfo = that.proMonitor
              that.$http.post(QK.SERVER_URL+'/api/productLoan',{
                monitorTimeFirst:productInfo.monitorTimeFirst,
                monitorTimeRate:productInfo.monitorTimeRate,
                siteVisitsrate:productInfo.siteVisitsrate,
                phoneCollectionRate:productInfo.phoneCollectionRate,
                homeCollectionRate:productInfo.homeCollectionRate,
                productId:productId
              },true).then(function (data) {
                var data = jQuery.parseJSON(data.body)
                var result = QK.getStateCode(that,data.code)
                var id = that.$route.params.id
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
                                  that.$router.go({path:"/system/product/newFour/" + id})
                              }else {
                                  that.$router.go({path:"/system/product/list"})
                              }
                          })
                }
              })
            }
            return false
          },

     }
  }

</script>
