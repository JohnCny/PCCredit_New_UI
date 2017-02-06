<template>
  <section class="panel">
    <header class="panel-heading custom-tab">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#home3">
            <i class="fa fa-user"></i>
            个人客户移交
          </a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#about3">
            <i class="fa fa-university"></i>
            企业客户移交
          </a>
        </li>
      </ul>
    </header>
    <div class="panel-body">
      <div class="tab-content">
        <div id="home3" class="tab-pane active">
          <transfer-cus></transfer-cus>
        </div>
        <div id="about3" class="tab-pane">
          <transfer-enterprise></transfer-enterprise>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import QK from '../../QK'
  import transferCus from './transferCus.vue'
  import transferEnterprise from './transferEnterprise.vue'
  export default{
     data(){
      return{
      }
    },
    ready: function () {
    },
    components: {
       'transfer-cus': transferCus,
       'transfer-enterprise': transferEnterprise
    },
    methods:{

    }
  }
</script>
