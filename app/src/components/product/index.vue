<style src='../../../static/css/sweetalert.css'></style>
<style src='../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          产品信息 <a v-on:click="show()" class="btn btn-success btn-sm"><i class="fa fa-plus"></i> 新 增</a>
        </header>
        <div class="panel-body">
          <div class="row searchDiv">
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>产品名称：</span><input v-model="search.cname" type="text" name="cname"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12">
              <span>当前状态：</span><input v-model="search.certificateNumber" type="text" name="certificateNumber"/>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-12" style="text-align:center">
              <button v-on:click="init()" class="btn btn-info btn-sm" type="button">搜 索</button>
            </div>
          </div>
          <div class="tableDiv">
            <table class="table table-striped table-bordered table-hover order-column" id="dtUsers">
              <thead>
              <tr>
                <th>产品名称</th>
                <th>产品额度区间</th>
                <th>利率区间</th>
                <th>当前状态</th>
                <th colspan="5">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="info in infos">
                <td>${info.productName}</td>
                <td>${info.productLimitMax}~${info.productLimitMin}</td>
                <td>${info.productInterestMax}~${info.productInterestMin}</td>
                <td>${info.productState}</td>
                <td><a href="javascript:;" v-on:click="showInfo(info.id)" class="btn btn-warning btn-xs"><i class="fa fa-edit"></i>
                  编辑 </a></td>
                <td><a v-on:click="deleteInfo(info.id)" title="删除" class="btn btn-warning btn-xs"><i class="fa fa-eraser"></i> 配置审批流程
                </a></td>
                <td><a class="btn btn-warning btn-xs">配置贷后监控规则</a></td>
                <td><a class="btn btn-warning">配置风险属性</a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>


</template>
<style scoped>
</style>
<script>
    import QK from '../../QK'
    import swal from 'sweetalert'
    export default{
        data:function(){
           return {
                infos:{
                  productName: '',
                  productLimitMax: '',
                  productLimitMin: '',
                  productInterestMax: '',
                  productInterestMin:'',
                  productState:''
                },
           }
        },
        ready:function(){
          this.init();
        },
        methods:{
          init:function() {
            var that = this
            that.$http.post(QK.SERVER_URL+'/api/product/pageList', true).then(function (data) {
              var data = jQuery.parseJSON(data.body);
              var result = QK.getStateCode(that, data.code)
              if (result.state) {
                that.$set("infos", data.data)
              }
           })
        }
        }
    }

</script>
