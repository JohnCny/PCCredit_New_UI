<template>
  <div class="row">
    <div class="col-md-12">
      <section class="panel">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="form-group backgrounds colorone">
                <label for=""style="font-size:18px;color:#fff;">进件情况</label>
                <div class="input-icon right">
                  <manager-piece></manager-piece>
                </div>
              </div>
            </div>
            <div class=" col-md-4 col-sm-6 col-xs-12">
              <div class="form-group backgrounds colortwo">
                <label for=""style="font-size:18px;color:#fff;">贷款情况</label>
                <div class="input-icon right">
                  <manager-loan></manager-loan>
                </div>
              </div>
            </div>
            <div class=" col-md-4 col-sm-6 col-xs-12">
              <div class="form-group">
                <div class="input-icon right">
                  <div class="colorthree backgrounds">
                    <h3 style="margin-top: 0px;">当前贷款余额</h3>
                    <h4>￥6500</h4>
                  </div>
                  <div style="height:10px;"></div>
                  <div class="colorfour backgrounds">
                    <h3 style="margin-top: 0px;">绩效情况</h3>
                    <p>当月新申请进件<b>${infos.userApplicationInfoMonth}</b></p>
                    <p>当前进件数<b>${infos.userApplicationInfoAllCount}</b></p>
                    <p>当月新增已放款金额<b>${infos.userApplicationInfoApproveAmountSum}</b></p>
                    <p>当月绩效<b>10000</b></p>
                  </div>
                </div>
            </div>
            </div>
          </div>
          <div class="row" style="margin-top:30px">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="form-group">
                <div class="input-icon right">
                  <manager-overdue></manager-overdue>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
  .backgrounds{width:100%;height:100%;padding:15px;border-radius:10px;box-shadow:0 5px 0 #5f7cab;}
  .colorone{background:#6a8abe}
  .colortwo{background:#49586e}
  .colorthree{background:#5ab6df;height:100px;}
  .colorfour{background:#4acacb;margintop:10px;height:140px;}
  .backgrounds p{margin: 0 0;}
  .backgrounds b{float:right}
</style>
<script>
  import QK from '../../QK'
  import echarts from 'echarts'
  import managerPiece from './managerPiece.vue'
  import managerLoan from './managerLoan.vue'
  import managerOverdue from './managerOverdue.vue'
  export default{
    data(){
      return {
        msg: 'hello vue',
        infos:{userApplicationInfoAllCount:'',
        userApplicationInfoApproveAmountSum:'',
        userApplicationInfoMonth:''}

      }
    },
    components: {
    managerPiece,
    managerLoan,
    managerOverdue
    },
    ready() {

    },
    created: function () {
      QK.vector.$on('getfromchild', this.init)
    },
    beforeDestroy: function () {
      QK.vector.$off('getfromchild', this.init)
    },
    methods: {
      init:function(data) {
        this.$set("infos",data)
      }

    }

  }
</script>
