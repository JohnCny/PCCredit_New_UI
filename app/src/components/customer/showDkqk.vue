<template>
  <div class="report common">
    <h5>贷款情况</h5>
    <table class="bxd">
      <tr>
        <td>产品：<span>产品1</span></td>
        <td>申请日期：<span>XXXXXXXXXXXXXX</span></td>
      </tr>
      <tr>
        <td>是否申请成功：
          <span class="label label-success" style="color:#fff;">是</span>
          <span class="label label-important" style="color:#fff;">否</span>
        </td>
        <td>额度：<span>XXXXXXXXXXXXXX</span></td>
      </tr>
      <tr>
        <td>利率：<span>XXXXXXXXXXXXXX</span></td>
        <td>放款日期：<span>XXXXXXXXXXXXXX</span></td>
      </tr>
      <tr>
        <td colspan="2">当前余额：<span>￥20000</span></td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
</style>
<script>
import QK from '../../QK'
export default{
  data:function(){
    return {

    }
  },
  ready:function(){

  },
  methods:{
    init: function () {

    },
  }
}
</script>
