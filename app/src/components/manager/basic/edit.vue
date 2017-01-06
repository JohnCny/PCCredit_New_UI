<style src='../../../../static/css/sweetalert.css'></style>
<style src='../../../../static/css/pageStyle.css'></style>
<template>
  <div class="row">
    <div class="col-sm-12">
      <section class="panel">
        <header class="panel-heading">
          客户经理信息
        </header>
        <div class="panel-body">
          <form>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div><span>当前级别：</span><a>${infos.levelName}</a></div>
                <div>
                  <span>级别调整：</span>
                  <select v-for="lever in levers">
                    <option value="lever.id">${lever.value}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div><span>系统建议：</span><a>${infos.systemLevel}</a></div>
                <div>
                  <span>是否暂停进件：</span>

                </div>
              </div>

            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
  import QK from '../../../QK'
  import swal from 'sweetalert'
  export default{
    data: function () {
      return {
        infos: {
          userId: '',
          userCname: '',
          systemLevel: '',
          employeeNumber: '',
          levelName: '',
          managerStatus: '',
        },
        levers: {
          id : '',
          value : ''
        }

      }
    },
    components: {

    },
    ready: function () {
      this.init()
    },
    methods: {
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
