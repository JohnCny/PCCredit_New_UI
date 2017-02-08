<template>
  <div class="report common">
    <h5>客户移交记录</h5>
    <table class="center transferd table table-bordered">
      <thead>
      <tr>
        <th>移交日期</th>
        <th>原客户经理</th>
        <th>移交后客户经理</th>
        <th>移交原因</th>
        <th>移交结果</th>
      </tr>
      </thead>
      <tbody>
      <template  v-if="transfers.length" >
        <tr v-for="transfer in transfers">
          <td>${transfer.transferTime | formatDate}</td>
          <td>${transfer.oldManager.username}</td>
          <td>${transfer.newManager.username}</td>
          <td>${transfer.transferReason}</td>
          <td><span style="font-weight:normal" class="label ${transfer.transferStatus | getCusTransferClass}">${transfer.transferStatus | getCusTransferState}</span></td>
        </tr>
      </template>
      <template  v-else>
        <tr>
          <td style="text-align:center" colspan="5">没有数据</td>
        </tr>
      </template>
      </tbody>
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
      transfers: [{
        transferTime: '',
        oldManager: {
          username: ''
        },
        newManager: {
          username: ''
        },
        transferReason: '',
        transferStatus: ''
      }],
    }
  },
  ready:function(){
    this.init()
  },
  methods:{
    init: function () {
      var that = this
      var id = that.$route.params.id
      that.$http.get(QK.SERVER_URL + '/api/customerTransfer/' + id, true).then(function (data) {
        var data = $.parseJSON(data.body)
        var result = QK.getStateCode(that, data.code)
        if (result.state) {
          that.$set("transfers", data.data)
        }
      })
    },
  }
}
</script>
